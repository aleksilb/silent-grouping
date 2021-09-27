import numpy
from sklearn.cluster import DBSCAN
item_cluster_model = DBSCAN(eps=170, min_samples=2)

def add_data_to_occurrences(data, occurrence_matrix):
    clusters = item_cluster_model.fit_predict(data)
    print(clusters)
    groups = []
    for index, cluster in enumerate(clusters):
        if cluster == -1:
            continue
        if len(groups) <= cluster:
            groups.append([])
        groups[cluster].append(index)
    print(groups)
    for group in groups:
        for index, item in enumerate(group):
            occurrence_matrix[item][item] += 1
            for other_item in group[index + 1:len(group)]:
                occurrence_matrix[item][other_item] += 1
                occurrence_matrix[other_item][item] += 1


data = [[1229, 800],
        [440, 449],
        [297, 730],
        [375, 407],
        [421, 385],
        [329, 346],
        [210, 481],
        [1147, 374],
        [137, 307],
        [139, 415],
        [1337, 858],
        [48, 430],
        [493, 304],
        [435, 824],
        [358, 786],
        [1241, 382],
        [497, 703],
        [1228, 416],
        [1217, 846],
        [1186, 314]]

data2 = [[1229, 800],
         [440, 449],
         [297, 730],
         [375, 407],
         [421, 385],
         [329, 346],
         [210, 481],
         [1147, 374],
         [137, 307],
         [139, 415],
         [1337, 858],
         [48, 430],
         [770, 72],
         [435, 824],
         [358, 786],
         [1241, 382],
         [497, 703],
         [1228, 416],
         [1217, 846],
         [1186, 314]]


occurrence_matrix = numpy.array([[0 for x in range(20)] for y in range(20)])
distance_matrix = numpy.array([[2 for x in range(20)] for y in range(20)])
add_data_to_occurrences(data, occurrence_matrix)
add_data_to_occurrences(data2, occurrence_matrix)
print(occurrence_matrix)
distance_matrix = numpy.subtract(distance_matrix, occurrence_matrix)
print(distance_matrix)
group_cluster_model = DBSCAN(eps=1, min_samples=2, metric="precomputed")
group_clusters = group_cluster_model.fit_predict(distance_matrix)
print(group_clusters);



