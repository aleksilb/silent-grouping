from flask import Flask, request
from flask_cors import CORS
from state import get_grouping, get_voter, add_voter, add_grouping
import json

app = Flask(__name__)
CORS(app)


@app.route('/grouping', methods=['POST'])
def new_grouping():
    grouping_id = add_grouping()
    return str(grouping_id)


@app.route('/voter/<grouping_id>', methods=['POST'])
def new_voter(grouping_id):
    voter_id = add_voter(int(grouping_id))
    return str(voter_id)


@app.route('/items/<voter_id>', methods=['POST'])
def add_items(voter_id):
    items = request.json
    voter = get_voter(int(voter_id))
    for item in items:
        voter.add_item(item)
    return "ok"


@app.route('/items/<grouping_id>', methods=['GET'])
def get_items(grouping_id):
    grouping = get_grouping(int(grouping_id))
    items = grouping.get_items()
    return json.dumps(items)


@app.route('/positions/<voter_id>', methods=['POST'])
def post_positions(voter_id):
    positions = request.json
    voter = get_voter(int(voter_id))
    voter.add_positions(positions)
    return "ok"


@app.route('/close/<grouping_id>', methods=['PUT'])
def close_grouping(grouping_id):
    grouping = get_grouping(int(grouping_id))
    clusters = grouping.cluster()
    return json.dumps(clusters)


if __name__ == "__main__":
    app.run()

