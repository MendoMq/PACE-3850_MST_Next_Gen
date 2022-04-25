import React from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MediaPage from './pages/MediaPage'
import ForumPage from './pages/ForumPage'
import logo from './logo.jpg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import "./App.css";

function App() {
  return (
    <div class="container">
      <p>MSTNG Proudly supported by <a href="https://supportmarianstreettheatre.com/">Support Marian St Theatre</a></p>
      <div id="Header">
        <Link class="link" to="/">Home</Link>
        <Link class="link" to="/media">Media</Link>
        <img src={logo} alt="LogoImage" height={200} width={250}/>
        <Link class="link" to="/forum">Forum</Link>
        <Link class="link" to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/about" element={<AboutPage/>}/>

        <Route path="/media" element={<MediaPage/>}/>

        <Route path="/forum" element={<ForumPage/>}/>

        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
