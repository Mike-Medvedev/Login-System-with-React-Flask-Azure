from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/")
def handle_get():
    response = jsonify({'message': 'Hello From Flask'})
    return response
