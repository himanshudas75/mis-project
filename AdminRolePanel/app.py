import datetime
import hashlib
from flask import Flask, request, jsonify, make_response, render_template, redirect, flash
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
from hashlib import sha256
import os

app = Flask(__name__)

# Flask configuration
app.config['MONGO_URI'] = os.environ.get('MONGO_URI', 'mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/todoListDatabase')  # Replace with your MongoDB URI
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'abcd')  # Change this to a secure key
app.config['JWT_IDENTITY_CLAIM'] = JWT_IDENTITY_CLAIM = os.environ.get('JWT_IDENTITY_CLAIM', 'identity')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', '300')))


# Initialize extensions
mongo = PyMongo(app)
jwt = JWTManager(app)

def check_authz(username):
    roles = get_roles(username)

    if 'ADMIN' in roles:
        return True
    

def get_roles(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('roles', {})
    return {}

def get_role_hash(username):
    user = mongo.db.users.find_one({'username': username})
    if user:
        return user.get('role_hash', '')
    return ''

def sha256_hash(list1):
  """Calculates the SHA-256 hash of a list.

  Args:
    list1: The list to hash.

  Returns:
    The SHA-256 hash of the list as a hexadecimal string.
  """

  sha256 = hashlib.sha256()
  for item in list1:
    sha256.update(item.encode())
  return sha256.hexdigest()

# Flask routes
@app.route('/admin')
def admin():
    token_cookie = request.cookies.get('access_token')

    if not token_cookie:
        return redirect('/login', code=302) # Change this to the gateway's login

    try:
        decoded_token = decode_token(token_cookie)
        identity = decoded_token[JWT_IDENTITY_CLAIM]

        if not check_authz(identity):
            flash('You are not authorized to access this page', 'error')
            return redirect('/login', code=401)

        return render_template('admin.html', username=identity) # Change this to the required frontend
    except Exception as e:
        return redirect('/login', code=302)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        password = data.get('password')
        password_hash = password
        if password is not None:
            password_hash = sha256(password.encode()).hexdigest()
        redirect_to = '/admin'

        user = mongo.db.users.find_one({'username': username, 'password_hash': password_hash})

        if user:
            roles = get_roles(username)
            access_token = create_access_token(identity=username, user_claims={'roles': roles})
            response = make_response(redirect(redirect_to))
            response.set_cookie('access_token', value=access_token, httponly=True)
            return response
        else:
            flash('Invalid credentials. Please try again.', 'error')
        
    return render_template('login.html')

# @app.route('/verify', methods=['GET'])
# def verify():
#     token_cookie = request.cookies.get('access_token')

#     if not token_cookie:
#         return jsonify({'message': 'Token not found in the cookie'}), 401

#     try:
#         # Decode the token manually and get the identity
#         decoded_token = decode_token(token_cookie)
#         identity = decoded_token[JWT_IDENTITY_CLAIM]
        
#         if mongo.db.users.find_one({'username': identity}) is None:
#             return jsonify({'message': 'User not found'}), 401

#         if decoded_token.get('last_role_update_hash') != get_role_hash(identity):
#             return jsonify({'message': 'Roles have been updated. Please login again'}), 401
        
#         return jsonify(logged_in_as=identity), 200
#     except Exception as e:
#         return jsonify({'message': str(e)}), 401

@app.route('/roles', methods=['GET', 'POST'])
def roles():
    roles = mongo.db.roles.find()
    return render_template('roles.html', roles=roles)

@app.route('/logout', methods=['GET'])
def logout():
    response = make_response(redirect('/'))
    response.delete_cookie('access_token')
    return response

@app.route('/create_role', methods=['POST'])
def create_role():
    data = request.json
    perms = {}
    role_name = data.get('role_name')
    for perm_name, perm_value in data.get('permissions'):
        perms[perm_name] = perm_value
    
    mongo.db.roles.insert_one({'role_name': role_name, 'permissions': perms})
    return jsonify({'message': 'Role created successfully'}), 200

@app.route('/update_role', methods=['POST'])
def update_role():
    data = request.json
    perms = {}
    role_name = data.get('role_name')
    for perm_name, perm_value in data.get('permissions'):
        perms[perm_name] = perm_value
    
    mongo.db.roles.update_one({'role_name': role_name}, {'$set': {'permissions': perms}})
    return jsonify({'message': 'Role updated successfully'}), 200

@app.route('/delete_role', methods=['POST'])
def delete_role():
    data = request.json
    role_name = data.get('role_name')
    
    mongo.db.roles.delete_one({'role_name': role_name})
    return jsonify({'message': 'Role deleted successfully'}), 200

@app.route('/view_all_roles', methods=['GET'])
def view_roles():
    roles = mongo.db.roles.find()
    return jsonify(roles), 200

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    password_hash = sha256(password.encode()).hexdigest()
    roles = data.get('roles')
    role_hash = sha256_hash(roles)
    name = data.get('name')
    phno = data.get('phno')
    email = data.get('email')
    # expiry = cuurent time + 4 years
    expiry = datetime.now() + timedelta(days=1461)
    pass_reset_flag = False
    
    mongo.db.users.insert_one(
        {'username ': username, 
         'password_hash': password_hash, 
         'roles': roles, 
         'role_hash': role_hash, 
         'name': name, 
         'phno': phno, 
         'email': email, 
         'expiry': expiry, 
         'pass_reset_flag': pass_reset_flag}
        )
    return jsonify({'message': 'User added successfully'}), 200

@app.route('/update_user', methods=['POST'])
def update_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    password_hash = sha256(password.encode()).hexdigest()
    
    

if __name__ == '__main__':
    app.run(debug=True)
