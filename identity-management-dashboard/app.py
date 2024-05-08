import datetime
import hashlib
from flask import Flask, request, jsonify, make_response, render_template, redirect, flash
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, decode_token
from datetime import timedelta
from hashlib import sha256
from bson.json_util import dumps
from flask_cors import CORS
from bson.json_util import loads
import os

app = Flask(__name__)
CORS(app)
# Flask configuration
app.config['MONGO_URI'] = os.environ.get('MONGO_URI', 'mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/todoListDatabase')  # Replace with your MongoDB URI
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'abcd')  # Change this to a secure key
app.config['JWT_IDENTITY_CLAIM'] = JWT_IDENTITY_CLAIM = os.environ.get('JWT_IDENTITY_CLAIM', 'identity')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', '300')))


# Initialize extensions
mongo = PyMongo(app)
jwt = JWTManager(app)

def get_roles(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('roles', {})
    return {}

def get_delegated_roles(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('delegated_roles', '')
    return ''

def check_authz(username):
    roles = get_roles(username)
    delegated_roles = get_delegated_roles(username)
    
    role_services = [mongo.db.roles.find_one({'role': role})['services'] for role in roles]
    delegated_role_services = [mongo.db.roles.find_one({'role': role})['services'] for role in delegated_roles]
    
    role_services = list(set(element for sublist in role_services for element in sublist))
    delegated_role_services = list(set(element for sublist in delegated_role_services for element in sublist))

    if "admin" not in role_services or "admin" not in delegated_role_services:
        return True
    return False
    

def get_role_hash(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('role_hash', '')
    return ''

def get_delegated_role_hash(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('delegated_role_hash', '')
    return ''

def sha256_hash(list1):
  sha256 = hashlib.sha256()
  for item in list1:
    sha256.update(item.encode())
  return sha256.hexdigest()

# Flask routes
@app.route('/')
def admin():
    token_cookie = request.cookies.get('authentication')

    if not token_cookie:
        return redirect(os.environ.get('DOMAIN_NAME') + '/login', code=302) # Change this to the gateway's login

    try:
        decoded_token = decode_token(token_cookie)
        identity = decoded_token[JWT_IDENTITY_CLAIM]

        if not check_authz(identity):
            flash('You are not authorized to access this page', 'error')
            return redirect(os.environ.get('DOMAIN_NAME') + '/login', code=401)

        return render_template('admin.html', username=identity) # Change this to the required frontend
    except Exception as e:
        return redirect(os.environ.get('DOMAIN_NAME') + '/login', code=302)


@app.route('/logout', methods=['GET'])
def logout():
    response = make_response(redirect(os.environ.get('DOMAIN_NAME') + '/'))
    response.delete_cookie('authentication')
    return response

# Role Management code


@app.route('/roles', methods=['GET'])
# @jwt_required()
def get_role():
    # print("Here we go")
    # return("1234")
    roles = mongo.db.roles.find({})
    return jsonify([{'role': role['role'], 'services': role['services']} for role in roles]), 200

@app.route('/roles', methods=['POST'])
# @jwt_required()
def create_role():
    print("2")
    role_data = request.json
    print(role_data)
    role = request.json['role']
    print(role)
    services = request.json['services']
    roles =mongo.db.roles.find({})
    # print(roles)
    for r in roles:
        print("1")
        if(r['role']==role):
            mongo.db.roles.update_one({'role': role}, {'$set': {'services': services}})
            return jsonify({'message': 'Role updated successfully'}), 200
    if not role or not services:
        return jsonify({'error': 'Role name and services are required'}), 400
    mongo.db.roles.insert_one({'role': role, 'services': services})
    return jsonify({'message': 'Role created successfully'}), 201

@app.route('/roles/<role>', methods=['PUT'])
# @jwt_required()
def modify_role(role):
    new_services = request.json['services']
    if not new_services:
        return jsonify({'error': 'New services are required'}), 400
    mongo.db.roles.update_one({'role': role}, {'$set': {'services': new_services}})
    return jsonify({'message': 'Role updated successfully'}), 200

@app.route('/roles/<role_name>', methods=['DELETE'])
# @jwt_required()
def delete_role(role_name):
    # First, delete the role from the roles collection.
    result = mongo.db.roles.delete_one({'role': role_name})
    if result.deleted_count == 0:
        return jsonify({'error': 'Role not found'}), 404

    # Find all users who have this role in their roles or delegated_roles list.
    affected_users = mongo.db.users.find({
        '$or': [
            {'roles': role_name},
            {'delegated_roles': role_name}
        ]
    })

    for user in affected_users:
        # Remove the role from the user's roles list
        if role_name in user['roles']:
            new_roles = [role for role in user['roles'] if role != role_name]
            new_role_hash = sha256_hash(new_roles)
            mongo.db.users.update_one(
                {'_id': user['_id']},
                {'$set': {'roles': new_roles, 'role_hash': new_role_hash}}
            )

        # Remove the role from the user's delegated_roles list
        if role_name in user['delegated_roles']:
            new_delegated_roles = [role for role in user['delegated_roles'] if role != role_name]
            new_delegated_role_hash = sha256_hash(new_delegated_roles)
            mongo.db.users.update_one(
                {'_id': user['_id']},
                {'$set': {'delegated_roles': new_delegated_roles, 'delegated_role_hash': new_delegated_role_hash}}
            )

    return jsonify({'message': 'Role deleted successfully'}), 200


# User Management Code

@app.route('/users', methods=['GET'])
# @jwt_required()
def get_users():
    print("1")
    users = mongo.db.users.find({}, {'password_hash': 0})  # Exclude password hashes from the result
    return jsonify([{'username': user['username'],'name':user['name'] , 'email': user['email'], 'roles': user['roles'], 'delegated_roles': user.get('delegated_roles', [])} for user in users]), 200


@app.route('/users', methods=['POST'])
# @jwt_required()
def create_user():
    user_data = request.json
    username = user_data.get('username')
    users = mongo.db.users.find({'username':username})
    mon_name=[]
    for us in users:
        mon_name=us
    name = user_data.get('name') 
    email = user_data.get('email') 
    password = user_data.get('password')
    phone_number = user_data.get('phone_number')
    # expiry_date = user_data.get('expiry_date')
    roles = user_data.get('roles')
    delegated_roles = user_data.get('delegated_roles')

    # Validate required fields
    print(mon_name['email'])
    print(type(roles))
    print(mon_name)
    
    allowed_fields = []  # Define allowable fields to update
    if email:
        allowed_fields.append('email')
    if name:
        allowed_fields.append('name')
    if roles[0]:
        allowed_fields.append('roles')
    if phone_number:
        allowed_fields.append('phone_number')
    if delegated_roles[0]:
        allowed_fields.append('delegated_roles')
    updates = {field: value for field, value in user_data.items() if field in allowed_fields}
    print(updates)
    if mon_name:
        result = mongo.db.users.update_one({'username': username}, {'$set': updates})
        if roles[0]:
            new_role_hash = sha256_hash(updates['roles'])
            i = 0
            role_map = {}
            for role in roles:
                c = f'{i}'
                role_map[c] = role
                i = i + 1
            result = mongo.db.users.update_one(
                {'username': username},
                {'$set': {'roles': role_map, 'role_hash': new_role_hash}}
            )
        if delegated_roles[0]:
            new_delegated_role_hash = sha256_hash(updates['delegated_roles'])
            i = 0
            role_map = {}
            for role in delegated_roles:
                c = f'{i}'
                role_map[c] = role
                i = i + 1
            result = mongo.db.users.update_one(
                {'username': username},
                {'$set': {'delegated_roles': role_map, 'delegated_role_hash': new_delegated_role_hash}}
            )
        if password:
            password_hash = sha256(password.encode()).hexdigest()
            result = mongo.db.users.update_one(
                {'username': username},
                {'$set':{'password_hash':password_hash}}
            )
        return jsonify({'message': 'User Updated'}),200
    print("2")
    if not all([username, name, email, password, phone_number, roles ]):
        return jsonify({'error': 'Username, email, and password are required'}), 400

    # Hash the password
    password_hash = sha256(password.encode()).hexdigest()

    # Calculate role hashes
    role_hash = sha256_hash(roles)
    delegated_role_hash = sha256_hash(delegated_roles)

    # Insert into database
    mongo.db.users.insert_one({
        'username': username,
        'name' : name,
        'email': email,
        'phone_number': phone_number,
        'password_hash': password_hash,
        'roles': roles,
        'role_hash': role_hash,
        'delegated_roles': delegated_roles,
        'delegated_role_hash': delegated_role_hash
    })

    return jsonify({'message': 'User created successfully'}), 201


if __name__ == "__main__":
    app.run(debug=True)