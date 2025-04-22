import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <StyledWrapper>
      <button className="comic-button" onClick={handleClick}>Get Started!</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .comic-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: #FFB22C;
    border: 2px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px 0px #000;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .comic-button:hover {
    background-color: #fff;
    color: #FFB22C;
    border: 2px solid #FFB22C;
    box-shadow: 5px 5px 0px #FFB22C;
  }

  .comic-button:active {
    background-color: #e69d20;
    box-shadow: none;
    transform: translateY(4px);
  }`;

export default Button;
