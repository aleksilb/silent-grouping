from enum import Enum

from flask import Flask, request
from flask_cors import CORS
from state import get_grouping, get_grouper, add_grouper, add_grouping
from flask import Response
import jsonpickle

app = Flask(__name__)
CORS(app)


def json_response(obj):
    return Response(jsonpickle.encode(obj, unpicklable=False), mimetype='application/json')


@app.route('/grouping', methods=['POST'])
def new_grouping():
    info = request.json
    grouping = add_grouping(info['name'], info['description'])
    return json_response(grouping)


@app.route('/grouping/<grouping_id>', methods=['GET'])
def fetch_grouping(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return json_response(grouping)


@app.route('/grouper/<grouping_id>', methods=['POST'])
def new_grouper(grouping_id):
    grouper = add_grouper(int(grouping_id))
    return json_response(grouper)


@app.route('/grouper/<grouper_id>', methods=['GET'])
def fetch_grouper(grouper_id):
    grouper = get_grouper(int(grouper_id))
    return json_response(grouper)


@app.route('/grouper/<grouper_id>', methods=['DELETE'])
def delete_grouper(grouper_id):
    grouper = get_grouper(int(grouper_id))
    grouper.disable()
    return "ok"


@app.route('/items/<grouper_id>', methods=['POST'])
def add_items(grouper_id):
    items = request.json
    grouper = get_grouper(int(grouper_id))
    grouper.add_items(items)
    return "ok"


@app.route('/items/<grouping_id>', methods=['GET'])
def get_items(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return json_response(grouping.items)


@app.route('/positions/<grouper_id>', methods=['POST'])
def post_positions(grouper_id):
    positions = request.json
    grouper = get_grouper(int(grouper_id))
    grouper.add_positions(positions)
    return "ok"


@app.route('/groups/<grouping_id>', methods=['GET'])
def get_groups(grouping_id):
    grouping = get_grouping(int(grouping_id))
    return json_response(grouping.groups)


@jsonpickle.handlers.register(Enum, base=True)
class EnumHandler(jsonpickle.handlers.BaseHandler):

    def restore(self, obj):
        pass

    def flatten(self, obj, data):
        return obj.value


if __name__ == "__main__":
    app.run()

