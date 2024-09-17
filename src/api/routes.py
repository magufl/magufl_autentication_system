"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['GET', 'POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = User()
    user.email = email
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={ 'user_id': user.id,
                                                  'user_is_admin': user.is_admin})
    response_body['message'] = 'User Signed Up'
    response_body['access_token'] = access_token
    response_body['results']=user.serialize()
    return response_body, 200


@api.route('/login', methods=['GET','POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(User).where(User.email == email, User.password == password, User.is_active == True, )).scalar()
    print(user)
    if user: 
       
        response_body['message'] = 'User logged in'
  
        response_body['results'] = user.serialize()
        return response_body, 200
    response_body['message'] = 'Wrong Username Or Password'
    return response_body, 401

@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    rows = db.session.execute(db.select(User)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'User List'
    return response_body, 200

@api.route('/logout')  
def logout():
    session.clear()
    return redirect(url_for('home'))