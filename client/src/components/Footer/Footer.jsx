import React from 'react'
import './footer.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';


const Footer = () => {
  return (
    <div className="footer">
      <div className='footerWrapper'>

        <div className='footerRight'>
          <div className="col">
              <h3 className="head-title">Information</h3>
              <div className="content">
                <ul>
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Privacy & Policy</li>
                  <li>Orders & Returns</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
            </div>

            <div className="col">
              <h3 className="head-title">Services</h3>
              <div className="content">
                <ul>
                  <li>My Account</li>
                  <li>View Cart</li>
                  <li>Wishlist</li>
                  <li>Track My Order</li>
                  <li>Help</li>
                </ul>
              </div>
            </div>

            <div className="col">
            <h3 className="head-title">About Us</h3>
            <div className="contents">
              <div className="contactSection">
                <PhoneIcon className="lasticon"/>
                <span className='tagp'>+880 17 31615141</span>
              </div>
              <div className="contactSection">
                <MailIcon className="lasticon"/>
                <span className='tagp'>iftekharuddin720.com</span>
              </div>
            </div>
        </div>
      </div>
      <div className="footerLeft">
          <img className="fimg" src="https://icon-library.com/images/booking-icon/booking-icon-19.jpg" alt=""/>
          <p className="ftitle">All rights reserved by our policy. Any kind of site disturbance maintanance will appear shortly.</p>
          <div className="ficons">
            <FacebookIcon className="footerIcon"/>
            <YouTubeIcon className="footerIcon"/>
            <TwitterIcon className="footerIcon"/>
            <LinkedInIcon className="footerIcon"/>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>
          Copyright &copy;2023 All rights reserved | Developed by
          <a> Iftekhar Uddin</a>
        </p>
      </div>
    </div>
  )
}

export default Footer
