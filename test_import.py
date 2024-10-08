from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
jwt = JWTManager(app)

print("Importación exitosa.")
