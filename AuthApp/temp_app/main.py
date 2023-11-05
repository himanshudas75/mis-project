from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def welcome():
    return "Welcome", 200

@app.route('/auth', methods=['GET'])
def set_status():
    status_code = request.args.get('code', type=int, default=200)
    return jsonify(message="Status code set to {}".format(status_code)), status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)