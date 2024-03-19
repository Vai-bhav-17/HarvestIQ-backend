from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load the ML model
model = joblib.load("C:/Users/Vaibhav N/Desktop/Python Project/HarvestIQ/web/src/models/model.pkl")

@app.route('/predict-crop', methods=['GET'])
def predict_crop():
    nitrogen = float(request.args.get('nitrogen'))
    phosphorus = float(request.args.get('phosphorus'))
    potassium = float(request.args.get('potassium'))
    temperature = float(request.args.get('temperature'))
    humidity = float(request.args.get('humidity'))
    ph = float(request.args.get('ph'))
    rainfall = float(request.args.get('rainfall'))
    values = [nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]
    
    if 0 < ph <= 14 and 0 <= temperature < 100 and humidity >= 0:
        arr = [values]
        predicted_crop = model.predict(arr)[0]
        return jsonify({'crop': predicted_crop})
    else:
        return "Sorry. Error in entered values in the form. Please check the values and fill it again"

if __name__ == '__main__':
    app.run(debug=True)
