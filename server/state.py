from grouping import Grouping, Voter

groupings = []
voters = []


def get_grouping(grouping_id) -> Grouping:
    return groupings[grouping_id]


def add_grouping(name, description):
    groupings.append(Grouping(name, description))
    return len(groupings) - 1


def get_voter(voter_id) -> Voter:
    return voters[voter_id]


def add_voter(grouping_id):
    voter = Voter()
    grouping = get_grouping(grouping_id)
    grouping.add_voter(voter)
    voters.append(voter)
    return len(voters) - 1
