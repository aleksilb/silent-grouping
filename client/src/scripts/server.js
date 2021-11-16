const API = 'http://localhost:5000';

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

export function sendTerms(grouperId, terms) {
    return post('/items/'+grouperId, terms);
}

export function getTerms(groupingId) {
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
