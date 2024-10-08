from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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
    response_body['results'] = user.serialize()
    return response_body, 200

@api.route('/login', methods=['GET','POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(User).where(User.email == email, User.password == password, User.is_active == True)).scalar()
    
    if user: 
        access_token = create_access_token(identity={ 'user_id': user.id, 'user_email': user.email })
        response_body['message'] = 'User logged in'
        response_body['access_token'] = access_token
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

# Nueva ruta privada, solo accesible con token
@api.route('/private', methods=['GET'])
@jwt_required()  # Esta línea protege la ruta
def private_route():
    # Obtener la identidad del usuario desde el token
    current_user = get_jwt_identity()
    
    # Puedes agregar más lógica aquí si lo necesitas, como verificar roles, etc.
    return jsonify({
        'message': f"Welcome to the private route, user {current_user['user_email']}!",
        'user': current_user
    }), 200
