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
        .then(response => response.text())
}

export function joinGrouping(groupingId) {
    return post('/voter/'+groupingId, null)
        .then(response => response.text());
}

export function sendPositions(voterId, positions) {
    return post( '/positions/'+voterId, positions);
}

export function sendTerms(voterId, terms) {
    return post('/items/'+voterId, terms);
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

export function getVoter(voterId) {
    return fetch(API + '/voter/' + voterId)
        .then(response => response.json());
}
