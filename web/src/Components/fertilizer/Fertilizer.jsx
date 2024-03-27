import React, { useState } from "react";
import axios from "axios";
import "./Fertilizer.scss";

function Fertilizer() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedFertilizer, setRecommendedFertilizer] = useState("");
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handlePredictFertilizer = () => {
    const url = "http://localhost:5000/predictFertilizer";
    setIsLoading(true);
    const data = {
      nitrogen: nitrogen,
      phosphorus: phosphorus,
      potassium: potassium,
    };
    // Sending data to the Flask backend
    axios
      .post(url, data)
      .then((response) => {
        setRecommendedFertilizer(response.data.RecommendedFertilizer);
        setIsLoading(false);
        setShowRecommendation(true);
      })
      .catch((error) => {
        console.error("Error predicting fertilizer: ", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="fertilizer-recommendation">
      <header className="fertilizer-header">
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
        <button
          className="predict-button"
          onClick={handlePredictFertilizer}
          disabled={isLoading}
        >
          {isLoading ? "Predicting..." : "Predict Fertilizer"}
        </button>
        {showRecommendation && (
          <h3
            className="prediction"
            style={{ color: "#294b29", padding: "1rem" }}
          >
            Recommended Fertilizer: {recommendedFertilizer}
          </h3>
        )}
      </header>
    </div>
  );
}

export default Fertilizer;
