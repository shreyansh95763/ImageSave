import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UseEffectExample from "./components/useEffectExample";
import AddCaptionPage from "./components/AddCaptionPage";
import FinalCardPage from "./components/FinalCardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UseEffectExample />} />
        <Route path="/add-caption/:id" element={<AddCaptionPage />} />
        <Route path="/final-card" element={<FinalCardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
