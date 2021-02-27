import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory, Link} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [phone, setPhone] = useState(0);
  const [isSignUp, setIsSignUp] = useState(null);
  const history = useHistory();

  const signUp = async () => {
    await fetch("https://api-mid.herokuapp.com/auth/signup", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:userName,
        password:passWord,
        name: name,
        phone: phone
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
    console.log(result);
    if(result.message==="200OK"){
      localStorage.setItem('token',JSON.stringify(result.token));
      localStorage.setItem('user',JSON.stringify(result.infoUser));
      history.push('/boards');
    }else{
      setIsSignUp("Username already exits!");
    }
  })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    signUp();
  };

  const handleChange = (e) =>{
    console.log(name);
    console.log(userName);
    console.log(passWord);
    console.log(phone);
    if(e.target.id==="username"){
      setUserName(e.target.value);
    }else if (e.target.id==="password"){
      setPassWord(e.target.value);
    }else if (e.target.id==="name"){
      setName(e.target.value);
    }else if(e.target.id==="phone"){
      setPhone(e.target.value);
    }
  }

  const setError = (isSignUp===null) ? <></> : <div style={{color: 'red'}}>{isSignUp}</div>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} Validate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                type="Number"
                name="phone"
                autoComplete="phone"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {setError}
      </div>
      <Box mt={5}/>
    </Container>
  );
}