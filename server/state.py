from grouping import Grouping, Voter

groupings = []
voters = []


def get_grouping(grouping_id) -> Grouping:
    return groupings[grouping_id]


def add_grouping(name, description):
    grouping_id = len(groupings)
    grouping = Grouping(grouping_id, name, description)
    groupings.append(grouping)
    return grouping


def get_voter(voter_id) -> Voter:
    return voters[voter_id]


def add_voter(grouping_id):
    voter_id = len(voters)
    grouping = get_grouping(grouping_id)
    voter = Voter(voter_id, grouping)
    voters.append(voter)
    return voter
