import { useState } from "react";
import {PropTypes} from 'prop-types';
import "../App.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRoutes } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom'

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

async function loginUser(credentials){
    return fetch('http://localhost:3001/userlogin', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(credentials)
    })
    .then(data=>data.json())
}

function LoginPage({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
    }
        
    return (
        <div>
            <Box
                component="form"
                sx={{
                    display: 'flex', flexWrap: 'wrap', flexDirection: "column"
                }}
                noValidate
                autoComplete="off"
                className="userFormBox"
            >
                <div className="userFormBox_form">
                    <p style={{textAlign:"center"}}>MSTNG Membership Login</p>
                    <TextField
                        required
                        id="outlined-required"
                        label="UserName"
                        defaultValue=""
                        style={{ margin: 10 }}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        style={{ margin: 10 }}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div id="bannerButtons">

                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" id="login" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} onClick={handleSubmit} >Login</Button>
                        <Button variant="contained" color="primary" id="register" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} component={Link} to="/register">Sign up</Button>
                    </ThemeProvider>
                </div>
            </Box>
        </div>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage