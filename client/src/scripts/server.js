const API = 'http://flask-env.eba-ytwz9wjy.us-west-2.elasticbeanstalk.com'; //TODO: Get from environment variable

function post(url, body) {
    return fetch(API + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body != null ? JSON.stringify(body) : null
    })
}

export function createGrouping(name, description) {
    return post('/grouping', {name: name, description: description})
        .then(response => response.json())
}

export function joinGrouping(groupingId) {
    return post('/grouper/'+groupingId, null)
        .then(response => response.json());
}

export function leaveGrouping(grouperId) {
    return fetch(API + '/grouper/'+grouperId, {method: 'DELETE'});
}

export function sendPositions(grouperId, positions) {
    return post( '/positions/'+grouperId, positions);
}

export function sendItems(grouperId, items) {
    return post('/items/'+grouperId, items);
}

export function getItems(groupingId) {
    return fetch(API + '/items/'+groupingId).then(response => response.json());
}

export function getGroups(groupingId) {
    return fetch(API + '/groups/'+groupingId)
        .then(response => response.json());
}

export function getGrouping(groupingId) {
    return fetch(API + '/grouping/' + groupingId)
        .then(response => response.json());
}

export function getGrouper(grouperId) {
    return fetch(API + '/grouper/' + grouperId)
        .then(response => response.json());
}
