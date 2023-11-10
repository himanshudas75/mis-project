from flask import Flask, request, jsonify, make_response, render_template, redirect
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
import os

app = Flask(__name__)

# Flask configuration
app.config['MONGO_URI'] = os.environ['MONGO_URI']  # Replace with your MongoDB URI
app.config['SECRET_KEY'] = os.environ['JWT_SECRET_KEY']  # Change this to a secure key
app.config['JWT_IDENTITY_CLAIM'] = JWT_IDENTITY_CLAIM = os.environ['JWT_IDENTITY_CLAIM']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=int(os.environ['JWT_ACCESS_TOKEN_EXPIRES']))

# Initialize extensions
mongo = PyMongo(app)
jwt = JWTManager(app)

# Flask routes
@app.route('/')
def home():
    return "HELLO"
    # token_cookie = request.cookies.get('access_token')

    # if not token_cookie:
    #     return redirect('/login', code=302)

    # try:
    #     decoded_token = decode_token(token_cookie)
    #     identity = decoded_token[JWT_IDENTITY_CLAIM]
    #     return "Hello, " +identity
        
    # except Exception as e:
    #     return redirect('/login', code=302)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), 400

        # Check if the username already exists
        if mongo.db.users.find_one({'username': username}):
            return jsonify({'message': 'Username already exists'}), 400

        # Create a new user
        new_user = {'username': username, 'password': password}
        mongo.db.users.insert_one(new_user)

        return jsonify({'message': 'User created successfully'}), 201

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        password = data.get('password')

        user = mongo.db.users.find_one({'username': username, 'password': password})

        if user:
            # Create JWT token
            access_token = create_access_token(identity=username)
            # Set the token in a cookie
            # response = make_response(jsonify({'message': 'Login successful'}), 200)
            redirect_to = '/'
            response = make_response(redirect(redirect_to))
            response.set_cookie('access_token', value=access_token, httponly=True)

            return response
        else:
            return jsonify({'message': 'Invalid credentials'}), 401

    return render_template('login.html')

@app.route('/verify', methods=['GET'])
def verify():
    token_cookie = request.cookies.get('access_token')

    if not token_cookie:
        return jsonify({'message': 'Token not found in the cookie'}), 401

    try:
        # Decode the token manually and get the identity
        decoded_token = decode_token(token_cookie)
        identity = decoded_token[JWT_IDENTITY_CLAIM]
        return jsonify(logged_in_as=identity), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 401

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
