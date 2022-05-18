import React from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import MediaBlogPage from './Pages/MediaBlogPage'
import ForumPage from './Pages/ForumPage'
import logo from './Media/logo.jpg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Footer from './Footer'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ForumDetail from './Pages/ForumDetail'

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

function App() {
  return (
    <div class="container">
      <div id="headerLinks">
        
        <p style={{marginLeft: "10px"}}>MSTNG Proudly supported by <a href="https://supportmarianstreettheatre.com/">Support Marian St Theatre</a></p>
        <div>
          <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" id="loginHeader" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}}component={Link} to="/login">Login</Button>
              <Button variant="contained" color="primary" id="registerHeader" style={{maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif"}} component={Link} to="/register">Register</Button>
          </ThemeProvider>
        </div>
      </div>
      
      <div id="Header">
        <Link class="link" to="/">Home</Link>
        <Link class="link" to="/mediablog">Media and Blog</Link>
        <img src={logo} alt="LogoImage" height={200} width={250} />
        <Link class="link" to="/forum">Forum</Link>
        <Link class="link" to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/mediablog" element={<MediaBlogPage />} />

        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forumDetail" element={<ForumDetail />} />

        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
