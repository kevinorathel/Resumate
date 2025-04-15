import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

const Home = ({ username, onLogout }) => {
  return (
    <HomeContainer>
      <HomeContent>
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Welcome, {username || 'User'}!</h1>
        <p>You have successfully logged in to the application.</p>
        <p>This is your dashboard where you can access all features.</p>
        
        <Button onClick={onLogout}>Logout</Button>
      </HomeContent>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const HomeContent = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: center;
  border: 1px solid #e9ecef;
  
  h1 {
    margin-top: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .app-logo {
    height: 100px;
    pointer-events: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .app-logo {
      animation: app-logo-spin infinite 20s linear;
    }
  }
  
  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export default Home;
