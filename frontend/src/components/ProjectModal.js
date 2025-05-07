import React, { useState , useContext, useEffect} from 'react';
import styled from 'styled-components';
import { AuthContext } from '../App';
import Loader from './Loader';


const ProjectModal = ({ isOpen, onClose, refreshData, proj }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { setIsAuthenticated, setUsername, userId } = useContext(AuthContext);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectMonth, setProjectMonth] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [projectName, setProjectName] = useState('');
  const URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
      if (proj) {
        if (proj.projectDate) {
          const date = new Date(proj.projectDate);
          setProjectMonth(date.getMonth() + 1);
          setProjectYear(date.getFullYear());
        } else {
          setProjectMonth('');
          setProjectYear('');
        }
  
        setProjectDescription(proj.projectDescription || '');
        setProjectName(proj.projectName || '');
      } else {
        setProjectDescription("");
        setProjectName("");
        setProjectMonth("");
        setProjectYear("");
      }
    }, [proj]);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
    
    const handleOptimize = () => {
    
        const currentDescription = document.getElementById("projectDescription").value;
    
        if (!currentDescription) {
            alert("Please enter the Description.");
            return;
        }
    
        setIsOptimizing(true);
        fetch(`${URL}/user/optimizeProjectDescription`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
              body: JSON.stringify({ description: projectDescription }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data);
                console.log("data.optimizedDescription: ", data.optimizedDescription);
                setProjectDescription(data.points);
                setIsOptimizing(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsOptimizing(false);
            });
    }
    
    const handleSave = () => {
        const projectName = document.getElementById("projectName").value.trim();
        const projectDescription = document.getElementById("projectDescription").value.trim();
      
        if (!projectName || !projectDescription || !projectMonth || !projectYear) {
          alert("Please fill in all fields before saving.");
          return;
        }
      
        try {
          const projectMonthIndex = new Date(`${projectMonth} 1, ${projectYear}`).getMonth();
          const projectDate = new Date(projectYear, projectMonthIndex, 1);
      
          if (isNaN(projectDate)) {
            alert("Invalid date.");
            return;
          }
      
          const body = {
            userId: userId,
            projects: [
              {
                id: proj && proj.id ? proj.id : null,
                projectName,
                projectDate,
                projectDescription,
              },
            ],
          };
      
          fetch(`${URL}/user/saveResumeData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then((response) => response.json())
            .then(() => {
              alert("Data has been saved!");
              onClose();
              refreshData();
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error saving data!");
            });
        } catch (error) {
          console.error("Date processing error:", error);
          alert("An unexpected error occurred.");
        }
      };
      
    
      if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <div>
          <StyledH1>Project <InteractionButton onClick={onClose}><i class="fa-solid fa-xmark"></i></InteractionButton></StyledH1>
        </div>
        <div className='scrollable'>
          <label htmlFor='projectName' className='field-name'>Project Name</label>
          <StyledWrapperPillTextInput type="text" >
            <input
              type="text"
              placeholder="What is your project called"
              className="input"
              id='projectName'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </StyledWrapperPillTextInput><br></br>

          <label htmlFor='startDate' className='field-name'>Date</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select
              className={`selection-box ${!projectMonth ? 'placeholder' : ''}`}
              value={projectMonth}
              onChange={(e) => setProjectMonth(e.target.value)}
            >
              <option value="" disabled hidden>Month</option>
              {months.map((m, idx) => (
                <option key={idx} value={idx + 1}>{m}</option>
              ))}
            </select>

            <select
              className={`selection-box ${!projectYear ? 'placeholder' : ''}`}
              value={projectYear}
              onChange={(e) => setProjectYear(e.target.value)}
            >
              <option value="" disabled hidden >Year</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <br></br>

          <label htmlFor='projectDescription' className='field-name'>Description</label>

          {isOptimizing ? (
            <div className='LoaderContainer'>
              <Loader />
            </div>
          ) : (
            <>
              <StyledResumePillTextArea>
                <textarea
                  placeholder="Tell us about your project. The more detailed the better!"
                  className="input"
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </StyledResumePillTextArea>
              <br />
              <OptimizeButton>
                <button
                  className="button"
                  onClick={handleOptimize}
                >
                  <div>
                    <span>Optimize</span>
                  </div>
                </button>
              </OptimizeButton>
            </>
          )}
        </div>
        <DivButtons>
          <EnhanceButton onClick={onClose}><button>Cancel</button></EnhanceButton>
          <EnhanceButton><button onClick={handleSave} style={{ backgroundColor: '#393E46', color: '#ffffff' } }>Save</button></EnhanceButton>
        </DivButtons>
      </ModalContent>
    </Modal>
)};

const DivButtons = styled.div`
display: flex;
justify-content: right;
`;

const StyledH1 = styled.h1`
font-weight: 700;
margin-left: 15px;
`;

const Modal = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
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
height: 70%;
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

.LoaderContainer{
  justify-items: center;
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
    
  }

  &:active,
  &:focus-visible {
    outline-color: var(--yellow-400);
    transform: translate(0, 0);
    box-shadow: 0 0 0 2px var(--stone-50);
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
margin-top: 10px;

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

export default ProjectModal;
