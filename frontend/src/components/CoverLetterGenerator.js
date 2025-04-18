import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaEnvelope, FaPowerOff } from 'react-icons/fa';
import { AuthContext } from '../App';

const CoverLetterGenerator = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  return (
    <HomePageContainer>
      <Sidebar>
        <SidebarOption to="/profile"><FaUser /> User Profile</SidebarOption>
        <SidebarOption to="/resume"><FaFileAlt /> Resume Generator</SidebarOption>
        <SidebarOption to="/coverletter"><FaEnvelope /> Cover Letter Generator</SidebarOption>
        <div style={{marginTop: 'auto'}}>
          <LogoutButton onClick={handleLogout}><FaPowerOff style={{marginRight: '5px'}}/>Logout</LogoutButton>
        </div>
      </Sidebar>
      <Content>
        <h1>Cover Letter Generator</h1>
        <p>This is the cover letter generator page.</p>
      </Content>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #DDDDDD;
  padding: 20px;
`;

const SidebarOption = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 5px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #e9ecef;
  }

  svg {
    margin-right: 8px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const LogoutButton = styled.button`
  display: block;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-top: auto;
`;

export default CoverLetterGenerator;
