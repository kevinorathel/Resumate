import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { FaUser, FaFileAlt, FaEnvelope, FaPowerOff } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
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
        <SidebarContent>
          <div>
            <SidebarOption to="/profile"><FaUser /> My Profile</SidebarOption>
            <SidebarOption to="/resume"><FaFileAlt /> Resume Builder</SidebarOption>
            <SidebarOption to="/coverletter"><FaEnvelope /> Cover Letter Builder</SidebarOption>
          </div>
          <LogoutButton onClick={handleLogout}><FaPowerOff style={{ marginRight: '5px' }} />Logout</LogoutButton>
        </SidebarContent>
      </Sidebar>
      <Content>
        {/* Dashboard content */}
      </Content>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #DDDDDD;
  padding: 20px;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  flex: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

export default Dashboard;
