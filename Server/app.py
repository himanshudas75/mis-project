# app.py
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import random
import string
from datetime import datetime, timedelta
from flask_mail import Mail, Message
import json
from bson.json_util import dumps
from flask_cors import CORS
# from flask_cors import cross_origin

app = Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS']= 'Content-Type'
app.config['MONGO_URI'] = "mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/userDB"  # MongoDB URI
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # SMTP server address   ye verify karna hai sir se ki domain kya use karein
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = '20je0337@cse.iitism.ac.in'  # SMTP server username
app.config['MAIL_PASSWORD'] = 'Divij@2002'  # SMTP server password
# app.secret_key = 'your_secret_key'  # Change this to a secret key for session management
mongo = PyMongo(app)
mail = Mail(app)

app.config['MONGO_URI'] = 'mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/applicationDB'
mongo1 = PyMongo(app)

##Admin Database
app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/adminDB'
mongo2= PyMongo(app)

##JOB's DB
app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/jobDB'
mongo3= PyMongo(app)

app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/tempDB'
mongo4= PyMongo(app)

# Routes
@app.route('/home')
def index():
    return "WELCOME",200

@app.route('/register', methods=['POST'])
def signup():
    try:
            print("hello")
            username = request.json['username'] #Fields to be added
            print(username)
            email = request.json['email']
            password = request.json['password']
            hashed_password = generate_password_hash(password)
            
            # if mongo.db.users.find_one({'username': username}):
            #     return 'Username already exists! Please choose another username.', 200

            if mongo.db.users.find_one({'email': email}):
                return 'Email already exists! Please use another email address.', 400
            print("mongo")
            verification_token = ''.join(random.choices(string.ascii_letters + string.digits, k=50))
            
            expiry_time = datetime.now() + timedelta(hours=1)
            
            mongo.db.email_verification.insert_one({'email': email, 'token': verification_token, 'expiry_time': expiry_time})
            
            verification_link = url_for('verify_email', token=verification_token, _external=True)
            
            # msg = Message('Verify Your Email', sender='20je0337@cse.iitism.ac.in', recipients=[email])
            
            # msg.body = f'Click the following link to verify your email address: {verification_link}'
            
            # mail.send(msg)
            
            user_data = {
                'username': username,
                'email': email,
                'password': hashed_password,
                'verified': False  # Set user as unverified initially
            }
            mongo.db.users.insert_one(user_data)
            return 'Signup successful! Please check your email to verify your account.', 200 #RESPONSE
    except: 
        print("error occured")
        return "Something Happen",500
    # return render_template('signup.html') FRONTEND WORK

# def send_verification_email(email, verification_link):
    
#     return 'ok'

@app.route('/verify_email/<token>')
def verify_email(token):
    token_data = mongo.db.email_verification.find_one({'token': token})
    if token_data and datetime.now() < token_data['expiry_time']:
        mongo.db.users.update_one({'email': token_data['email']}, {'$set': {'verified': True}}) #USER VERIFIED
        mongo.db.email_verification.delete_one({'token': token})
        return 'verification complete', 200 #'Email verification successful! You can now login.',
    else:
        return 'error in verification', 400 #'Email verification link has expired or is invalid.',

@app.route('/', methods=['POST'])
def login():
    # response = jsonify({'message': 'POST request handled successfully'})
    # response.headers.add('Access-Control-Allow-Origin', '*') 
    # response = jsonify({'message': 'POST request handled successfully'})
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    try:
        # print("hello")
        username = request.json['username']
        print(username)
        password = request.json['password']
        print(password)
        user = mongo.db.users.find_one({'username': username})
        
        if user and check_password_hash(user['password'], password):
        # if user:
            # session['username'] = username

            # return redirect(url_for('profile'))
            return 'login successfull', 200
        else:
            return 'login unsuccessfull',400 #INVALID
    except:
        print("error occured")
        return 'something went wrong', 500      
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
    try:
        email = request.form.get('email')
        user = mongo.db.users.find_one({'email': email})
        
        if user:
            token = ''.join(random.choices(string.ascii_letters + string.digits, k=50))
            expiry_time = datetime.now() + timedelta(hours=1)
            mongo.db.password_reset_tokens.insert_one({'email': email, 'token': token, 'expiry_time': expiry_time})
            
            reset_link = url_for('reset_password', token=token, _external=True)
            msg = Message('Reset Your Password', sender='noreply@example.com', recipients=[email])
            msg.body = f'Click the following link to reset your password: {reset_link}'
            # mail.send(msg)
            
            # return render_template('password_reset_link_sent.html')
            return jsonify(reset_link),205 # FOR FRONTEND **
        else:
            # return render_template('invalid_email.html')
            return 'error in mongo', 401 # WRONG EMAIL ID
    except:
        print('error occured') 
        return "Something Happen",500   
    # return render_template('forgot_password.html')
    # return 200
    

@app.route('/reset_password/<token>', methods=[ 'POST'])
def reset_password(token):
    try:
        token_data = mongo.db.password_reset_tokens.find_one({'token': token})
        
        if token_data and datetime.now() < token_data['expiry_time']:
                new_password = request.form['new_password']
                print(new_password)
                hashed_password = generate_password_hash(new_password)
                mongo.db.users.update_one({'email': token_data['email']}, {'$set': {'password': hashed_password}})
                mongo.db.password_reset_tokens.delete_one({'token': token})
                
                # return render_template('password_reset_successful.html')
                return 'password reset complete', 200
            # return render_template('reset_password.html')
        else:
            # return render_template('password_reset_expired.html')
            return 'error in mongo', 401 #TOKEN EXPIRED
    except:
        print('error occured')    
        return "Something Happen",500

        
        
