import './App.css';
import * as React from 'react';

// component
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import VolcanoSearchPage from "./pages/VolcanoSearchPage";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndividualVolcanoPage from './pages/IndividualVolcanoPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {/* the content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/volcanolist" element={<VolcanoSearchPage />} />
          <Route path='/individualvolcano/:id' element={<IndividualVolcanoPage />}/> 
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}