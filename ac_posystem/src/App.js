import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainCategory from "./pages/MainCategory";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import ConfiromationPage from "./pages/ConfiromationPage";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MainCategory" element={<MainCategory />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/ConfiromationPage" element={<ConfiromationPage />} />
      </Routes>
      
    </Router>
  );
}
export default App;