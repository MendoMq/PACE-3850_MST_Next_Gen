import { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRoutes } from "react-router-dom";

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
function RegisterPage() {
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
            defaultValue=""
            style={{ margin: 10 }}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            style={{ margin: 10 }}
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
