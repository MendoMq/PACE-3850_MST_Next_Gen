import React from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import MediaBlogPage from './Pages/MediaBlogPage'
import ForumPage from './Pages/ForumPage'
import logo from './logo.jpg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Footer from './Footer'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'

function App() {
  return (
    <div class="container">
      <p>MSTNG Proudly supported by <a href="https://supportmarianstreettheatre.com/">Support Marian St Theatre</a></p>
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

        <Route path="/" element={<HomePage />} />


      </Routes>

      <Footer />
    </div>
  );
}

export default App;
