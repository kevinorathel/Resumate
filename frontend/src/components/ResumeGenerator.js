import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaFileAlt, FaEnvelope, FaPowerOff, FaBars } from 'react-icons/fa';
import PillButton from './PillButton';
import { saveAs } from 'file-saver';
import Loader from './Loader';
const URL = process.env.REACT_APP_API_BASE_URL;

const ResumeGenerator = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("📝 Writing your resume...");
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
                <span className='content-header'>Summary: </span>
              </div>
              {resumeData && resumeData.summary &&(
              <div className='content-div'>
                <h3 className='content'>{resumeData.summary}</h3>
              </div>
                
              )}

              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />

              <div>
                <h2 className='comic-neue-bold-800 content-header'>Work Experience: </h2>
              </div>
              {resumeData && resumeData.experiences && (
                <div>
                  {resumeData.experiences.map(exp => (
                    <div className='content-div content' key={exp.id}>
                      
                      <h3  className='comic-neue'>{exp.company}<br></br></h3>
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
              <h2  className='comic-neue-bold-800 content-header'>Education: </h2>
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
              <h2 label className='comic-neue-bold-800 content-header'>Projects: </h2>
              {resumeData && resumeData.projects && (
                <div className='content-div content'>
                  {resumeData.projects.map(proj => (
                    <div className='content-div' key={proj.id}>
                      <h3 label className='comic-neue'>{proj.projectName}<br></br></h3>
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

export default ResumeGenerator;
