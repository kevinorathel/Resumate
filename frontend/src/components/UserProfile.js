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
  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/30889155/pexels-photo-30889155/free-photo-of-close-up-profile-of-a-deer-in-thai-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

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
        setPhoneNumber(data.phoneNumber);

        setLocation(data.location);

        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [userId]);

  return (
    <HomePageContainer>
      <Sidebar>
        <SidebarContent>
          <div>
            <SidebarOption to="/profile"><FaUser /> My Profile</SidebarOption>
            <SidebarOption to="/resume"><FaFileAlt /> Resume Generator</SidebarOption>
            <SidebarOption to="/coverletter"><FaEnvelope /> Cover Letter Creator</SidebarOption>
          </div>
          <LogoutButton onClick={handleLogout}><FaPowerOff style={{marginRight: '5px'}}/>Logout</LogoutButton>
        </SidebarContent>
      </Sidebar>
      <Content>
        <h1>My Profile</h1>
        <ProfileCard>
          <ProfileImage src={profileImage} alt="Profile" />
          <StyledH3>Name: {firstName} {lastName}</StyledH3>
          <StyledH3>Email: {email}</StyledH3>
          <StyledH3>Phone Number: {phoneNumber}</StyledH3>
          <StyledH3>Location: {location}</StyledH3>
        </ProfileCard>
      </Content>
    </HomePageContainer>
  );
};

const StyledH3 = styled.h3`
  margin-bottom: 8px;
  font-weight: 500;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

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
