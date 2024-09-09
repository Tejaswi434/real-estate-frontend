import React from "react";
import "./Styles/FooterStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const FooterPage = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footerCol">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Our Services</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Affiliate Program</a>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Get Help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Customer Service</a>
              </li>
              <li>
                <a href="#">Booking Appointments</a>
              </li>
              <li>
                <a href="#">siteMaps</a>
              </li>
              <li>
                <a href="#">Articles</a>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Our Partners</h4>
            <ul>
              <li>
                <a href="#">Naukri.com - Jobs in India</a>
              </li>
              <li>
                <a href="#">Jeevansathi.com - Matrimonials</a>
              </li>
              <li>
                <a href="#">Shiksha.com - Education Career Info</a>
              </li>
              <li>
                <a href="#">PaisaBazaar.com</a>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href="#">Toll Free - 1800 41 99099</a>
              </li>
              <li>
                <a href="#">9:30 AM to 6:30 PM (Mon-Sun)</a>
              </li>
              <li>
                <a href="#">Email - Miraclesoft@example.com</a>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>Follow Us</h4>
            <div className="socialLinks">
              <a href="" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
