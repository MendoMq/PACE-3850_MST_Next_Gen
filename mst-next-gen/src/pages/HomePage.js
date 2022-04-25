import React from "react";
import "../App.css";
import bannerImage from "../BannerPicture.jpg";
import Button from '@mui/material/Button';

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

function HomePage(){
    return (
        <div>
            <div id="banner">
                <img src={bannerImage} width={"100%"} id="bannerImage"/>
                <div id="bannerContent">  
                    <p id="bannerText">The <span id="colouredBannerText">Next Gen</span>eration of Theatre</p>
                    <div id="bannerButtons">
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" id="login" style={{maxWidth: '170px', maxHeight: '70px', minWidth: '170px', minHeight: '70px', fontSize: '26px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}}>Login</Button>
                            <Button variant="contained" color="primary" id="register" style={{maxWidth: '170px', maxHeight: '70px', minWidth: '170px', minHeight: '70px', fontSize: '26px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}}>Register</Button>
                        </ThemeProvider>
                    </div>
                </div>
                
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
                        <p className="SMSTTileText"><a href="https://supportmarianstreettheatre.com/" target="_blank" id="SMSTTileLink">Click Here</a> to go to their website</p>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default HomePage