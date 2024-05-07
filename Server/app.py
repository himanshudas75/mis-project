# app.py
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from functools import wraps
import jwt 
# from Bcrypt import generate_password_hash, check_password_hashx
from bson.objectid import ObjectId
import random
import string
from datetime import datetime, timedelta
from flask_mail import Mail, Message
import json
from bson.json_util import dumps,loads
from flask_cors import CORS
# from flask_cors import cross_origin

app = Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS']= 'Content-Type'
app.config['MONGO_URI'] = "mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/userDB"  # MongoDB URI
# app.config['MONGO_URI'] = "mongodb://localhost:27017/userDB"
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # SMTP server address   ye verify karna hai sir se ki domain kya use karein
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = '20je0337@cse.iitism.ac.in'  # SMTP server username
app.config['MAIL_PASSWORD'] = 'Divij@2002'  # SMTP server password
# app.secret_key = 'your_secret_key'  # Change this to a secret key for session management
mongo = PyMongo(app)
mail = Mail(app)
bcrypt = Bcrypt(app)

app.config['MONGO_URI'] = 'mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/applicationDB'
# app.config['MONGO_URI'] = 'mongodb://localhost:27017/applicationDB'
mongo1 = PyMongo(app)

##Admin Database
app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/adminDB'
# app.config['MONGO_URI']='mongodb://localhost:27017/adminDB'
mongo2= PyMongo(app)

##JOB's DB
app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/jobDB'
# app.config['MONGO_URI']='mongodb://localhost:27017/jobDB'
mongo3= PyMongo(app)

app.config['MONGO_URI']='mongodb+srv://Divij:Divij2002@cluster0.aj0dc.mongodb.net/tempDB'
# app.config['MONGO_URI']='mongodb://localhost:27017/tempDB'
mongo4= PyMongo(app)

def parse_cookie(jwt_cookie):
    decoded_token = jwt.decode(jwt_cookie, options={"verify_signature": False})
    identity = decoded_token.get("identity")
    roles = decoded_token.get("roles")
    return identity, roles

