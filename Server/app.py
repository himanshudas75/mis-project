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
mongo = PyMongo(app, uri="MONGO_URI")
mail = Mail(app)

app.config['MONGO_URI_2'] = 'mongodb://localhost:27017/database2'
mongo1 = PyMongo(app, uri="MONGO_URI_2")

##Admin Database
app.config['ADMIN']='mongodb://localhost:27017/database3'
mongo2= PyMongo(app,uri ="ADMIN")

##JOB's DB
app.config['JOB']='mongodb://localhost:27017/database4'
mongo3= PyMongo(app,uri='JOB')

# Routes
@app.route('/home')
def index():
    return "WELCOME",200

@app.route('/register', methods=['GET', 'POST'])
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

@app.route('/', methods=['POST'])
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

        
        
@app.rout('/form',methods=['POST'])
def form():
    json_data = request.get_json()    
    email = json_data.get('email')
    if email:
        for key, value in json_data:
            if key != 'email':  # Skip the 'email' key
                mongo.db.users.update_one({'email': email}, {'$set': {key: value}})

        return 'Data Inserted Successfully',200
    # Insert JSON data into MongoDB if email ID does not exist
    # mongo.db.users.insert_one(json_data)
    
    return 'User Not Found', 404



@app.rout('/edit',methods=['POST'])
def edit():
    json_data = request.get_json()    
    email = json_data.get('email')
    if email:
        for key, value in json_data:
            if key != 'email':  # Skip the 'email' key
                mongo.db.users.update_one({'email': email}, {'$set': {key: value}})

        return 'Data Updated Successfully',200
    # Insert JSON data into MongoDB if email ID does not exist
    # mongo.db.users.insert_one(json_data)
    
    return 'User Not Found', 404

@app.rout('/details',methods=['GET'])
def details():
    json_data = request.get_json()    
    email = json_data.get('email')
    if email:
        data = mongo.db.users.find_one({'email': email})
        return data,200
    # Insert JSON data into MongoDB if email ID does not exist
    # mongo.db.users.insert_one(json_data)
    
    return 'User Not Found', 404

@app.rout('/apply',methods=['POST'])
def apply():
    json_data= request.get_json()
    # mongo1.db.users.insert_one(json_data)
    email = json_data.get('email')
    department = json_data.get('department')
    data=mongo1.db.users.find_one({'email': email},{'department':department})

    if data:
        return "Cannot Apply for this Department",400
    mongo1.db.users.insert_one(json_data)
    return "Application Submitted Successfully",200

@app.rout('/viewStatus',methods=['GET'])
def view():
    json_data= request.get_json()
    # mongo1.db.users.insert_one(json_data)
    email = json_data.get('email')
    data=mongo1.db.users.find_one({'email':email})
    if data:
        return data,200
    else:
        return 400,"BAD REQUEST"
    

##ADMIN API
@app.route('/adminlogin',methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    user = mongo2.db.user.find_one({'username':username})
    if user and check_password_hash(user['password'],password):
        return 200,"Admin Logged in"
    else:
        return 400,"Don't Try to hack"

@app.route('/updatestatus',methods=['POST'])
def edit():
    json_data = request.get_json()    
    email = json_data.get('email')
    if email:
        for key, value in json_data:
            if key != 'email':  # Skip the 'email' key
                mongo1.db.users.update_one({'email': email}, {'$set': {key: value}})

        return 'statues Updated Successfully',200
    # Insert JSON data into MongoDB if email ID does not exist
    # mongo.db.users.insert_one(json_data)
    
    return 'BAD REQUEST', 404

## JOB OPENING
@app.rout('/jobopening',methods=['POST','GET'])
def job():
    if request.method=='POST':
        json_data=request.get_json()
        mongo3.db.users.insert_one(json_data)
        return 200
    else:
        data=mongo3.db.users.find()
        return data,200

## JOB CLOSING
@app.rout('/jobclosing',methods=['POST'])
def job():
    json_data=request.get_json()
    job_id=json_data.get('id')
    mongo3.db.users.delete_one({'id':job_id})
    return 200,"JOB OPENING CLOSED"

if __name__ == '__main__':
    app.run(debug=True)
