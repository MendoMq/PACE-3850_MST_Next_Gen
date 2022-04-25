import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import ReactDOM from 'react-dom'
//import { SocialIcon } from 'react-social-icons';

function Footer(props) {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className="footer-subscription-heading">
                    Subscribe to Marian Street Theatre to gain access to our weekly newsletter
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time
                </p>
                <div className='input areas'>
                    <form>
                        <input
                            type='email'
                            name='email'
                            placeholder='Your Email'
                            className='footer input'
                        />
                    </form>
                </div>
            </section>

            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                    <h2>About Us</h2>
                        <Link to ='/'>The Team</Link>
                        <Link to ='/'>Terms of Service</Link>
                    </div>
                    <div className="footer-link-items">
                    <h2>Social Media</h2>
                        <Link to ='/'>Instagram</Link>
                        <Link to ='/'>Facebook</Link>
                        <Link to ='/'>Youtube</Link>
                        <Link to ='/'>Twitter</Link>
                    </div>
                    <div className="footer-link-items">
                    <h2>Contact Us</h2>
                        <Link to ='/'>Contact</Link>
                        <Link to ='/'>Support</Link>
                    </div>
                </div>
            </div>
            
            
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/'className='social-logo'>
                            @mstnextgen <i className='fab fa-typo3' />
                        </Link>
                        </div>
                        <small className='website-rights'>MSTNG 2022</small>
                        <div className="social-icons">
                            <Link 
                                className='social-icon-link facebook'
                                to='/'
                                target='_blank'
                                aria-label='Facebook'
                                >
                                <i className='fab fa-facebook-f' />
                            </Link>
                            <Link 
                                className="social-icon-link instagram"
                                to='/'
                                target='_blank'
                                aria-label='Instagram'
                                >
                                <i className='fab fa-instagram' />
                            </Link>
                            <Link 
                                className="social-icon-link twitter"
                                to='/'
                                target='_blank'
                                aria-label='Twitter'
                                >
                                <i className='fab fa-twitter' />
                            </Link>
                            <Link 
                                className="social-icon-link youtube"
                                to='/'
                                target='_blank'
                                aria-label='Youtube'
                                >
                                <i className='fab fa-youtube' />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
    );
}

export default Footer;