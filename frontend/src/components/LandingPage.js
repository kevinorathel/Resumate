import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import LandingButton from './LandingButton';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="landing-page">
        <h1>Welcome to <span class="knewave-regular">Resumate</span></h1>
        <p>Your AI sidekick for resume & cover letter magic.</p>
        <LandingButton />
      </div>

      <div className="features-section">
        <div className="features">
          <div className="feature">
            <i className="fas fa-file-alt"></i>
            <h3>Resume Builder</h3>
            <p>Create professional resumes with<br></br>our easy-to-use builder.</p>
          </div>
          <div className="feature">
            <i className="fas fa-envelope"></i>
            <h3>Cover Letter Generator</h3>
            <p>Generate compelling cover letters<br></br> tailored to your resume.</p>
          </div>
          <div className="feature">
            <i className="fas fa-user-edit"></i>
            <h3>Profile Management</h3>
            <p>Manage your professional profile<br></br> and track your job applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
