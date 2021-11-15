from grouping import Grouping, Grouper

groupings = []
groupers = []


def get_grouping(grouping_id) -> Grouping:
    return groupings[grouping_id]


def add_grouping(name, description):
    grouping_id = len(groupings)
    grouping = Grouping(grouping_id, name, description)
    groupings.append(grouping)
    return grouping


def get_grouper(grouper_id) -> Grouper:
    return groupers[grouper_id]


def add_grouper(grouping_id):
    grouper_id = len(groupers)
    grouping = get_grouping(grouping_id)
    grouper = Grouper(grouper_id, grouping)
    groupers.append(grouper)
    return grouper
