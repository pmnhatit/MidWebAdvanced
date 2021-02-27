import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {useHistory, Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const hanldeLogOut = (e)=>{
    e.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <EventNoteIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Sprint Retrospective
          </Typography>
          <Link to="/updateinfouser" style={{color: 'white'}}>
          <Button color="inherit" >Info</Button>
          </Link>
          <Button color="inherit" onClick={hanldeLogOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
