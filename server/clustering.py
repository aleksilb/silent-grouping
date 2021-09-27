import numpy
from sklearn.cluster import DBSCAN
position_clustering = DBSCAN(eps=170, min_samples=2)
occurrence_matrix = numpy.array([[0 for x in range(20)] for y in range(20)])
num_of_voters = 0
labels = []


def restart(new_labels):
    global occurrence_matrix
    global num_of_voters
    global labels
    labels = new_labels
    occurrence_matrix = numpy.array([[0 for x in range(20)] for y in range(20)])
    num_of_voters = 0


def add_positions(positions):
    global occurrence_matrix
    global num_of_voters
    clusters = position_clustering.fit_predict(positions)
    print(clusters)
    groups = find_groups(clusters)
    print(groups)
    for group in groups:
        add_group_to_occurrences(group)
    num_of_voters += 1


def find_groups(clusters):
    groups = []
    for index, cluster in enumerate(clusters):
        if cluster == -1:
            continue
        if len(groups) <= cluster:
            groups.append([])
        groups[cluster].append(index)
    return groups


def add_group_to_occurrences(group):
    for index, item in enumerate(group):
        occurrence_matrix[item][item] += 1
        for other_item in group[index + 1:len(group)]:
            occurrence_matrix[item][other_item] += 1
            occurrence_matrix[other_item][item] += 1


def close():
    distance_matrix = numpy.array([[num_of_voters for x in range(20)] for y in range(20)])
    distance_matrix = numpy.subtract(distance_matrix, occurrence_matrix)
    print(distance_matrix)
    group_clustering = DBSCAN(eps=(num_of_voters / 2), min_samples=2, metric="precomputed")
    clusters = group_clustering.fit_predict(distance_matrix)
    groups = find_groups(clusters)
    labeled_groups = []
    for group in groups:
        labeled_items = []
        for item in group:
            labeled_items.append(labels[item])
        labeled_groups.append(labeled_items)
    return labeled_groups
