import numpy
from sklearn.cluster import DBSCAN

position_clustering = DBSCAN(eps=170, min_samples=2)


def calculate_groups(groupers_item_positions, labels):
    num_of_groupers = len(groupers_item_positions)
    group_hit_matrix = calc_group_hit_matrix(groupers_item_positions)
    groups = calc_groups_from_hit_matrix(group_hit_matrix, num_of_groupers)
    return get_labeled_groups(groups, labels)


def calc_group_hit_matrix(groupers_item_positions):
    num_of_items = len(groupers_item_positions[0])
    group_hit_matrix = numpy.array([[0 for x in range(num_of_items)] for y in range(num_of_items)])
    for item_positions in groupers_item_positions:
        pos_group_hit_matrix = calc_group_hits_from_positions(item_positions)
        group_hit_matrix = numpy.add(group_hit_matrix, pos_group_hit_matrix)
    return group_hit_matrix


def calc_group_hits_from_positions(positions):
    group_hit_matrix = numpy.array([[0 for x in range(len(positions))] for y in range(len(positions))])
    clusters = position_clustering.fit_predict(positions)
    groups = find_groups(clusters)
    for group in groups:
        for index, item in enumerate(group):
            group_hit_matrix[item][item] += 1
            for other_item in group[index + 1:len(group)]:
                group_hit_matrix[item][other_item] += 1
                group_hit_matrix[other_item][item] += 1
    return group_hit_matrix


def calc_groups_from_hit_matrix(group_hit_matrix, num_of_groupers):
    matrix_dims = len(group_hit_matrix)
    distance_matrix = numpy.array([[num_of_groupers for x in range(matrix_dims)] for y in range(matrix_dims)])
    distance_matrix = numpy.subtract(distance_matrix, group_hit_matrix)
    group_clustering = DBSCAN(eps=(num_of_groupers / 2), min_samples=2, metric="precomputed")
    clusters = group_clustering.fit_predict(distance_matrix)
    return find_groups(clusters)


def get_labeled_groups(groups, labels):
    labeled_groups = []
    for group in groups:
        labeled_items = []
        for item in group:
            labeled_items.append(labels[item])
        labeled_groups.append(labeled_items)
    return labeled_groups


def find_groups(clusters):
    groups = []
    for index, cluster in enumerate(clusters):
        if cluster == -1:
            continue
        if len(groups) <= cluster:
            groups.append([])
        groups[cluster].append(index)
    return groups
