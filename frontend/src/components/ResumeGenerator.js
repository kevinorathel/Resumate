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

  useEffect(() => {
    fetch(`${URL}/user/getResumeData?userId=1`)
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
          <Loader className="center-loader" />
        ) : (
          <>
            <h1 className='comic-neue-bold'>Resume Generator</h1>
            <StyledDiv>
              <h2 label className='comic-neue-bold'>Education: </h2>
              {resumeData && resumeData.education && (
                <div>
                  {resumeData.education.map(edu => (
                    <div key={edu.id}>
                      <label className='comic-neue-regular'>{edu.institution}, {edu.degree}</label>
                      <br></br>
                    </div>
                  ))}
                </div>
              )}
              <br></br>
              <h2 label className='comic-neue-bold'>Experience: </h2>
              {resumeData && resumeData.experiences && (
                <div>
                  {resumeData.experiences.map(exp => (
                    <div key={exp.id}>
                      <h3 label className='comic-neue-bold'>{exp.role} at {exp.company} <br></br></h3>
                      <span>{new Date(exp.startDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span> - 
                      <span>{new Date(exp.endDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
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
                    </div>
                  ))}
                </div>
              )}
              <br></br>
              <h2 label className='comic-neue-bold'>Projects: </h2>
              {resumeData && resumeData.projects && (
                <div>
                  {resumeData.projects.map(proj => (
                    <div key={proj.id}>
                      <h3 label className='comic-neue-bold'>{proj.projectName}<br></br></h3>
                      <span>{new Date(proj.projectDate).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
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
  justify-content: space-between;
  position: relative;

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

const StyledDiv = styled.div`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default ResumeGenerator;
