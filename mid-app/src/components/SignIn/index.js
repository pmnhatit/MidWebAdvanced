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
import GoogleLoginBtn from '../GoogleLoginBtn';
import FacebookLoginBtn from '../FacebookLoginBtn';
import {useHistory, Link} from 'react-router-dom';



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  item:{
    display: 'flex',
    justifyItems: 'center', 
    margin:5
  }
}));



export default function SignIn() {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isSignIn, setIsSignIn] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const signIn = async () => {
    
    await fetch("https://api-mid.herokuapp.com/auth/signin", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:userName,
        password:passWord
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
      setIsSignIn("Username or password invalid!");
    }
  })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    signIn();
  };

  const setError = (isSignIn===null) ? <></> : <div style={{color: 'red'}}>{isSignIn}</div>;

  const handleChange = (e) =>{
    if(e.target.id==="username"){
      setUserName(e.target.value);
    }else if (e.target.id==="password"){
      setPassWord(e.target.value);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} Validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign In
          </Button>
          <Grid container style={{justifyContent:'center'}}>
            <Grid item className={classes.item}>
            <GoogleLoginBtn setIsSignIn={setIsSignIn}/>
            </Grid>
            <Grid item className={classes.item}>
            <FacebookLoginBtn setIsSignIn={setIsSignIn}/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {setError}
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}