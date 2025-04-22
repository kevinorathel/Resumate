import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className="landing-page">
        <h1>Welcome to <span class="knewave-regular">Resumate</span></h1>
        <p>Your AI sidekick for resume & cover letter magic.</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>

      <div className="features-section">
        <div className="features">
          <div className="feature">
            <i className="fas fa-file-alt"></i>
            <h3>Resume Builder</h3>
            <p>Create professional resumes with our easy-to-use builder.</p>
          </div>
          <div className="feature">
            <i className="fas fa-envelope"></i>
            <h3>Cover Letter Generator</h3>
            <p>Generate compelling cover letters tailored to your resume.</p>
          </div>
          <div className="feature">
            <i className="fas fa-user-edit"></i>
            <h3>Profile Management</h3>
            <p>Manage your professional profile and track your job applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
