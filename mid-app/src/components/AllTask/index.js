import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from "../Header";
import WentWell from "../WentWell";
import ToImprove from "../ToImprove";
import Action from "../Action";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useParams} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(3, 1, 2),
  },
  grid:{
    display: 'flex',
    justifyContent: 'space-between',
    // margin: 0.2,
  },
  button:{
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 2,
    marginRight: 1,
    marginBottom:1
  },
}));

export default function InteractiveList(props) {
    const {id} = useParams();
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [copy, setCopy] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  


  const url = window.location.href;
  console.log("url: "+url);
  return (<>
  <Header/>
    <div >
      
      <Grid 
      className={classes.button}
      >
        <CopyToClipboard text={url}
          onCopy={() => setCopy(true)}>
          <Button variant="contained" color="primary" onClick={handleClick}>
          Share
        </Button>
        </CopyToClipboard>
        
      </Grid>
      
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={4} md={4}>
          <Typography variant="h6" className={classes.title}>
            Went Well
          </Typography>
          
          <WentWell id={id}></WentWell>
        </Grid>
        <Grid item xs={4} md={4}>
          <Typography variant="h6" className={classes.title}>
            To Improve
          </Typography>
          
          <ToImprove id={id}/>
        </Grid>
        <Grid item xs={4} md={4}>
          <Typography variant="h6" className={classes.title}>
            Action Items
          </Typography>
         
          <Action id={id}/>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'left'}}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Copied!"
        key={1}
      />
    </div>
    
    </>
  );
}