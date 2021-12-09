from enum import Enum

from flask import Flask, request
from flask_cors import CORS
from state import get_grouping, get_grouper, add_grouper, add_grouping
from flask import Response
import jsonpickle

application = Flask(__name__)
CORS(application)


def json_response(obj):
    return Response(jsonpickle.encode(obj, unpicklable=False), mimetype='application/json')


@application.route('/grouping', methods=['POST'])
def new_grouping():
    info = request.json
    grouping = add_grouping(info['name'], info['description'])
    return json_response(grouping)


@application.route('/grouping/<grouping_id>', methods=['GET'])
def fetch_grouping(grouping_id):
    grouping = get_grouping(grouping_id)
    return json_response(grouping)


@application.route('/grouper/<grouping_id>', methods=['POST'])
def new_grouper(grouping_id):
    grouper = add_grouper(grouping_id)
    return json_response(grouper)


@application.route('/grouper/<grouper_id>', methods=['GET'])
def fetch_grouper(grouper_id):
    grouper = get_grouper(int(grouper_id))
    return json_response(grouper)


@application.route('/grouper/<grouper_id>', methods=['DELETE'])
def delete_grouper(grouper_id):
    grouper = get_grouper(int(grouper_id))
    grouper.disable()
    return "ok"


@application.route('/items/<grouper_id>', methods=['POST'])
def add_items(grouper_id):
    items = request.json
    grouper = get_grouper(int(grouper_id))
    grouper.add_items(items)
    return "ok"


@application.route('/items/<grouping_id>', methods=['GET'])
def get_items(grouping_id):
    grouping = get_grouping(grouping_id)
    return json_response(grouping.items)


@application.route('/positions/<grouper_id>', methods=['POST'])
def post_positions(grouper_id):
    positions = request.json
    grouper = get_grouper(int(grouper_id))
    grouper.add_positions(positions)
    return "ok"


@application.route('/groups/<grouping_id>', methods=['GET'])
def get_groups(grouping_id):
    grouping = get_grouping(grouping_id)
    return json_response(grouping.groups)


@jsonpickle.handlers.register(Enum, base=True)
class EnumHandler(jsonpickle.handlers.BaseHandler):

    def restore(self, obj):
        pass

    def flatten(self, enum: Enum, data):
        return enum.value


if __name__ == "__main__":
    application.run()