@app.route('/form',methods=['POST'])
def form():
    try:
        json_data = request.get_json()    
        email = json_data.get('email')
        print(json_data.get('dob'))
        if email:
            for key in json_data:
                if key != 'email':  # Skip the 'email' key
                    mongo.db.users.update_one({'email': email}, {'$set': {key: json_data.get(key)}})

            return 'Data Inserted Successfully',200
        # Insert JSON data into MongoDB if email ID does not exist
        # mongo.db.users.insert_one(json_data)
        
        return 'User Not Found', 404
    except:
        print('error occurred')
        return "Something Happen",500



@app.route('/edit',methods=['POST'])
def edit():
    try: 
        json_data = request.get_json()    
        email = json_data.get('email')
        if email:
            for key in json_data:
                if key != 'email':  # Skip the 'email' key
                    mongo.db.users.update_one({'email': email}, {'$set': {key: json_data.get(key)}})

            return 'Data Updated Successfully',200
        # Insert JSON data into MongoDB if email ID does not exist
        # mongo.db.users.insert_one(json_data)
        
        return 'User Not Found', 404
    except:
        print('error occurred')
        return "Something Happen",500

@app.route('/details',methods=['POST'])
def details():
    try:
        json_data = request.get_json()    
        email = json_data.get('email')
        
        if email:
            data = mongo.db.users.find_one({'email': email},{'_id':0})
            return jsonify(data),200
        # Insert JSON data into MongoDB if email ID does not exist
        # mongo.db.users.insert_one(json_data)
        
        return 'User Not Found', 404
    except:
        print('error occurred')
        return "Something Happen",500

@app.route('/apply',methods=['POST'])
def apply():
    try:
        json_data= request.get_json()
        # mongo1.db.users.insert_one(json_data)
        email = json_data.get('email')
        department = json_data.get('department')
        jobId = json_data.get('jobId')
        status = json_data.get('status')
        applicationId = json_data.get('applicationId')
        data=mongo1.db.users.find_one({'email': email},{'department':department})

        if data:
            return "Cannot Apply for this Department",400
        data = {
            'email': email,
            'jobId': jobId,
            'status': status,
            'applicationId': applicationId,
            'data': json_data
        }
        mongo1.db.users.insert_one(data)
        return "Application Submitted Successfully",200
    except:
        print('error occurred')
        return "Something Happen",500

@app.route('/viewStatus',methods=['POST'])
def view():
    try:

        json_data= request.get_json()
        # mongo1.db.users.insert_one(json_data)
        email = json_data.get('email')
        data=mongo1.db.users.find_one({'email':email},{"_id":0})
        if data:
            return data,200
        else:
            return "BAD REQUEST",400
    except: 
        print("error occurred")
        return "Something Happen",500
    

##ADMIN API
@app.route('/adminlogin',methods=['POST'])
def adminLogin():
    try:

        username = request.form['username']
        password = request.form['password']
        print("haha")
        user = mongo2.db.user.find_one({'username':username})
        if user and check_password_hash(user['password'],password):
            return "Admin Logged in",200
        else:
            return "Don't Try to hack",400
    except:
        print("error occurred")
        return "Something Happen",500

@app.route('/updatestatus',methods=['POST'])
def adminEdit():
    try:

        json_data = request.get_json()    
        email = json_data.get('email')
        if email:
            for key in json_data:
                if key != 'email':  # Skip the 'email' key
                    mongo1.db.users.update_one({'email': email}, {'$set': {key: json_data.get(key)}})

            return 'statues Updated Successfully',200
        # Insert JSON data into MongoDB if email ID does not exist
        # mongo.db.users.insert_one(json_data)
        
        return 'BAD REQUEST', 404
    except:
        print('error occurred')
        return "Something Happen",500

## JOB OPENING
@app.route('/jobopeningpost',methods=['POST'])
def jobOpeningPost():
    try:

        if request.method=='POST':
            json_data = request.get_json()
            jobId = json_data.get('jobId')
            jobStatus = json_data.get('jobStatus')
            data = {
                'jobId': jobId,
                'jobStatus': jobStatus,
                'data': json_data
            }
            mongo3.db.jobs.insert_one(data)
            return "job opening posted successfully", 200
    except:
        print("error occurred") 
        return "Something Happen",500   

@app.route('/jobopeningget',methods=['GET'])
def jobOpeningGet():
    try:

            data=mongo3.db.jobs.find()
            serialized_results = dumps(data)
            return serialized_results,200
    except:
        print("error occurred")   
        return "Something Happen",500

## JOB CLOSING
@app.route('/jobclosing',methods=['POST'])
def jobClosing():
    try:

        json_data=request.get_json()
        job_id=json_data.get('jobId')
        mongo3.db.jobs.delete_one({'jobId':job_id})
        return "JOB OPENING CLOSED",200
    except:
        print('error occurred')
        return "Something Happen",500

##  TEMP DB
@app.route('/tempstore',methods=['POST'])
def tempStore():
    try:

            json_data = request.get_json()
            email = json_data.get('email')
            data = mongo4.db.tempdata.find_one({'email':email},{"id":0})
            if data:
               mongo4.db.tempdata.update_one({'email': email}, {'$set': {'data':json_data.get('data')}})
            else:
               mongo4.db.tempdata.insert_one({'email':email,"data":json_data})
            return "temporary data updated succesfully", 200
    except:
        print("error occurred")  
        return "Something Happen",500  

@app.route('/tempget',methods=['POST'])
def tempGet():
    try:

        json_data= request.get_json()
        email = json_data.get('email')
        data=mongo4.db.tempdata.find_one({'email':email},{"_id":0})
        if data:
            return data,200
        else:
            return "data not found",404
    except:
        print("error occurred")  
        return "Something Happen",500 

if __name__ == '__main__':
    app.run(debug=True)
