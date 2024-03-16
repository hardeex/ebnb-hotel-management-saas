import "./footer.css";

export default function Footer() {
  return (
    <div className="pg-footer">
      <footer className="footer">
        <svg
          className="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            className="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-2">
              <div className="footer-menu">
                <h2 className="footer-menu-name">Company</h2>
                <ul className="footer-menu-list">
                  <li>Contact</li>
                  <li>News</li>
                  <li>Careers</li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer-menu">
                <h2 className="footer-menu-name">Legal</h2>
                <ul className="footer-menu-list">
                  <li>Privacy Notice</li>
                  <li>Terms of Use</li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer-menu">
                <h2 className="footer-menu-name">Quick Links</h2>
                <ul className="footer-menu-list">
                  <li>Support Center</li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer-call-to-action">
                <h2 className="footer-call-to-action-title">Let's Chat</h2>
                <p className="footer-call-to-action-description">
                  Have a support question?
                </p>
                <span className="footer-call-to-action-button button">
                  Get in Touch
                </span>
              </div>
              <div className="footer-call-to-action">
                <h2 className="footer-call-to-action-title">You Call Us</h2>
                <p className="footer-call-to-action-link-wrapper">
                  <span className="footer-call-to-action-link">
                    09055556666
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <p className="footer-copyright-text">
              <a className="footer-copyright-link" href="#" target="_self">
                © 2023 Copyright EBNB
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
