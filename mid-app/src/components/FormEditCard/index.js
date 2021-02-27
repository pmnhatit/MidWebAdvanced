import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");


  const editCard = async () => {
    await fetch("https://api-mid.herokuapp.com/card/edit", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_card:props.id_card,
        content: content,
        type: props.type,
        id_board: props.id_board
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
        props.setCards(result.cards)
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

  const handleEdit = (e) =>{
    e.preventDefault();
    editCard();
  };

  return (
    <div>
        <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <CreateOutlinedIcon />
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit task
          </DialogContentText>
          <form className={classes.form} onSubmit={handleEdit}>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            type="text"
            name="content"
            fullWidth
            defaultValue={props.content}
            onChange={handleChange}
          />
          <Button onClick={handleClose} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" type="submit">
            Edit
          </Button>
          </form>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}