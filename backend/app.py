from flask import Flask, request, jsonify, redirect
import pandas as pd
import numpy as np
from flask_cors import CORS  # CORS for handling Cross-Origin Resource Sharing
import pickle




app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})


import os

# Get the directory where the app.py file is located
current_dir = os.path.dirname(__file__)

# Define paths relative to the current directory
model_path = os.path.join(current_dir, 'model.pkl')
fertilizer_path = os.path.join(current_dir,  'classifier1.pkl')
crop_model_paths = {
    'cotton': os.path.join(current_dir,  'Cotton_price.pkl'),
    'coconut': os.path.join(current_dir,  'Coconut_price.pkl'),
    'gram': os.path.join(current_dir,  'Gram_price.pkl'),
    'jute': os.path.join(current_dir,  'Jute_price.pkl'),
    'maize': os.path.join(current_dir,  'Maize_price.pkl'),
    'moong': os.path.join(current_dir,  'Moong_price.pkl'),
    'wheat': os.path.join(current_dir,  'wheat_price.pkl'),
}

# Load models using relative paths
model = pickle.load(open(model_path, 'rb'))
fertilizer = pickle.load(open(fertilizer_path, 'rb'))
crop_models = {key: pickle.load(open(path, 'rb')) for key, path in crop_model_paths.items()}


@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "API is Running"
    }
    return jsonify(data)


# Define a route for making crop predictions
@app.route('/predictCrop', methods=['POST'])
def predict_crop():
    try:
        data = request.get_json()
        query_df = pd.DataFrame(data, index=[0])
        # Your model expects an array of arrays
        arr = query_df.values.tolist()
        prediction = model.predict(arr)
        predicted_crop = prediction[0]
        return jsonify({'PredictedCrop': predicted_crop})
    except Exception as e:
        return jsonify({'error': str(e)})
    
# Define a route for making fertilizer predictions
@app.route('/predictFertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.get_json()
        query_df = pd.DataFrame([data])
        # Your model expects an array of arrays
        arr = query_df.values.tolist()
        prediction = fertilizer.predict(arr)
        if prediction[0]==0:
            recommended_fertilizer = "TEN-TWENTY SIX-TWENTY SIX"
        elif prediction[0]==1:
            recommended_fertilizer = "Fourteen-Thirty Five-Fourteen"
        elif prediction[0]==2:
            recommended_fertilizer = "Seventeen-Seventeen-Seventeen"
        elif prediction[0]==3:
            recommended_fertilizer = "TWENTY-TWENTY"
        elif prediction[0]==4:
            recommended_fertilizer = "TWENTY EIGHT-TWENTY EIGHT"
        elif prediction[0]==5:
            recommended_fertilizer = "DAP"
        else:
            recommended_fertilizer = "UREA"
        
        return jsonify({'RecommendedFertilizer': recommended_fertilizer})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/predictPrice', methods=['POST'])
def predict_price():

    base = {
        "coconut": 5100,
        "cotton": 3600,
        "black_gram": 2800,
        "maize": 1175,
        "moong": 3500,
        "jute": 1675,
        "wheat": 1350
    }

    try:
        data = request.get_json()
        month = data['month']
        year = data['year']
        rainfall = data['rainfall']
        crop = data['crop']

        model = crop_models[crop]

        arr = [month, year, rainfall]

        prediction = model.predict(pd.DataFrame([arr]))

        return jsonify({'PredictedPrice': round((prediction[0] * base[data['crop'].lower()]) / 100, 2 )})
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)
