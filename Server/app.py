# app.py
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import random
import string
from datetime import datetime, timedelta
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'  # MongoDB URI
app.config['MAIL_SERVER'] = 'smtp.example.com'  # SMTP server address
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@example.com'  # SMTP server username
app.config['MAIL_PASSWORD'] = 'your_password'  # SMTP server password
# app.secret_key = 'your_secret_key'  # Change this to a secret key for session management
mongo = PyMongo(app)
mail = Mail(app)

# Routes
@app.route('/')
def index():
    return "WELCOME",200

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username'] #Fields to be added
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password)

        # if mongo.db.users.find_one({'username': username}):
        #     return 'Username already exists! Please choose another username.', 200

        if mongo.db.users.find_one({'email': email}):
            return 'Email already exists! Please use another email address.', 200

        verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=50))
        expiry_time = datetime.now() + timedelta(hours=1)
        mongo.db.email_verification.insert_one({'email': email, 'token': verification_token, 'expiry_time': expiry_time})

        verification_link = url_for('verify_email', token=verification_token, _external=True)
        send_verification_email(email, verification_link) # verification link

        user_data = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'verified': False  # Set user as unverified initially
        }
        mongo.db.users.insert_one(user_data)
        return 'Signup successful! Please check your email to verify your account.', 200 #RESPONSE

    # return render_template('signup.html') FRONTEND WORK

def send_verification_email(email, verification_link):
    msg = Message('Verify Your Email', sender='noreply@example.com', recipients=[email])
    msg.body = f'Click the following link to verify your email address: {verification_link}'
    mail.send(msg)

@app.route('/verify_email/<token>')
def verify_email(token):
    token_data = mongo.db.email_verification.find_one({'token': token})
    if token_data and datetime.now() < token_data['expiry_time']:
        mongo.db.users.update_one({'email': token_data['email']}, {'$set': {'verified': True}}) #USER VERIFIED
        mongo.db.email_verification.delete_one({'token': token})
        return  200 #'Email verification successful! You can now login.',
    else:
        return  400 #'Email verification link has expired or is invalid.',

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = mongo.db.users.find_one({'username': username})
        
        if user and check_password_hash(user['password'], password):
            # session['username'] = username
            # return redirect(url_for('profile'))
            return 200
        else:
            return 'hii',400 #INVALID

    # return render_template('login.html')
## HOME PAGE
        
# @app.route('/profile')
# def profile():
#     if 'username' in session:
#         username = session['username']
#         return f'Logged in as {username}'
#     return 'You are not logged in'

## LOGOUT 
        
# @app.route('/logout')
# def logout():
#     session.pop('username', None)
#     # return redirect(url_for('index'))
        
## RESET PASSWORD

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email')
        user = mongo.db.users.find_one({'email': email})
        if user:
            token = ''.join(random.choices(string.ascii_letters + string.digits, k=50))
            expiry_time = datetime.now() + timedelta(hours=1)
            mongo.db.password_reset_tokens.insert_one({'email': email, 'token': token, 'expiry_time': expiry_time})
            
            reset_link = url_for('reset_password', token=token, _external=True)
            send_reset_email(email, reset_link)
            # return render_template('password_reset_link_sent.html')
            return jsonify(reset_link),205 # FOR FRONTEND **
        else:
            # return render_template('invalid_email.html')
            return 401 # WRONG EMAIL ID
    # return render_template('forgot_password.html')
    # return 200

def send_reset_email(email, reset_link):
    msg = Message('Reset Your Password', sender='noreply@example.com', recipients=[email])
    msg.body = f'Click the following link to reset your password: {reset_link}'
    mail.send(msg)

@app.route('/reset_password/<token>', methods=[ 'POST'])
def reset_password(token):
    token_data = mongo.db.password_reset_tokens.find_one({'token': token})
    if token_data and datetime.now() < token_data['expiry_time']:
        if request.method == 'POST':
            new_password = request.form.get('new_password')
            hashed_password = generate_password_hash(new_password)
            mongo.db.users.update_one({'email': token_data['email']}, {'$set': {'password': hashed_password}})
            mongo.db.password_reset_tokens.delete_one({'token': token})
            # return render_template('password_reset_successful.html')
            return 200
        # return render_template('reset_password.html')
    else:
        # return render_template('password_reset_expired.html')
        return 401 #TOKEN EXPIRED


if __name__ == '__main__':
    app.run(debug=True)
