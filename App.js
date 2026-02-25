import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Signup from "./Signup";
import Planner from "./Planner";
import About from "./About";   // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/about" element={<About />} />   {/* ✅ ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;