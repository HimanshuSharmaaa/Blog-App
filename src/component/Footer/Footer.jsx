import React from 'react'
import "./Footer.css";
import {Logo} from '../index'

const Footer = () => {
  return (
    <>
      <div className="footer-body">
        <div className="footer-container">
          <div className="footer-info">
            <Logo width='80px'/>
            <h2 className="footer-logo-head">StarBucks</h2>
            <p className="footer-logo-para">Wanna Drink Something Great</p>
          </div>
          <div className="footer-info">
            <div className="footer-sub-info">
              <h3 className="footer-list-heading">Download</h3>
              <ul className="footer-ul-list">
                <li>Windows app</li>
                <li>Mac app</li>
                <li>Linux app</li>
                <li>Desktop app</li>
              </ul>
              <h3 className="footer-list-heading">Services</h3>
              <ul className="footer-ul-list">
                <li>Design</li>
                <li>Development</li>
              </ul>
            </div>
          </div>
          <div className="footer-info">
            <div className="footer-sub-info">
              <h3 className="footer-list-heading">Products</h3>
              <ul className="footer-ul-list">
                <li>Web</li>
                <li>App</li>
                <li>Software</li>
                <li>Ecommerce</li>
              </ul>
              <h3 className="footer-list-heading">Company</h3>
              <ul className="footer-ul-list">
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="footer-info">
            <h3 className="footer-list-heading">Get in touch</h3>
            <h3 className="footer-list-heading">Subscribe</h3>
            <input
              type="text"
              placeholder="Enter Email Address"
              className="footer-input"
            />
            <button className="footer-input-btn">Subscribe</button>
          </div>
        </div>
        <hr style={{ width: "90%", color: "tomato" }} />
        <div className="footer-right-reserved">&#169; Starbucks , All Rights Reserved.</div>
      </div>
    </>
  );
};

export default Footer;