def extract_user_info(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        jwt_cookie = request.cookies.get("authentication")
        if not jwt_cookie:
            return jsonify({"message": "Token is missing"}), 401

        try:
            decoded_token = jwt.decode(jwt_cookie, options={"verify_signature": False})
            return f(decoded_token, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

    return decorated_function

def has_role(f):
    @wraps(f)
    def decorated_function(decoded_token, *args, **kwargs):

        roles = decoded_token.get("roles")
        assigned_role = "FACULTYRECRUITMENT"

        for role in roles:
            if(role == assigned_role):
                return f(decoded_token, *args, **kwargs)
            
        return (
                jsonify(
                    {
                        "message": "You do not have the necessary role to access this ticket"
                    }
                ),
                403,
            )
        

    return decorated_function
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
            hashed_password = bcrypt.generate_password_hash(password)
            
            # if mongo.db.users.find_one({'username': username}):
            #     return 'Username already exists! Please choose another username.', 200
            print("mongo")
            if mongo.db.users.find_one({'email': email}):
                return 'Email already exists! Please use another email address.', 403
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
        return 'token not found', 404 #'Email verification link has expired or is invalid.',

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
        user = mongo.db.users.find_one({'email': username})
        
        if user and bcrypt.check_password_hash(user['password'], password):
        # if user:
            # session['username'] = username

            # return redirect(url_for('profile'))
            return 'login successfull', 200
        else:
            return 'login unsuccessfull',401 #INVALID
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
    # return redirect(url_for('index'))
        
## RESET PASSWORD

@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        email = request.json.get('email')
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
            return jsonify(reset_link),200 # FOR FRONTEND **
        else:
            # return render_template('invalid_email.html')
            return 'error in mongo', 404 # WRONG EMAIL ID
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
                new_password = request.json['new_password']
                print(new_password)
                hashed_password = bcrypt.generate_password_hash(new_password)
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
        # print(json_data.get('DateofBirth'))
        if email:
            for key in json_data:
                if key != 'email':  # Skip the 'email' key
                    mongo.db.users.update_one({'email': email}, {'$set': {key: json_data.get(key)}})

            mongo4.db.tempdata.delete_one({'email': email})

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

@app.route('/details',methods=['GET'])
def details():
    try:
        email = request.args.get('email')
        print(email)
        if email:
            
            data = mongo.db.users.find_one({'email': email},{'_id':0})
            # data = list(data)
            print(data)
            return data,200
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
        data = mongo1.db.users.find_one({'email': email, 'department': department}, {})
        print(type(data))
        if data:
            return "Cannot Apply for this Department",403
        data = {
            'email': email,
            'jobId': jobId,
            'status': status,
            'applicationId': applicationId,
            'department': department,
            'post':json_data.get('post')
        }
        mongo1.db.users.insert_one(data)
        return "Application Submitted Successfully",200
    except:
        print('error occurred')
        return "Something Happen",500

@app.route('/viewStatus',methods=['GET'])
def view():
    try:
        email = request.args.get('email')
        data=mongo1.db.users.find({'email':email},{"_id":0})
        data = list(data)
        if data:
            return data,200
        else:
            print("cghj")
            return "no positioned applied to",405
    except: 
        print("error occurred")
        return "Something Happen",500
    

##ADMIN API
@app.route('/adminlogin',methods=['POST'])
@extract_user_info
@has_role
def adminLogin():
    try:

        username = request.json['username']
        password = request.json['password']
        print("haha")
        user = mongo2.db.user.find_one({'username':username})
        if user and bcrypt.check_password_hash(user['password'],password):
            return "Admin Logged in",200
        else:
            return "Login unsuccessful",401
    except:
        print("error occurred")
        return "Something Happen",500

@app.route('/getAllApply',methods=['GET']) #admin
@extract_user_info
@has_role
def view_all():
    try:

        data=mongo1.db.users.find({},{"_id":0})
        data = list(data)
        if data:
            return data,200
        else:
            return "BAD REQUEST",400
    except: 
        print("error occurred")
        return "Something Happen",500

@app.route('/updatestatus',methods=['POST']) #admin
@extract_user_info
@has_role
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
        
        return 'Email not found', 404
    except:
        print('error occurred')
        return "Something Happen",500
    
# @app.route('/getAllApply',methods=['POST'])
# def adminView():
#     try:

#         data=mongo1.db.users.find_one({},{"_id":0})
#         if data:
#             return data,200
#         else:
#             return "No application found",404
#     except: 
#         print("error occurred")
#         return "Something Happen",500

## JOB OPENING
@app.route('/jobopeningpost',methods=['POST']) #admin
@extract_user_info
@has_role
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

@app.route('/jobopeningget',methods=['GET']) #
def jobOpeningGet():
    try:

            data=mongo3.db.jobs.find()
            serialized_results = dumps(data)
            return serialized_results,200
    except:
        print("error occurred")   
        return "Something Happen",500

## JOB CLOSING
@app.route('/jobclosing',methods=['POST']) #admin
@extract_user_info
@has_role
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
        config = json_data.get('config')
        data = json_data.get('data')

        # Check if email already exists in the database
        existing_data = mongo4.db.tempdata.find_one({'email': email})

        if existing_data:
            updated_data = {}
            if config:
                existing_config = existing_data.get('config', [])
                existing_config.append(config)
                updated_data['config'] = existing_config
            if data:
                existing_data_list = existing_data.get('data', [])
                existing_data_list.append(data)
                updated_data['data'] = existing_data_list

            # Update the document with the new config or data list
            mongo4.db.tempdata.update_one({'email': email}, {'$set': updated_data})

        else:
            mongo4.db.tempdata.insert_one({'email': email, 'data': [data], 'config': [config]})

        return "Temporary data updated successfully", 200
    except Exception as e:
        print("Error occurred:", e)
        return "Something went wrong", 500


@app.route('/tempget',methods=['GET'])
def tempGet():
    try:

        # json_data= request.get_json()
        # email = json_data.get('email')
        email = request.args.get('email')
        print(email)
        data=mongo4.db.tempdata.find_one({'email':email},{"_id":0})
        print(jsonify(data))
        if data:
            return data,200
        else:
            return "data not found",404
    except:
        print("error occurred")  
        return "Something Happen",500 
    
if __name__ == '__main__':
    app.run(debug=True)
