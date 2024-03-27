import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
          }}
        >
          HarvestIQ
        </h1>
        <p
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
            fontWeight: "bolder",
          }}
        >
          One-stop solution for all farming needs!
        </p>
        <p
          style={{
            color: "#294B29",
            fontFamily: "Dm Sans, sans-serif",
          }}
        >
          Our goal is to assist farmers in every stage of production to enhance
          productivity and efficiency.
        </p>
        <div className="functions">
          <div className="function-box">
            <h2
              style={{
                color: "#294B29",
                fontFamily: "Dm Sans, sans-serif",
              }}
            >
              Crop Recommendation
            </h2>
            <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
              Get personalized crop recommendations based on your soils
              Nitrogen, Phosphorus, Potassium (N,P,K) Values.
            </p>
            <Link to="/crop" className="explore-button">
              Explore
            </Link>
          </div>
          <div className="function-box">
            <h2
              style={{
                color: "#294B29",
                fontFamily: "Dm Sans, sans-serif",
              }}
            >
              Disease Detection
            </h2>
            <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
              Detect diseases in your crops early to prevent losses and maximize
              yields.
            </p>
            <Link to="/disease" className="explore-button">
              Explore
            </Link>
          </div>
        </div>
        <div className="functions">
          <div className="function-box">
            <h2
              style={{
                color: "#294B29",
                fontFamily: "Dm Sans, sans-serif",
              }}
            >
              Fertilizer Recommendation
            </h2>
            <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
              Get recommendations on the optimal fertilizer type.
            </p>
            <Link to="/fertilizer" className="explore-button">
              Explore
            </Link>
          </div>
          <div className="function-box">
            <h2
              style={{
                color: "#294B29",
                fontFamily: "Dm Sans, sans-serif",
              }}
            >
              Price Prediction
            </h2>
            <p style={{ color: "#294B29", fontFamily: "Dm Sans, sans-serif" }}>
              Predict market prices for your crops to make informed selling
              decisions.
            </p>
            <Link to="/price" className="explore-button">
              Explore
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
