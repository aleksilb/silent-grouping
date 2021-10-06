import json

from clustering import calculate_groups


class Voter:

    def __init__(self):
        self.items = []
        self.positions = []

    def add_item(self, item: str):
        self.items.append(item)

    def add_positions(self, positions):
        self.positions = positions


class Grouping:

    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.voters = []

    def add_voter(self, voter: Voter):
        self.voters.append(voter)

    def get_items(self):
        all_items = []
        for voter in self.voters:
            all_items += voter.items
        return all_items

    def get_num_of_voters(self):
        return len(self.voters)

    def cluster(self):
        voters_positions = []
        for voter in self.voters:
            voters_positions.append(voter.positions)
        return calculate_groups(voters_positions, self.get_items())

    def to_string(self):
        return json.dumps({"name": self.name, "description": self.description})
