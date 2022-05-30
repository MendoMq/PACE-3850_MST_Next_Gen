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
  Link,
  useNavigate
} from 'react-router-dom'
import Footer from './Footer'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ForumDetail from './Pages/ForumDetail'

import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { hasUserLogin } from './utils/cookie'
import axios from './utils/axios'
import eventBus from './utils/eventBus'
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
  const rNavigate = useNavigate()
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [autoHideDuration, setAutoHideDuration] = React.useState(3000)

  const TOAST = (message, type, delay) => {
    if (!message) return
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime(), type: type }]);
    setAutoHideDuration(delay || 3000)
  }
  const handleExited = () => {
    setMessageInfo(undefined);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  }
  const [hasLogin, setHasLogin] = React.useState(hasUserLogin())
  const handleLogOut = () => {
    axios.post('/user/logout').then(res => {
      localStorage.removeItem("user")
      setHasLogin(false)
      rNavigate("/login")
    })
  }

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);
  const handleShowToast = (params) => {
    console.log("handleShowToast", params)
    const { message, type } = params;
    TOAST(message, type)

  }
  React.useEffect(() => {
    eventBus.on("toast", handleShowToast)
  }, [])
  return (
    <div className="container">
      <div id="headerLinks">

        <p style={{ marginLeft: "10px" }}>MSTNG Proudly supported by <a href="https://supportmarianstreettheatre.com/" id="SMSTLink" target="_blank" rel="noreferrer">Support Marian St Theatre</a></p>
        <div>
          <ThemeProvider theme={theme}>
            {hasLogin && <>
              <Button variant="contained" color="primary" id="loginHeader" style={{ maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} onClick={handleLogOut}>Logout</Button>
            </>}
            {!hasLogin && <>
              <Button variant="contained" color="primary" id="loginHeader" style={{ maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} component={Link} to="/login">Login</Button>
              <Button variant="contained" color="primary" id="registerHeader" style={{ maxWidth: '80px', maxHeight: '30px', minWidth: '80px', minHeight: '30px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} component={Link} to="/register">Register</Button>
            </>}

          </ThemeProvider>
        </div>
      </div>

      <div id="Header">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/mediablog">Media and Blog</Link>
        <img src={logo} alt="LogoImage" height={200} width={250} />
        <Link className="link" to="/forum">Forum</Link>
        <Link className="link" to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage TOAST={TOAST} login={() => setHasLogin(true)} />} />
        <Route path="/register" element={<RegisterPage TOAST={TOAST} />} />

        <Route path="/about" element={<AboutPage hasLogin={hasLogin} />} />

        <Route path="/mediablog" element={<MediaBlogPage hasLogin={hasLogin} />} />

        <Route path="/forum" element={<ForumPage TOAST={TOAST} hasLogin={hasLogin} />} />
        <Route path="/forumDetail" element={<ForumDetail TOAST={TOAST} hasLogin={hasLogin} />} />

        <Route path="/" element={<HomePage TOAST={TOAST} hasLogin={hasLogin} />} />
      </Routes>

      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={messageInfo ? messageInfo.message : undefined}
        open={open}
        autoHideDuration={autoHideDuration}
        key={messageInfo ? messageInfo.key : undefined}
        TransitionProps={{ onExited: handleExited }}
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />

    </div>
  );
}

export default App;
