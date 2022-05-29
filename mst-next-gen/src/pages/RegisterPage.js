import { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios'
const theme = createTheme({
  status: {
    danger: "#f44336",
  },
  palette: {
    primary: {
      main: "#e02b20",
    },
  },
});
function RegisterPage(props) {
  const navigate = useNavigate()
  const [form,setForm] = useState({})
  const [errors,setErrors] = useState({username:false,password:false})
  const handleChange = (key,value)=>{
    setErrors({...errors,[key]:!value})
    setForm({...form,[key]:value})
  }
  const handleRegister = ()=>{
    if(form.username&&form.password){
      axios.post("/user/register",form)
      .then(res=>{

        setForm({})
        navigate("/login",{state:{username:form.username}})
      })
      .catch(err=>{
        props.TOAST(err.errMsg)
      })
    }else{
      setErrors({username:!form.username,password:!form.password})
    }
  }
  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
        className="userFormBox"
      >
        <div className="userFormBox_form">
          <p style={{ textAlign: "center" }}>Register your MSTNG Membership</p>
          <TextField
            required
            id="outlined-required"
            label="Username"
            value={form.username}
            onChange={(e)=>handleChange('username',e.target.value)}
            error={errors.username}
            defaultValue=""
            style={{ margin: 10 }}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            value={form.password}
            onChange={(e)=>handleChange('password',e.target.value)}
            autoComplete="current-password"
            style={{ margin: 10 }}
            error={errors.password}
          />
        </div>
        <div id="bannerButtons">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              id="register"
              style={{
                maxWidth: "150px",
                maxHeight: "60px",
                minWidth: "120px",
                minHeight: "50px",
                fontSize: "16px",
                fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif",
              }}
              onClick={()=>handleRegister()}
            >
              Register
            </Button>
          </ThemeProvider>
        </div>
      </Box>
    </div>
  );
}

export default RegisterPage;
