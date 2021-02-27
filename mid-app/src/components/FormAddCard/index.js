import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const addCard = async () => {
    await fetch("https://api-mid.herokuapp.com/card/add", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:props.id,
        content: content,
        type: props.type
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
        props.setCards([...props.cards,result.card])
  })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) =>{
    if(e.target.id==="content"){
      setContent(e.target.value);
    }
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    addCard();
  };

  return (
    <div>
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new task
          </DialogContentText>
          <form className={classes.form} onSubmit={handleAdd}>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            type="text"
            name="content"
            fullWidth
            onChange={handleChange}
          />
          <Button onClick={handleClose} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" type="submit">
            Add
          </Button>
          </form>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}