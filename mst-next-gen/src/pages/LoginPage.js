import { useState } from "react";
import "../App.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
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
function LoginPage(props) {
    const rlocation = useLocation();
    const navigate = useNavigate()
    const [form, setForm] = useState({username:rlocation?.state?.username})
    const [errors, setErrors] = useState({ username: false, password: false })
    const handleChange = (key, value) => {
        setErrors({ ...errors, [key]: !value })
        setForm({ ...form, [key]: value })
    }

    const handleLogin = () => {
        if (form.username && form.password) {
            axios.post("/user/login", form)
                .then(res => {
                    localStorage.setItem('user',JSON.stringify(res))
                    props.login()
                    navigate("/")
                })
                .catch(err => {
                    props.TOAST(err.errMsg)
                })
        } else {
            setErrors({ username: !form.username, password: !form.password })
        }
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
                    <p style={{ textAlign: "center" }}>MSTNG Membership Login</p>
                    <TextField
                        required
                        value={form.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        error={errors.username}
                        id="outlined-required"
                        label="Username"
                        defaultValue=""
                        style={{ margin: 10 }}
                    />
                    <TextField
                        required
                        value={form.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        error={errors.password}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        style={{ margin: 10 }}
                    />
                </div>
                <div id="bannerButtons">

                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" id="login" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} onClick={()=>handleLogin()} >Login</Button>
                        <Button variant="contained" color="primary" id="register" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} component={Link} to="/register">Sign up</Button>
                    </ThemeProvider>
                </div>
            </Box>
        </div>
    );
}

export default LoginPage