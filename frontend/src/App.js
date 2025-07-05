import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WalletReportForm from './WalletReportForm';
import WalletStatus from './WalletStatus';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/report">Report Wallet</Link>
          <Link to="/check">Check Wallet</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<WalletReportForm />} />
          <Route path="/check" element={<WalletStatus />} />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
