import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Background from './Background';
import Login from './components/Login';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import ResumeGenerator from './components/ResumeGenerator';
import CoverLetterGenerator from './components/CoverLetterGenerator';
import LandingPage from './components/LandingPage';

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = (success, userId) => {
    if (success) {
      setIsAuthenticated(true);
      setUserId(userId);
      setUsername(userId);
    } else {
      setIsAuthenticated(false);
      setUserId(null);
      setUsername('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, username, setUsername }}>
      <div className="App">
        <Background />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
            path="/home"
            element={
              isAuthenticated ? (
                <CoverLetterGenerator username={username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <CoverLetterGenerator username={username} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <UserProfile /> : <Navigate to="/" />
            }
          />
          <Route
            path="/resume"
            element={
              isAuthenticated ? <ResumeGenerator /> : <Navigate to="/" />
            }
          />
          <Route
            path="/coverletter"
            element={
              isAuthenticated ? (
                <CoverLetterGenerator />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
