import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/sidebar/Sidebar";
import Crop from "./Components/crop/Crop";
import Fertilizer from "./Components/fertilizer/Fertilizer";
import Home from "./Components/home/Home";
import Disease from "./Components/disease/Disease";
import Price from "./Components/price/Price";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="crop" element={<Crop />} />
          <Route path="fertilizer" element={<Fertilizer />} />
          <Route path="disease" element={<Disease />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
