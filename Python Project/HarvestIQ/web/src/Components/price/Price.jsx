import React, { useState } from "react";
import "./price.scss";

function CropPricePrediction() {
  const [crop, setCrop] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [rainfall, setRainfall] = useState("");

  const handlePredictPrice = () => {
    // Perform crop price prediction logic here
    console.log(
      "Predicting crop price for:",
      crop,
      "Month:",
      month,
      "Year:",
      year,
      "Rainfall:",
      rainfall
    );
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
        <button className="predict-button" onClick={handlePredictPrice}>
          Predict Crop Price
        </button>
      </header>
    </div>
  );
}

export default CropPricePrediction;
