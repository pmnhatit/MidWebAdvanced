import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



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


export default function EditBoard(props) {
  const classes = useStyles();
  const [boardName, setBoardName] = useState("");
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const user_id=user.id;
  const token = JSON.parse(localStorage.getItem('token'));

  const editBoard = async () => {
    await fetch("https://api-mid.herokuapp.com/boards/edit", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:props.id,
        name:boardName,
        user_id: user_id
      }),
    })
      .then((res) => res.json())
     .then(result =>{ 
    console.log(result.status);
    props.setBoards(result.boards);
  })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    editBoard();
  };

  const handleChange = (e) =>{
    if(e.target.id==="boardname"){
      setBoardName(e.target.value);
    }
  }

  return (
    <div>
        <Button size="small" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Board</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={handleSubmit}>
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="boardname"
            label="Board Name"
            name="boardname"
            defaultValue={props.name}
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