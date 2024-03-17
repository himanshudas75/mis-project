# After the user is authenticated, the aggregator service should redirect the user to the select page.
# In the select page the user can select which type of dashboard they want to use.
# The types of dashboards are based on the roles of the user. The roles are stored in the JWT token.
# On selecting one of the dashboards, the aggregator service should redirect the user to the respective dashboard.
# The aggregator service uses the same routes in the Auth_Flask service to login, verify, and logout the user.

# Write the program that implements the aggregator service in Python and create React components for the select page and the dashboards.
# The aggregator service should use the Flask routes from the Auth_Flask service to login, verify, and logout the user.

# The aggregator service should have the following routes:
# - /select: The select page where the user can select the type of dashboard they want to use.
# - /admin - The admin dashboard.
# - /student - The student dashboard.
# - /staff - The staff dashboard.

from flask import Flask, request, jsonify, redirect
from flask_jwt_extended import decode_token
import requests

app = Flask(__name__)

# Auth Flask service URL
AUTH_SERVICE_URL = "http://localhost:5000"

# Routes
@app.route('/')
def home():
    return redirect('/select')

@app.route('/select')
def select_dashboard():
    token_cookie = request.cookies.get('access_token')

    if not token_cookie:
        return redirect('/login')

    try:
        # Call the verify endpoint from Auth Flask service to get user identity
        response = requests.get(f"{AUTH_SERVICE_URL}/verify", cookies={'access_token': token_cookie})
        if response.status_code == 200:
            user_data = response.json()
            identity = user_data.get('logged_in_as')

            # Check user roles and redirect to the respective dashboard
            roles = get_roles(identity)
            if 'admin' in roles:
                return redirect('/admin')
            elif 'student' in roles:
                return redirect('/student')
            elif 'staff' in roles:
                return redirect('/staff')
            else:
                return "Unauthorized", 403  # If no valid roles found

    except Exception as e:
        print(e)
        return "Error", 500

@app.route('/admin')
def admin_dashboard():
    return "Admin Dashboard"

@app.route('/student')
def student_dashboard():
    return "Student Dashboard"

@app.route('/staff')
def staff_dashboard():
    return "Staff Dashboard"

def get_roles(token_cookie):
    try:
        decoded_token = decode_token(token_cookie)
        if decoded_token:
            # Extract roles from user claims in the decoded token
            user_claims = decoded_token.get('user_claims', {})
            roles = user_claims.get('roles', [])
            return roles
    except Exception as e:
        print("Error decoding token:", e)
    return []


if __name__ == '__main__':
    app.run(debug=True)
