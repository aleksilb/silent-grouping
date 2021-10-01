from clustering import Clustering


class Voter:

    def __init__(self):
        self.items = []
        self.positions = []

    def add_item(self, item: str):
        self.items.append(item)

    def add_positions(self, positions):
        self.positions = positions


class Grouping:

    def __init__(self):
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
        clustering = Clustering()
        for voter in self.voters:
            clustering.add_positions(voter.positions)
        return clustering.calculate_groups(self.get_items())
