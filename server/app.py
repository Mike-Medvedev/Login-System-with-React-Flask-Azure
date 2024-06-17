from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import db_utils

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
@app.route("/")
def handle_get():
     # try:
    #     db_utils.insert_form()
    # except:
    #     print('error occured')
    response = jsonify({'message': 'Hello From Flask'})
    return response

@app.route('/login', methods=["POST"])
def login():
    request_data = request.get_json()
    try:  
        if 'username' in request_data and 'password' in request_data:
            data = db_utils.login(request_data, bcrypt)
            return data, 200
        else:
            raise ValueError('Invalid content')
    except Exception as e:
        print('error occured trying to login', e)
        response = jsonify({'Error': str(e)})
        return response, 500

@app.route('/signup', methods=["POST"])
def signup():
    request_data = request.get_json()
    try:  
        if 'username' in request_data and 'password' in request_data:
            data = db_utils.signup(request_data, bcrypt)
            return data, 200
        else:
            raise ValueError('Invalid content')
    except Exception as e:
        print('error occured trying to signup', e)
        response = jsonify({'Error': str(e)})
        return response, 500

   