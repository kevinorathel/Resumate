import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import {useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import PillButton from './PillButton';
import { saveAs } from 'file-saver';
import Loader from './Loader';
import ResumeModal from './WEModal';
import ProjectModal from './ProjectModal';
import styled from 'styled-components';

const URL = process.env.REACT_APP_API_BASE_URL;

const ResumeGenerator = () => {
  const navigate = useNavigate();
  const [isWEModalOpen, setIsWEModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedProj, setSelectedProj] = useState(null);

  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("📝 Writing your resume...");

  const refreshResumeData = () => {
    fetch(`${URL}/user/getResumeData?userId=${userId}`)
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const messages = [
    "📝 Writing your resume...",
    "✍️ Crafting the perfect summary...",
    "✨ Summoning the perfect words...",
    "🤓 Polishing every word to make you shine...",
    "🎉 Hold tight — your awesome resume is almost ready!"
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

  useEffect(() => {
    fetch(`${URL}/user/getResumeData?userId=${userId}`)
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [userId]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  const handleGenerateResume = () => {
    setIsLoading(true);
    fetch(`${URL}/user/generateResume?userId=${userId}`)
      .then(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'resume.pdf';

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
        console.error('Error generating resume:', error);
        setIsLoading(false);
      });
  };

  const openWEModal = (exp) => {
    setSelectedExp(exp);
    setIsWEModalOpen(true);
  };

  const closeWEModal = () => {
    setIsWEModalOpen(false);
    setSelectedExp(null);
  };

  const openProjModal = (proj) => {
    setSelectedProj(proj);
    setIsProjectModalOpen(true);
  };

  const closeProjModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProj(null);
  };

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
          <>
            <p className='comic-neue-bold'>Resume Generator</p>
            <StyledDiv>
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />

              <div>
                <span className='content-header'>Summary: <InteractionButton><i class="fa-solid fa-pen"></i></InteractionButton></span>
              </div>
              {resumeData && resumeData.summary && (
                <div className='content-div'>
                  <h3 className='content'>{resumeData.summary}</h3>
                </div>
              )}

              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />

              <div>
                <h2 className='comic-neue-bold-800 content-header'>Work Experience:
                  <InteractionButton onClick={() => openWEModal(null)}><i class="fa-solid fa-plus"></i></InteractionButton>
                </h2>
              </div>
              {resumeData && resumeData.experiences && (
                <div>
                  {resumeData.experiences.map(exp => (
                    <div className='content-div content' key={exp.id}>

                      <h3 className='comic-neue'>{exp.company}
                        <InteractionButton onClick={() => openWEModal(exp)}><i class="fa-solid fa-pen"></i></InteractionButton>
                        <br></br> 
                      </h3>
                      <h4>{exp.role}</h4>
                      <span className='year' >{new Date(exp.startDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })} - </span>
                      <span className='year' >{new Date(exp.endDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                      <br></br><br></br>
                      {exp.description
                        .split('• ')
                        .filter(point => point.trim() !== '')
                        .map((point, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <br />}
                            <label>• </label>{point}
                          </React.Fragment>
                        ))}
                      <br></br>
                    </div>
                  ))}
                </div>
              )}
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />
              <h2 className='comic-neue-bold-800 content-header'>Education: <InteractionButton><i class="fa-solid fa-plus"></i></InteractionButton></h2>
              {resumeData && resumeData.education && (
                <div>
                  {resumeData.education.map(edu => (
                    <div className='content-div content' key={edu.id}>
                      <h3>{edu.institution}</h3>
                      <h4>{edu.degree}</h4>
                      <span className='year' >{new Date(edu.year).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                      <br></br><br></br>
                    </div>
                  ))}
                </div>
              )}
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />
              <h2 label className='comic-neue-bold-800 content-header'>Projects: 
                <InteractionButton onClick={() => openProjModal(null)}><i class="fa-solid fa-plus"></i></InteractionButton>
              </h2>
              {resumeData && resumeData.projects && (
                <div className='content-div content'>
                  {resumeData.projects.map(proj => (
                    <div className='content-div' key={proj.id}>
                      <h3 label className='comic-neue'>{proj.projectName}
                        <InteractionButton onClick={() => openProjModal(proj)}><i class="fa-solid fa-pen"></i></InteractionButton><br></br></h3>
                      <span className='year'>{new Date(proj.projectDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                      <br></br><br></br>
                      {proj.projectDescription
                        .split('• ')
                        .filter(point => point.trim() !== '')
                        .map((point, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <br />}
                            <label>• </label>{point}
                          </React.Fragment>
                        ))}
                    </div>
                  ))}
                </div>
              )}
              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />
            </StyledDiv>
            <PillButton text="Generate Resume" onClick={handleGenerateResume} />
          </>
        )}
      </ResumeCard>
      <Footer>Copyright</Footer>
      <ResumeModal isOpen={isWEModalOpen} onClose={closeWEModal} refreshData={refreshResumeData} exp={selectedExp} />
      <ProjectModal isOpen={isProjectModalOpen} onClose={closeProjModal} refreshData={refreshResumeData} proj={selectedProj} />
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
  position: relative;  
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  min-height: 600px;

  p{
    font-size: 3rem;
    font-weight: bold;
  }
  
  .year{
    opacity: 0.7;
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

  .content-div{
    margin-left: 20px
  }

  .content-header{
    font-size: 1.75em;
    font-weight: bold;
  }

  .content {
    font-size: 1.15em;
    font-weight: normal;
  }

`;

const StyledDiv = styled.div`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InteractionButton = styled.button`
  color: black;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  margin-top: 2.5px;
  opacity: 0.5;

  i {
    font-size: 0.6em;
  }

  &:hover{
    background: #B7C1B4;
  }
`;

export default ResumeGenerator;
