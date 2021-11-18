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
    num_of_groupers: int
    groupers_sent_items: int
    groupers_sent_positions: int

    def __init__(self, name, description):
        grouping_id = name.strip().lower().replace(" ", "_")
        self.id = grouping_id
        self.name = name
        self.description = description
        self.groups = []
        self.items = []
        self.positions = []
        self.num_of_groupers = 0
        self.groupers_sent_items = 0
        self.groupers_sent_positions = 0
        self.stage = Stage.COLLECTING

    def add_grouper(self):
        self.num_of_groupers += 1

    def remove_grouper(self):
        self.num_of_groupers -= 1
        self.check_stage()

    def add_items(self, items):
        for item in items:
            trimmed = item.strip()
            added = any(i.casefold() == trimmed.casefold() for i in self.items)
            if not added:
                self.items.append(trimmed)

    def add_positions(self, positions):
        self.positions.append(positions)
        self.grouper_sent_positions()

    def grouper_sent_items(self):
        self.groupers_sent_items += 1
        self.check_stage()

    def grouper_sent_positions(self):
        self.groupers_sent_positions += 1
        self.check_stage()

    def check_stage(self):
        if self.num_of_groupers <= 0:
            self.stage = Stage.DONE
        elif (self.stage == Stage.COLLECTING) & (self.num_of_groupers == self.groupers_sent_items):
            self.stage = Stage.GROUPING
        elif (self.stage == Stage.GROUPING) & (self.num_of_groupers == self.groupers_sent_positions):
            self.stage = Stage.DONE
            self.cluster()

    def cluster(self):
        self.groups = calculate_groups(self.positions, self.items)
        self.stage = Stage.DONE


class Grouper:

    id: int
    items_sent: bool
    positions_sent: bool
    grouping: Grouping

    def __init__(self, grouper_id, grouping):
        self.id = grouper_id
        self.items_sent = False
        self.positions_sent = False
        self.grouping = grouping
        grouping.add_grouper()

    def disable(self):
        self.grouping.remove_grouper()
        self.grouping = None

    def add_items(self, items):
        if not self.items_sent:
            self.grouping.add_items(items)
            self.items_sent = True
            self.grouping.grouper_sent_items()

    def add_positions(self, positions):
        if not self.positions_sent:
            self.grouping.add_positions(positions)
            self.positions_sent = True

    def to_json(self):
        return json.dumps({"id": self.id, "grouping": self.grouping}, default=lambda o: o.__dict__())
