from flask import Flask, jsonify
import subprocess
import csv
from flask_cors import CORS
from flask import Response
import json
import os
from flask import request

app = Flask(__name__)
CORS(app)
@app.route('/execute-script', methods=['GET'])
def execute_script():
    days = request.args.get('days')
    currentUrl = request.args.get('currentUrl')
    print("current url: ", currentUrl)
    print("days", days)

    subprocess.run(['python', 'read_emails.py', '--days', days, '--currentUrl', currentUrl])
    
    return jsonify({'status': 'success', 'message': 'Script executed successfully'})



@app.route('/predict', methods=['GET'])
def predict():
    subprocess.run(['python', 'prediction.py'])
    
    # Return a response to the extension
    return jsonify({'status': 'success', 'message': 'Script executed successfully'})
    
@app.route('/load_data', methods = ['GET'])
def load_data():
    data = []
    with open('dstPrediction.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
        
    data_json = json.dumps(data)
    
    
    return Response(data_json, mimetype='application/json')


@app.route('/deleteFile', methods=['DELETE'])
def delete_file():
    try:    
        os.remove('./gmail_token.json')
        return 'File deleted successfully.'
    except Exception as e:
        return f'Error deleting file: {str(e)}'





if __name__ == '__main__':
    app.run(debug=True)

