from flask import Flask, request, jsonify, redirect
import pandas as pd
import numpy as np
from flask_cors import CORS  # CORS for handling Cross-Origin Resource Sharing
import pickle




app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})


model = pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\model.pkl", 'rb'))
fertilizer = pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\classifier1.pkl",'rb'))
crop_models = {
    'cotton': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Cotton_price.pkl", 'rb')),
    'coconut': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Coconut_price.pkl", 'rb')),
    'gram': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Gram_price.pkl", 'rb')),
    'jute': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Jute_price.pkl", 'rb')),
    'maize': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Maize_price.pkl", 'rb')),
    'moong': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\Moong_price.pkl", 'rb')),
    'wheat': pickle.load(open(r"C:\Users\Vaibhav N\Desktop\Python Project\HarvestIQ\models\wheat_price.pkl", 'rb')),
}



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
    app.run(debug=True, port=5000)
