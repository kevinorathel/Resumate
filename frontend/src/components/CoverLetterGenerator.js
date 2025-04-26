import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import PillButton from './PillButton';
import PillTextArea from './PillText';
import PillTextInput from './PillTextInput';
import Loader from './Loader';
import { FaUser, FaFileAlt, FaEnvelope, FaPowerOff } from 'react-icons/fa';
import { saveAs } from 'file-saver';
const URL = process.env.REACT_APP_API_BASE_URL;

const CoverLetterGenerator = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [jobDescription, setJobDescription] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Writing your cover letter...");
  const messages = [
    "📝 Writing your cover letter...",
    "✍️ Crafting the perfect introduction...",
    "✨ Summoning the perfect words...",
    "🤓 Polishing every word to make you shine...",
    "🎉 Hold tight — your awesome is almost ready!"
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % messages.length;
        setLoadingMessage(messages[newIndex]);
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [messages]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  const handleGenerateCoverLetter = (e) => {
    e.preventDefault();
    if (!companyName || !jobDescription) {
      alert('Please fill in both the company name and job description.');
      return;
    }

    setIsLoading(true);
    setCompanyName('');
    setJobDescription('');

    fetch(`${URL}/user/generateCoverLetter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        companyName: companyName,
        jobDescription: jobDescription,
      }),
    })
      .then(response => {

        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'coverletter.pdf'; 

        if (contentDisposition && contentDisposition.includes('filename=')) {
          const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (match && match[1]) {
            filename = match[1].replace(/['"]/g, '');
          }
        }

        return response.blob().then(blob => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        saveAs(blob, filename);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error generating cover letter:', error);
        setIsLoading(false);
      });
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
        <Card>
          {isLoading ? (
            <>
              <h2>{loadingMessage}</h2>
              <Loader />
            </>
          ) : (
            <h2>Cover Letter Generator</h2>
          )}
          {!isLoading ? (
            <>
              <PillTextInput placeholder="Enter the company name here..." name="companyName" onChange={(e) => setCompanyName(e.target.value)} />
              <PillTextArea placeholder="Enter the job description here..." name="jobDescription" onChange={(e) => setJobDescription(e.target.value)} style={{ marginBottom: '30px' }} />
              <GenerateButton text="Generate Cover Letter" onClick={handleGenerateCoverLetter} disabled={isLoading} />
            </>
          ) : null}
        </Card>
      </Content>
    </HomePageContainer>
  );
};

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 800px;
  height: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* Ensure the card has a minimum height */
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
  flex: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GenerateButton = styled(PillButton)`
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
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

export default CoverLetterGenerator;
