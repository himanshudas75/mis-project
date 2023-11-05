from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome", 200

@app.route('/auth-z', methods=['GET'])
def verify():
    cookie_val = request.cookies.get('User')
    if cookie_val is not None:
        return jsonify(message="Authorized"), 200
    else:
        return jsonify(message="Not Authorized"), 401

@app.route('/auth-n', methods=['GET'])
def authentication():
    user = request.args.get('user', type=str, default='NULL')

    if user != 'NULL':
        response = jsonify(message='User Set')
        response.set_cookie('User', user)
    else:
        response = jsonify(message='User Not Set')
    
    return response


@app.route('/auth', methods=['GET'])
def set_status():
    status_code = request.args.get('code', type=int, default=200)

    headers = {
        "User": "Nana"
    }

    response = jsonify(message="Status code set to {}".format(status_code))
    response.set_cookie('Apple', 'Orange')

    return response, status_code, headers

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)