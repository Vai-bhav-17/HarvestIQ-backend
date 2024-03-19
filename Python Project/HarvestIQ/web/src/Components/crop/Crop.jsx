import React, { useState } from "react";
import "./crop.scss";
import axios from "axios"; // Import axios for making HTTP requests

function CropRecommendation() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPH] = useState("");
  const [rainfall, setRainfall] = useState("");

  const [recommendedCrop, setRecommendedCrop] = useState("");

  const handlePredictCrop = () => {
    axios
      .get("/predict-crop", {
        params: {
          nitrogen,
          phosphorus,
          potassium,
          temperature,
          humidity,
          ph,
          rainfall,
        },
      })
      .then((response) => {
        const { crop } = response.data;
        setRecommendedCrop(crop);
      })
      .catch((error) => {
        console.error("Error predicting crop:", error);
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
            onChange={(e) => setNitrogen(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phosphorus (P)"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
          />
          <input
            type="number"
            placeholder="Potassium (K)"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
          />
          <input
            type="number"
            placeholder="Temperature (C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <input
            type="number"
            placeholder="Humidity"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
          <input
            type="number"
            placeholder="pH"
            value={ph}
            onChange={(e) => setPH(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rainfall (mm)"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
          />
        </div>
        <button className="predict-button" onClick={handlePredictCrop}>
          Predict Crop
        </button>
        {recommendedCrop && <p>Recommended Crop: {recommendedCrop}</p>}
      </header>
    </div>
  );
}

export default CropRecommendation;
