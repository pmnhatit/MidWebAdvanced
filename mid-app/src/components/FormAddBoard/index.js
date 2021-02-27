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
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [nameBoard, setNameBoard] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const user_id=user.id;
  console.log(user_id);
  const token = JSON.parse(localStorage.getItem('token'));

  const addBoard = async () => {
    
    await fetch("https://api-mid.herokuapp.com/boards/add", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id:user_id,
        name: nameBoard
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
    props.setBoards([...props.boards,result.board]);
  })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) =>{
    if(e.target.id==="nameBoard"){
      setNameBoard(e.target.value);
    }
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    addBoard();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Board
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a board with Went well, To improve and Action Items.
          </DialogContentText>
          <form className={classes.form} onSubmit={handleAdd}>
          <TextField
            autoFocus
            margin="dense"
            id="nameBoard"
            label="Name Board"
            type="text"
            name="nameBoard"
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