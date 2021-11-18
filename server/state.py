from grouping import Grouping, Grouper

groupings = {}
groupers = []


def get_grouping(grouping_id) -> Grouping:
    return groupings[grouping_id]


# TODO: Grouping with the same name will overwrite older grouping
def add_grouping(name, description):
    grouping = Grouping(name, description)
    groupings[grouping.id] = grouping
    return grouping


def get_grouper(grouper_id) -> Grouper:
    return groupers[grouper_id]


def add_grouper(grouping_id):
    grouper_id = len(groupers)
    grouping = get_grouping(grouping_id)
    grouper = Grouper(grouper_id, grouping)
    groupers.append(grouper)
    return grouper
