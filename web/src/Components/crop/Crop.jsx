import React, { useState } from "react";
import axios from "axios";
import "./crop.scss";

const CropRecommendation = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPH] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictedCrop, setPredictedCrop] = useState("");
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case "Nitrogen":
        setNitrogen(value);
        break;
      case "Phosphorus":
        setPhosphorus(value);
        break;
      case "Potassium":
        setPotassium(value);
        break;
      case "Temperature":
        setTemperature(value);
        break;
      case "Humidity":
        setHumidity(value);
        break;
      case "PH":
        setPH(value);
        break;
      case "Rainfall":
        setRainfall(value);
        break;
      default:
        break;
    }
  };

  const handlePredictCrop = () => {
    const url = "http://localhost:5000/predictCrop";
    setIsLoading(true);
    const data = {
      Nitrogen: nitrogen,
      Phosphorus: phosphorus,
      Potassium: potassium,
      Temperature: temperature,
      Humidity: humidity,
      PH: ph,
      Rainfall: rainfall,
    };
    
    axios
      .post(url, data)
      .then((response) => {
        setPredictedCrop(response.data.PredictedCrop);
        setIsLoading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error("Error predicting crop: ", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="crop-recommendation">
      <header className="crop-header">
        <h2
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
            fontSize: "2rem",
          }}
        >
          Crop Recommendation
        </h2>
        <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
          Get personalized crop recommendations based on your soil's Nitrogen,
          Phosphorus, Potassium (N,P,K) Values.
        </p>
        <div className="input-container">
          <input
            type="number"
            placeholder="Nitrogen (N)"
            value={nitrogen}
            name="Nitrogen"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phosphorus (P)"
            value={phosphorus}
            name="Phosphorus"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Potassium (K)"
            value={potassium}
            name="Potassium"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Temperature (C)"
            value={temperature}
            name="Temperature"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Humidity"
            value={humidity}
            name="Humidity"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="pH"
            value={ph}
            name="PH"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Rainfall (mm)"
            value={rainfall}
            name="Rainfall"
            onChange={handleChange}
          />
        </div>
        <button
          className="predict-button"
          onClick={handlePredictCrop}
          disabled={isLoading}
        >
          {isLoading ? "Predicting..." : "Predict Crop"}
        </button>
        {showSpan && (
          <h3
            className="prediction"
            style={{ color: "#294b29", padding: "1rem" }}
          >
            Predicted Crop: {predictedCrop}
          </h3>
        )}
      </header>
    </div>
  );
};

export default CropRecommendation;
