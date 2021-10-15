import json
from enum import Enum

from clustering import calculate_groups


class Stage(Enum):
    COLLECTING = "COLLECTING"
    GROUPING = "GROUPING"
    DONE = "DONE"


class Grouping:

    id: int
    name: str
    description: str
    stage: Stage
    groups: list[list[str]]
    items: list[str]
    positions: list[list[list[int]]]
    num_of_voters: int
    voters_sent_items: int
    voters_sent_positions: int

    def __init__(self, grouping_id, name, description):
        self.id = grouping_id
        self.name = name
        self.description = description
        self.groups = []
        self.items = []
        self.positions = []
        self.num_of_voters = 0
        self.voters_sent_items = 0
        self.voters_sent_positions = 0
        self.stage = Stage.COLLECTING

    def add_voter(self):
        self.num_of_voters += 1

    def add_items(self, items):
        self.items += items

    def add_positions(self, positions):
        self.positions.append(positions)
        self.voter_sent_positions()

    def voter_sent_items(self):
        self.voters_sent_items += 1
        if self.num_of_voters == self.voters_sent_items:
            self.stage = Stage.GROUPING

    def voter_sent_positions(self):
        self.voters_sent_positions += 1
        if self.num_of_voters == self.voters_sent_positions:
            self.cluster()

    def cluster(self):
        self.groups = calculate_groups(self.positions, self.items)
        self.stage = Stage.DONE

    def to_string(self):
        return json.dumps({
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "stage": self.stage.value
        })


class Voter:

    id: int
    items_sent: bool
    positions_sent: bool
    grouping: Grouping

    def __init__(self, voter_id, grouping):
        self.id = voter_id
        self.items_sent = False
        self.positions_sent = False
        self.grouping = grouping
        grouping.add_voter()

    def add_items(self, items):
        if not self.items_sent:
            self.grouping.add_items(items)
            self.items_sent = True
            self.grouping.voter_sent_items()

    def add_positions(self, positions):
        if not self.positions_sent:
            self.grouping.add_positions(positions)
            self.positions_sent = True

    def to_string(self):
        return json.dumps({
            "id": self.id,
            "grouping": self.grouping.id,
            "items_sent": self.items_sent,
            "positions_sent": self.positions_sent
        })
