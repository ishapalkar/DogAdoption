import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DogList from './components/dogs/DogList';
import DogForm from './components/dogs/DogForm';
import EditDog from './components/dogs/EditDog';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        // You could also fetch user data from the server using the token
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dogs" element={<DogList />} />
              <Route 
                path="/dogs/add" 
                element={isAuthenticated ? <DogForm /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/dogs/edit/:id" 
                element={isAuthenticated ? <EditDog /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;