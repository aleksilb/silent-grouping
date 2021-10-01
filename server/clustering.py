import numpy
from sklearn.cluster import DBSCAN


class Clustering:

    position_clustering = DBSCAN(eps=170, min_samples=2)

    def __init__(self):
        self.occurrence_matrix = numpy.array([[0 for x in range(20)] for y in range(20)])
        self.num_of_groupers = 0

    def add_positions(self, positions):
        clusters = self.position_clustering.fit_predict(positions)
        groups = self.find_groups(clusters)
        for group in groups:
            self.add_group_to_occurrences(group)
        self.num_of_groupers += 1

    def add_group_to_occurrences(self, group):
        for index, item in enumerate(group):
            self.occurrence_matrix[item][item] += 1
            for other_item in group[index + 1:len(group)]:
                self.occurrence_matrix[item][other_item] += 1
                self.occurrence_matrix[other_item][item] += 1

    def calculate_groups(self, labels):
        distance_matrix = numpy.array([[self.num_of_groupers for x in range(20)] for y in range(20)])
        distance_matrix = numpy.subtract(distance_matrix, self.occurrence_matrix)
        group_clustering = DBSCAN(eps=(self.num_of_groupers / 2), min_samples=2, metric="precomputed")
        clusters = group_clustering.fit_predict(distance_matrix)
        groups = self.find_groups(clusters)
        return self.get_labeled_groups(groups, labels)

    @staticmethod
    def get_labeled_groups(groups, labels):
        labeled_groups = []
        for group in groups:
            labeled_items = []
            for item in group:
                labeled_items.append(labels[item])
            labeled_groups.append(labeled_items)
        return labeled_groups

    @staticmethod
    def find_groups(clusters):
        groups = []
        for index, cluster in enumerate(clusters):
            if cluster == -1:
                continue
            if len(groups) <= cluster:
                groups.append([])
            groups[cluster].append(index)
        return groups
