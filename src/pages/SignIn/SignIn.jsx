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
import { GoogleLogin } from 'react-google-login';
import { UserSignup,UserSignupPost } from "../../Service/UserService";
import { useNavigate } from "react-router-dom";


const responseGoogle = (response) => {
  console.log(response);
}

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
  )
};
const theme = createTheme();

const  SignIn = () => {

  const [signinInputField , setsigninInputField] = React.useState({
    
    "email": "",
    "password": "",
  });

  const [filterArray,setfilterArray] = React.useState([])

  let navigate = useNavigate();

const inputsHandler = (e) =>{

  const name=e.target.name;
  const value=e.target.value;
  setsigninInputField((lastValue)=>{
  return{
  ...lastValue,
  [name]:value
  }
});
}

const getsignup = () => {
  UserSignup().then((response) => {
  console.log(response)
  setfilterArray(response.data) })
  .catch((err) => { console.log(err) 
  })
}

  const handleSubmit = () => {
 
    // console.log(signinInputField.email,signinInputField.password)
  

    let findArray = filterArray.find((user)=>
    // console.log(signinInputField.email)
    ((signinInputField.email == user.email) && (signinInputField.password == user.password)))
    console.log("test",findArray)
    
    if(findArray){
      alert("success login")
      localStorage.setItem("token",findArray.email)
      navigate('/dashboard')
  } else {
      alert("invalid username and Password")
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
            Sign in
          </Typography>
        
          <Box component="form" action="" onSubmit={handleSubmit} method="get" Validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              placeholder="Please Enter your email" 
              autoComplete="email"
              autoFocus
              onChange={inputsHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Please Enter your password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={inputsHandler}
            />
          
            <div ClassName="SignIn-btn-main-Container"  sx={{display:'flex' ,justifyContent:'space-around'   }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'43%' }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'43%', marginLeft:'8vh',backgroundColor:' white',padding:0,borderRadius:0,borderShawdow:'none !important'}}
            >
                <GoogleLogin
        clientId="131606195347-ljfhgavk6ed088ljm9ag39hrpmjt8j4g.apps.googleusercontent.com"
        buttonText="Sign In 
        with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        sx={{ mt: 4, mb: 2 ,width:'42%', marginLeft:'0vh',backgroundColor:' transparent',border:'none !important' }}
  /> 
            </Button>
            </div>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}


export default SignIn;
