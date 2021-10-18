from flask import Flask, request
from flask_cors import CORS
from state import get_grouping, get_voter, add_voter, add_grouping
import json

app = Flask(__name__)
CORS(app)


@app.route('/grouping', methods=['POST'])
def new_grouping():
    info = request.json
    grouping = add_grouping(info['name'], info['description'])
    return grouping.to_string()


@app.route('/grouping/<grouping_id>', methods=['GET'])
def fetch_grouping(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return grouping.to_string()


@app.route('/voter/<grouping_id>', methods=['POST'])
def new_voter(grouping_id):
    voter = add_voter(int(grouping_id))
    return voter.to_string()


@app.route('/voter/<voter_id>', methods=['GET'])
def fetch_voter(voter_id):
    voter = get_voter(int(voter_id))
    return voter.to_string()


@app.route('/items/<voter_id>', methods=['POST'])
def add_items(voter_id):
    items = request.json
    voter = get_voter(int(voter_id))
    voter.add_items(items)
    return "ok"


@app.route('/items/<grouping_id>', methods=['GET'])
def get_items(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return json.dumps(grouping.items)


@app.route('/positions/<voter_id>', methods=['POST'])
def post_positions(voter_id):
    positions = request.json
    voter = get_voter(int(voter_id))
    voter.add_positions(positions)
    return "ok"


@app.route('/groups/<grouping_id>', methods=['GET'])
def get_groups(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return json.dumps(grouping.groups)


if __name__ == "__main__":
    app.run()

