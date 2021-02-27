import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory, useParams} from 'react-router-dom';



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
}));


export default function EditBoard() {
  const classes = useStyles();

  //info user
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = JSON.parse(localStorage.getItem('token'));

  const [fullName, setFullName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const history = useHistory();

  

  const editUser = async () => {
    await fetch("https://api-mid.herokuapp.com/auth/edit", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:user.id,
        name:fullName,
        phone:phone
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
    //  setSuccess(true);
    console.log(result);
    if(result.message==="200OK"){
      console.log(result.infoUser);
      localStorage.setItem('user',JSON.stringify(result.infoUser));
      history.push('/boards');
    }else{
      alert(result.message);
    }
  })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    editUser();
  };

  const handleChange = (e) =>{
    if(e.target.id==="name"){
      setFullName(e.target.value);
    }else if(e.target.id==="phone"){
        setPhone(e.target.value);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Info User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            defaultValue={user.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            defaultValue={user.phone}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}