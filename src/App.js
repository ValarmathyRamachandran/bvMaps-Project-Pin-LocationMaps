import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';


function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
    </div>
  );
}

// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'MuWusjnHQIKNfPI1DjRnL4u5VAyAO5eg',
//   issuerBaseURL: 'https://dev-a3gujle6.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// const { requiresAuth } = require('express-openid-connect');

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });



export default App;


 
