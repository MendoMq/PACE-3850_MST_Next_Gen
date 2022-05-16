import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer(props) {
    return (
        <div className='footerContainer'>
          <div class='footerLinks'>
            <div className='footerLinkWrapper'>
              <div class='footerLinkItems'>
                <h2>About Us</h2>
                <Link to='/'>The Team</Link>
                <Link to='/'>Careers</Link>
                <Link to='/'>Terms of Service</Link>
              </div>
              <div class='footerLinkItems'>
                <h2>Contact Us</h2>
                <Link to='/'>Contact</Link>
                <Link to='/'>Support</Link>
              </div>
              <div class='footerLinkItems'>
                <h2>Social Media</h2>
                <Link to='/'>Instagram</Link>
                <Link to='/'>Facebook</Link>
                <Link to='/'>Youtube</Link>
                <Link to='/'>Twitter</Link>
              </div>
            </div>
          </div>
          <section class='bottomLayer'>
            <div class='bottomLayerWrap'>
              <div>
                <Link to='/' className='socialLogo'>
                  MSTNG
                  <i class='fab fa-typo3' />
                </Link>
              </div>
              <small class='websiteRights'>MSTNG © 2022</small>
              <div class='socialIcons'>
                  <FacebookIcon fontSize='large'/>
                  <InstagramIcon fontSize='large'/>
                  <YouTubeIcon fontSize='large'/>
                  <TwitterIcon fontSize='large'/>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Footer;