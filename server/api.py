from flask import Flask, request
from flask_cors import CORS
from clustering import restart, add_positions, close
import json

app = Flask(__name__)
CORS(app)


@app.route('/grouping', methods=['POST'])
def new_grouping():
    labels = request.json
    restart(labels)
    return "ok"


@app.route('/positions', methods=['POST'])
def post_positions():
    positions = request.json
    add_positions(positions)
    return "ok"


@app.route('/close', methods=['PUT'])
def close_grouping():
    clusters = close()
    return json.dumps(clusters)


if __name__ == "__main__":
    app.run()

