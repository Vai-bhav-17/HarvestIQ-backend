import React, { useState } from "react";
import "./disease.scss";

function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handlePredictDisease = () => {
    // Perform disease prediction logic here
    if (selectedFile) {
      console.log("Predicting disease for file:", selectedFile);
      // You can upload the file to a server, process it, and predict the disease
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
        <button className="predict-button" onClick={handlePredictDisease}>
          Predict Disease
        </button>
      </header>
    </div>
  );
}

export default DiseaseDetection;
