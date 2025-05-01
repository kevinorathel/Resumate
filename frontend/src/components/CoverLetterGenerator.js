import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import PillButton from './PillButton';
import PillTextArea from './PillText';
import PillTextInput from './PillTextInput';
import Loader from './Loader';
import { saveAs } from 'file-saver';
const URL = process.env.REACT_APP_API_BASE_URL;

const CoverLetterGenerator = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [jobDescription, setJobDescription] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = useState("📝 Writing your cover letter...");
  const messages = [
    "📝 Writing your cover letter...",
    "✍️ Crafting the perfect introduction...",
    "✨ Summoning the perfect words...",
    "🤓 Polishing every word to make you shine...",
    "🎉 Hold tight — your awesome cover letter is almost ready!"
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

const GenerateButton = styled(PillButton)`
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

return (
  <HomePageContainer>
    <Header>Resumate</Header>
      <ResumeCard>
        {isLoading ? (
          <>
            <Loader className="center-loader" />
            <h2>{loadingMessage}</h2>
          </>
        ) : (
          <p label className='comic-neue-bold'>Cover Letter Generator</p>
        )}
        {!isLoading ? (
          <>
            <PillTextInput placeholder="Enter the company name here..." name="companyName" onChange={(e) => setCompanyName(e.target.value)} />
            <PillTextArea placeholder="Enter the job description here..." name="jobDescription" onChange={(e) => setJobDescription(e.target.value)} style={{ marginBottom: '30px' }} />
            <GenerateButton text="Generate Cover Letter" onClick={handleGenerateCoverLetter} disabled={isLoading} />
          </>
        ) : null}
    </ResumeCard>
    <Footer>Copyright</Footer>
  </HomePageContainer>
);
};

const HomePageContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #e0e0e0;
`;

const Header = styled.div`
background-color: #FFB22C;
color: black;
text-align: left;
padding: 15px;
font-size: 2.625em;
font-family: 'Knewave', sans-serif;
`;

const Footer = styled.div`
background-color: #333;
color: white;
text-align: center;
padding: 50px;
`;

const ResumeCard = styled.div`
background-color: white;
border-radius: 37px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
padding: 30px;
margin: 50px auto;
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
position: relative;
min-height: 700px;

p{
    font-size: 3rem;
    font-weight: bold;
  }

.center-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.comic-neue-regular {
  font-family: "Comic Neue", cursive;
  font-weight: 400;
  font-style: normal;
}

.comic-neue-bold {
  font-family: "Comic Neue", cursive;
  font-weight: 700;
  font-style: normal;
}
`;

export default CoverLetterGenerator;
