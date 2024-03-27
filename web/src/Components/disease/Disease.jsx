import React, { useState } from "react";
import "./disease.scss";

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handlePredictDisease = async () => {
    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/predictDisease", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Predicted disease:", data.disease);
          setPredictedDisease(data.disease);
        } else {
          console.error("Failed to predict disease");
        }
      } catch (error) {
        console.error("Error predicting disease:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div className="disease-detection">
      <header className="disease-header">
        <h2
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
            fontSize: "2rem",
          }}
        >
          Disease Detection
        </h2>
        <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
          Detect diseases in your crops early to prevent losses and maximize
          yields.
        </p>
        <div className="input-container">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {selectedFile && (
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
        <button
          className="predict-button"
          onClick={handlePredictDisease}
          disabled={isLoading}
        >
          {isLoading ? "Predicting..." : "Predict Disease"}
        </button>
        {predictedDisease && <p>Predicted Disease: {predictedDisease}</p>}
      </header>
    </div>
  );
}

export default DiseaseDetection;
