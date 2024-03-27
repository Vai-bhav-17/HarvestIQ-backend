import React, { useState } from "react";
import axios from "axios";
import "./Price.scss";

function CropPricePrediction() {
  const [crop, setCrop] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState("");
  const [showPrediction, setShowPrediction] = useState(false);

  const handlePredictPrice = () => {
    const url = "http://localhost:5000/predictPrice";
    setIsLoading(true);
    const data = {
      crop: crop,
      month: month,
      year: year,
      rainfall: rainfall,
    };
    // Sending data to the Flask backend
    axios
      .post(url, data)
      .then((response) => {
        setPredictedPrice(response.data.PredictedPrice);
        setIsLoading(false);
        setShowPrediction(true);
      })
      .catch((error) => {
        console.error("Error predicting crop price: ", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="crop-price-prediction">
      <header className="crop-header">
        <h2
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
            fontSize: "2rem",
          }}
        >
          Crop Price Prediction
        </h2>
        <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
          Predict market prices for your crops to make informed selling
          decisions.
        </p>
        <div className="input-container">
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            <option value="">Select Crop</option>
            <option value="cotton">Cotton</option>
            <option value="coconut">Coconut</option>
            <option value="gram">Gram</option>
            <option value="jute">Jute</option>
            <option value="maize">Maize</option>
            <option value="moong">Moong</option>
            <option value="wheat">Wheat</option>
          </select>
          <input
            type="number"
            placeholder="Month (Eg: 2)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year (Eg: 2023)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rainfall (mm)"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
          />
        </div>
        <button
          className="predict-button"
          onClick={handlePredictPrice}
          disabled={isLoading}
        >
          {isLoading ? "Predicting..." : "Predict Crop Price"}
        </button>
        {showPrediction && (
          <h3
            className="prediction"
            style={{ color: "#294b29", padding: "1rem" }}
          >
            Predicted Crop Price in Rupees: {predictedPrice}
          </h3>
        )}
      </header>
    </div>
  );
}

export default CropPricePrediction;
