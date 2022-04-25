import React from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MediaPage from './pages/MediaPage'
import ForumPage from './pages/ForumPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import "./App.css";

function App() {
  return (
    <div>
      <p>Test</p>
      <Link to="/">Home</Link>
      <Link to="/media">Media</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/about">About</Link>
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
