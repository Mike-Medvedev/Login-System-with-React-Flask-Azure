from flask import Flask, jsonify, request
from flask_cors import CORS
import db_utils

app = Flask(__name__)
CORS(app)
@app.route("/")
def handle_get():
    response = jsonify({'message': 'Hello From Flask'})
    return response

@app.route('/login', methods=["POST"])
def login():
    request_data = request.get_json()
    try:  
        if 'username' in request_data and 'password' in request_data:
            data = db_utils.login(request_data)
            return data, 200
        else:
            raise ValueError('Invalid content')
    except Exception as e:
        print('error occured trying to login', e)
        return {"Error": e}, 500
    # try:
    #     db_utils.insert_form()
    # except:
    #     print('error occured')
        
