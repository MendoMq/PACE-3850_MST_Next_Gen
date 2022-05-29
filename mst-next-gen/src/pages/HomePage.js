import {useEffect, useState} from "react";
import "../App.css";
import bannerImage from "../Media/BannerPicture.jpg";
// https://unsplash.com/photos/dyJq7vzPeU8
import Button from '@mui/material/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
      danger: '#f44336',
    },
    palette: {
      primary: {
        main: '#e02b20',
      },
    
    },
  });

function HomePage(props){
    const {hasLogin} = props
    return (
        <div>
            <div id="banner">
                <img src={bannerImage} width={"100%"} id="bannerImage"/>
                <div id="bannerContent">  
                    <p id="bannerText">The <span id="colouredBannerText">Next Gen</span>eration of Theatre</p>
                    {
                        !hasLogin&&
                        <div id="bannerButtons">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" id="login" style={{maxWidth: '170px', maxHeight: '70px', minWidth: '170px', minHeight: '70px', fontSize: '26px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}}component={Link} to="/login">Login</Button>
                                <Button variant="contained" color="primary" id="register" style={{maxWidth: '170px', maxHeight: '70px', minWidth: '170px', minHeight: '70px', fontSize: '26px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}} component={Link} to="/register">Register</Button>
                            </ThemeProvider>
                        </div>
                    }
                    
                </div>
                <p id="photoAttr">Photo by Wesley Pribadi on Unsplash</p>
                
            </div>
            <div id="homePageMainContent">
                <div id="homePageText">
                    <p id="title">Welcome to the new online hub for Marian Street Theatre Next Gen!</p>
                    <p className="intro">
                    Marian Street Theatre Next Gen is a project launched by Support Marian Street Theatre in an effort to build the already existing community for the theatre. 
                    </p>
                    <p className="intro">
                    Marian Street Theatre will be a cultural centre for Ku-ring-gai – it will be primarily for theatre and also provide opportunities for cabaret, jazz, chamber music, sculpture, art and education in the arts.
                    </p>
                    <p className="intro">
                    It will be a <span id="theatrePlus">theatre plus</span>.
                    </p>
                </div>
                <div id="sideBar">
                    <div id="SMSTTile">
                        <p className="SMSTTileText">Want to find out more about Support Marian Street Theatre?</p>
                        <p className="SMSTTileText"><a href="https://supportmarianstreettheatre.com/" target="_blank" id="SMSTTileLink" rel="noreferrer">Click Here</a> to go to their website</p>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default HomePage