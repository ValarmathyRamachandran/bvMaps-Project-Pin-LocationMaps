import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import UserService from '../../Service/UserService';
import { useEffect, useState } from "react";
import { UserSignup,UserSignupPost } from "../../Service/UserService";

// const userService =  new UserService();

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        bvMaps
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

 const SignUp = () => {

    const [inputField , setInputField] = React.useState({
        "firstName": "",
        "lastName":"",
        "email": "",
        "password": "",
        
    })
    const [findArray,setfindArray] = useState([])

    const inputsHandler = (e) =>{
        setInputField( ...inputField, {[e.target.name]: e.target.value} )
    }

    const getsignup = () =>{
      UserSignup().then(function(response){
          setfindArray(response.data)
          console.log(response)
      }).catch((err)=>{
          console.log(err)
      })
    }

    const handleSubmit= ()=> {
      var findArray1 = findArray.find((user)=>((inputField.email == user.email)))
      if(findArray1) {
        alert("User email already exists")}
      else {
          alert("Please check your details and click ok to proceed")
      }
     }

      React.useEffect(()=>{
        getsignup()
    
      },[])

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" Validate  action="" method="post" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={inputsHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                   onChange={inputsHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={inputsHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={inputsHandler}
                />
              </Grid>
           
            </Grid>
            <div ClassName="SignUp-btn-main-Container"  sx={{display:'flex' ,justifyContent:'space-around'   }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'43%' }}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'42%', marginLeft:'10vh',backgroundColor:' #dc3545'}}
            >
              Sign up with Google
            </Button>
            </div>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href ="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
        }
      

export default SignUp;