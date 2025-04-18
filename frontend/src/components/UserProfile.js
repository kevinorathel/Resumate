import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaEnvelope, FaPowerOff } from 'react-icons/fa';
import { AuthContext } from '../App';

const URL = process.env.REACT_APP_API_BASE_URL;

const UserProfile = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  useEffect(() => {
    fetch(`${URL}/user/userData?userId=${userId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhoneNumber(data.phone); 

        setLocation(data.location);

        setProfileImage(data.profileImage || 'https://via.placeholder.com/150');
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [userId]);

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
        <h1>User Profile</h1>
        <ProfileCard>
          <ProfileImage src={profileImage} alt="Profile" />
          <h3>Name: {firstName} {lastName}</h3>
          <h3>Email: {email}</h3>
          <h3>Phone Number: {phoneNumber}</h3>
          <h3>Location: {location}</h3>

        </ProfileCard>
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

const ProfileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  align-self: center;
`;

export default UserProfile;
