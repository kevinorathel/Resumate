import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./test.css"; 

const test = () => {
  return (
    <div>
      <section id="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div>
              <img className="logo" src="images/logo.png" alt="logo" />
              <a className="navbar-brand" href="/" id="branding">
                YapApp
              </a>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/signup">Sign Up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/download">Download</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-6 initial-caption">
            <h1 className="heading">
              Join the conversation and connect with friends old and new, anytime, anywhere.
            </h1>
            <div className="download-button">
              <a className="btn btn-secondary btn-lg ind-download-btn" href="/signup">
                Get Started
              </a>
              <a className="btn btn-dark btn-lg ind-download-btn" href="/userId">
                Login
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <img src="images/texting.jpg" alt="texting-mockup" className="lady-texting" />
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container-fluid">
          <div className="row">
            <div className="feature-box col-lg-4 col-md-12 col-sm-12">
              <i className="fa-sharp fa-solid fa-circle-check icons"></i>
              <h3>Send a private message.</h3>
              <p>End-to-end encryption and privacy controls.</p>
            </div>
            <div className="feature-box col-lg-4 col-md-12 col-sm-12">
              <i className="fa-sharp fa-solid fa-circle-user icons"></i>
              <h3>Build community</h3>
              <p>Group chats are now simpler.</p>
            </div>
            <div className="feature-box col-lg-4 col-md-12 col-sm-12">
              <i className="fa-sharp fa-solid fa-heart icons"></i>
              <h3>React to messages.</h3>
              <p>Emoji reactions for both group and solo chats.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#45474B" }}>
        <section className="d-flex justify-content-between p-4" style={{ backgroundColor: "#2C3333" }}>
          <div className="me-5">
            <span>Get connected with us via social media:</span>
          </div>
          <div>
            <a href="#" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-google"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-white me-4"><i className="fab fa-github"></i></a>
          </div>
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">YapApp</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#395B64", height: "2px" }} />
                <p>Get going</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#395B64", height: "2px" }} />
                <p><a href="#!" className="text-white">MDBootstrap</a></p>
                <p><a href="#!" className="text-white">MDWordPress</a></p>
                <p><a href="#!" className="text-white">BrandFlow</a></p>
                <p><a href="#!" className="text-white">Bootstrap Angular</a></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#395B64", height: "2px" }} />
                <p><a href="#!" className="text-white">Your Account</a></p>
                <p><a href="#!" className="text-white">Become an Affiliate</a></p>
                <p><a href="#!" className="text-white">Shipping Rates</a></p>
                <p><a href="#!" className="text-white">Help</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#395B64", height: "2px" }} />
                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © Copyright 2024 YapApp
        </div>
      </footer>
    </div>
  );
};

export default test;
