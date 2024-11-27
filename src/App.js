import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./common/Layout";
import LocationSelect from "./pages/LocationSelect";
import TransportSelect from "./pages/TransportSelect";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<LocationSelect />} />
          <Route path="/transport" element={<TransportSelect />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
