from flask import Flask, request, jsonify, make_response, render_template, redirect, flash
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
from datetime import timedelta
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

# Flask routes
@app.route('/')
def home():
    token_cookie = request.cookies.get('access_token')

    if not token_cookie:
        return redirect('/login', code=302)

    try:
        decoded_token = decode_token(token_cookie)
        identity = decoded_token[JWT_IDENTITY_CLAIM]
        return render_template('home.html', username=identity)
    except Exception as e:
        return redirect('/login', code=302)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        try:
            data = request.form
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                flash('Username and password are required', 'error')
                return render_template('signup.html')

            # Check if the username already exists
            if mongo.db.users.find_one({'username': username}):
                flash('Username already exists', 'error')
                return render_template('signup.html')

            # Create a new user
            new_user = {'username': username, 'password': password}
            mongo.db.users.insert_one(new_user)

            flash('User created successfully', 'success')
        except Exception as e:
            print(e)
            flash('An error occurred', 'error')

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        password = data.get('password')
        redirect_to = data.get('redirect_to')

        user = mongo.db.users.find_one({'username': username, 'password': password})

        if user:
            access_token = create_access_token(identity=username)
            response = make_response(redirect(redirect_to))
            response.set_cookie('access_token', value=access_token, httponly=True)
            return response
        else:
            flash('Invalid credentials. Please try again.', 'error')
        
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

@app.route('/logout', methods=['GET'])
def logout():
    response = make_response(redirect('/'))
    response.delete_cookie('access_token')
    return response

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
