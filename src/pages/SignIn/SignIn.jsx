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
import SignUp from '../SignUp/SignUp';
import UserService from '../../Service/UserService';

const userService =  new UserService();


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

export default function SignIn() {
  const email = / d/;
  const password = / ds /;

  const [inputField , setInputField] = React.useState({
    
    "email": "",
    "password": "",
    
})

const inputsHandler = (e) =>{
  setInputField( ...inputField, {[e.target.name]: e.target.value} )
}

  const handleSubmit = () => {
   
    const data = new FormData();
    data.set("email", data.get("email"))
    data.set("password", data.get("password"))
    
    userService.SignIn(data)
     
        .then((response) => response)
        
        .catch(err => { console.log(err) });
      
  }

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
          <Box component="form" action="http://localhost:3000/loginDetails" method="get" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <div ClassName="SignIn-btn-main-Container"  sx={{display:'flex' ,justifyContent:'space-around'   }}>
            <Button
              type="submit"
            //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'43%' }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
            //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,width:'42%', marginLeft:'10vh',backgroundColor:' #dc3545'}}
            >
              Sign in with Google
            </Button>
            </div>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href='#' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}