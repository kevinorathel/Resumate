import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PillButton from './PillButton';
import { saveAs } from 'file-saver';
import Loader from './Loader';
const URL = process.env.REACT_APP_API_BASE_URL;



const ResumeGenerator = () => {
  const navigate = useNavigate();
  const [isWEModalOpen, setIsWEModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  
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

  const openWEModal = () => {
    setIsWEModalOpen(true);
  };

  const closeWEModal = () => {
    setIsWEModalOpen(false);
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
              {resumeData && resumeData.summary &&(
              <div className='content-div'>
                <h3 className='content'>{resumeData.summary}</h3>
              </div>
                
              )}

              <hr style={{ borderTop: '2px solid #ccc', margin: '20px 0' }} />

              <div>
                <h2 className='comic-neue-bold-800 content-header'>Work Experience: 
                  <InteractionButton onClick={openWEModal}><i class="fa-solid fa-plus"></i></InteractionButton>
                </h2>
              </div>
              {resumeData && resumeData.experiences && (
                <div>
                  {resumeData.experiences.map(exp => (
                    <div className='content-div content' key={exp.id}>
                      
                      <h3  className='comic-neue'>{exp.company}<InteractionButton><i class="fa-solid fa-pen"></i></InteractionButton><br></br></h3>
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
              <h2  className='comic-neue-bold-800 content-header'>Education: <InteractionButton><i class="fa-solid fa-plus"></i></InteractionButton></h2>
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
              <h2 label className='comic-neue-bold-800 content-header'>Projects: <InteractionButton><i class="fa-solid fa-plus"></i></InteractionButton></h2>
              {resumeData && resumeData.projects && (
                <div className='content-div content'>
                  {resumeData.projects.map(proj => (
                    <div className='content-div' key={proj.id}>
                      <h3 label className='comic-neue'>{proj.projectName}<InteractionButton><i class="fa-solid fa-pen"></i></InteractionButton><br></br></h3>
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
      {isWEModalOpen && (
        <Modal>
          <ModalContent>

            
              <div>
                <StyledH1>Work Experience <InteractionButton onClick={closeWEModal}><i class="fa-solid fa-xmark"></i></InteractionButton></StyledH1>
              </div>
              
              
              <div className='scrollable'>

                <label htmlFor='employerName' className='field-name'>Employer name</label>

                <StyledWrapperPillTextInput type="text" >             
                  <input type="text" placeholder="Where you worked" className="input" id='employerName'/>
                </StyledWrapperPillTextInput><br></br>

                <label htmlFor='jobTitle' className='field-name'>Job Title</label>

                <StyledWrapperPillTextInput type="text" >             
                  <input type="text" placeholder="What was your role" className="input" id='jobTitle'/>
                </StyledWrapperPillTextInput><br></br>

                <label htmlFor='startDate' className='field-name'>Start Date</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                <select
                  className={`selection-box ${!startMonth ? 'placeholder' : ''}`}
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                >
                  <option value="" disabled hidden>Month</option>
                  {months.map((m, idx) => (
                    <option key={idx} value={idx + 1}>{m}</option>
                  ))}
                </select>

                <select
                  className={`selection-box ${!startYear ? 'placeholder' : ''}`}
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                >
                    <option value="" disabled hidden >Year</option>
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <br></br>

                <label htmlFor='endDate' className='field-name'>End Date</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <select
                    className={`selection-box ${!endMonth ? 'placeholder' : ''}`}
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                  >
                    <option value="" disabled hidden>Month</option>
                    {months.map((m, idx) => (
                      <option key={idx} value={idx + 1}>{m}</option>
                    ))}
                  </select>

                  <select
                  className={`selection-box ${!endYear ? 'placeholder' : ''}`}
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  >
                    <option value="" disabled hidden>Year</option>
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <br></br>

                <label htmlFor='description' className='field-name'>Description</label>

                <StyledResumePillTextArea>
                  <textarea placeholder="Tell us about what you did at work, hit optimize and see the magic" 
                  className="input" id='description'/>
                </StyledResumePillTextArea><br></br>
                <OptimizeButton>
                  <button className="button">
                    <div><span>Optimize</span></div>
                  </button>
                  </OptimizeButton>


              </div>           
            
              <DivButtons>
                <EnhanceButton onClick={closeWEModal}><button>Cancel</button></EnhanceButton>
                <EnhanceButton><button style={{ backgroundColor: '#393E46', color: '#ffffff' }}>Save</button></EnhanceButton>
              </DivButtons>
              
          </ModalContent>
        </Modal>
      )}
    </HomePageContainer>
  );
};

const DivButtons = styled.div`
  display: flex;
  justify-content: right;
`;

const StyledH1 = styled.h1`
  font-weight: 700;
  margin-left: 15px;
`;

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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`

  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 35%;
  height: 60%;
  position: relative;
  text-align: left;

    button{
      margin-top: 10px;
    }

    .field-name{
      font-weight: 600 ;
      opacity: 0.7;
    }

    .scrollable{
      padding: 20px;
      overflow: auto;
      max-height: calc(100% - 200px);
    }

    .selection-box{
      width: 50%;
      border-radius: 10px;
      outline: 2px solid #FEBF00;
      border: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #e2e2e2;
      outline-offset: 3px;
      padding: 10px 1rem;
      transition: 0.25s;
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    
    .selection-box:focus {
      outline-offset: 5px;
      background-color: #fff
    }

    .selection-box.placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

  
  }
`;

const OptimizeButton = styled.div`
  .button {
    --stone-50: #fafaf9;
    --stone-800: #292524;
    --yellow-400: #facc15;

    font-size: 1rem;
    cursor: pointer;
    position: relative;
    font-family: "Rubik", sans-serif;
    font-weight: bold;
    line-height: 1;
    padding: 1px;
    transform: translate(-4px, -4px);
    outline: 2px solid transparent;
    outline-offset: 5px;
    border-radius: 9999px;
    background-color: var(--stone-800);
    color: var(--stone-800);
    transition:
      transform 150ms ease,
      box-shadow 150ms ease;
    text-align: center;
    box-shadow:
      0.5px 0.5px 0 0 var(--stone-800),
      1px 1px 0 0 var(--stone-800),
      1.5px 1.5px 0 0 var(--stone-800),
      2px 2px 0 0 var(--stone-800),
      2.5px 2.5px 0 0 var(--stone-800),
      3px 3px 0 0 var(--stone-800),
      0 0 0 2px var(--stone-50),
      0.5px 0.5px 0 2px var(--stone-50),
      1px 1px 0 2px var(--stone-50),
      1.5px 1.5px 0 2px var(--stone-50),
      2px 2px 0 2px var(--stone-50),
      2.5px 2.5px 0 2px var(--stone-50),
      3px 3px 0 2px var(--stone-50),
      3.5px 3.5px 0 2px var(--stone-50),
      4px 4px 0 2px var(--stone-50);

    &:hover {
      transform: translate(0, 0);
      box-shadow: 0 0 0 2px var(--stone-50);
    }

    &:active,
    &:focus-visible {
      outline-color: var(--yellow-400);
    }

    &:focus-visible {
      outline-style: dashed;
    }

    & > div {
      position: relative;
      pointer-events: none;
      background-color: var(--yellow-400);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 9999px;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 9999px;
        opacity: 0.5;
        background-image: radial-gradient(
            rgb(255 255 255 / 80%) 20%,
            transparent 20%
          ),
          radial-gradient(rgb(255 255 255 / 100%) 20%, transparent 20%);
        background-position:
          0 0,
          4px 4px;
        background-size: 8px 8px;
        mix-blend-mode: hard-light;
        animation: dots 0.5s infinite linear;
      }

      & > span {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.25rem;
        gap: 0.25rem;
        filter: drop-shadow(0 -1px 0 rgba(255, 255, 255, 0.25));

        &:active {
          transform: translateY(2px);
        }
      }
    }
  }

  @keyframes dots {
    0% {
      background-position:
        0 0,
        4px 4px;
    }
    100% {
      background-position:
        8px 0,
        12px 4px;
    }
  }
`;

const EnhanceButton = styled.div`
align-items: right;
margin-left: 10px;

button {
  background-color: white;
  color: black;
  border-radius: 10em;
  font-size: 17px;
  font-weight: 600;
  padding: 1em 2em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid black;
  box-shadow: 0 0 0 0 black;
}

button:hover {
  transform: translateY(-4px) translateX(-2px);
  box-shadow: 2px 5px 0 0 black;
};

button:active {
  transform: translateY(2px) translateX(1px);
  box-shadow: 0 0 0 0 black;
};`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledResumePillTextArea = styled.div`
  .input {
    border-radius: 10px;
    outline: 2px solid #FEBF00;
    border: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #e2e2e2;
    outline-offset: 3px;
    padding: 10px 1rem;
    transition: 0.25s;
    width: 95%;
    height: 200px;
    font-size: 16px;
  }
  margin-top: 30px;

  .input:focus {
    outline-offset: 5px;
    background-color: #fff
  }
`;

const StyledWrapperPillTextInput = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  .input {
  border-radius: 10px;
  outline: 2px solid #FEBF00;
  border: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #e2e2e2;
  outline-offset: 3px;
  padding: 10px 1rem;
  transition: 0.25s;
  width: 95%;
  height: 50px;
  font-size: 16px;
  }
 
  .input:focus {
  outline-offset: 5px;
  background-color: #fff
  }`;

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
