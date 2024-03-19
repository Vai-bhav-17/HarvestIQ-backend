import React, { useState } from "react";
import "./fertilizer.scss";

function CropRecommendation() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const handlePredictCrop = () => {
    // Perform fertilizer prediction logic here
    console.log(
      "Predicting fertilizer with N:",
      nitrogen,
      "P:",
      phosphorus,
      "K:",
      potassium
    );
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
          Fertilizer Recommendation
        </h2>
        <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
          Get personalized fertilizer recommendations based on your soil's
          Nitrogen, Phosphorus, Potassium (N,P,K) Values.
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
        </div>
        <button className="predict-button" onClick={handlePredictCrop}>
          Predict Fertilizer
        </button>
      </header>
    </div>
  );
}

export default CropRecommendation;
