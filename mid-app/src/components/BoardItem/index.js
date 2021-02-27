import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from 'react-router-dom';
import FormEditBoard from '../FormEditBoard';

const useStyles = makeStyles((theme) => ({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    }
  }));

const BoardItem = function({id, name, setBoards}){
    const classes = useStyles();

    const token = JSON.parse(localStorage.getItem('token'));

    const deleteBoard = async () => {
      const user = JSON.parse(localStorage.getItem('user')); 
      const user_id=user.id;
      await fetch("https://api-mid.herokuapp.com/boards/delete", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:id,
          user_id: user_id
        }),
      })
        .then((res) => res.json())
       .then(result =>{ 
      console.log(result);
      setBoards(result.boards);
    })
    }

    const handleDelete = (e) =>{
      e.preventDefault();
      deleteBoard();
    }


    return <Grid item key={id} xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={`/boards/${id}`}>
        <Button size="small" color="primary">
          View
        </Button>
        </Link>
        <FormEditBoard name={name} id={id} setBoards={setBoards}/>
        <Button size="small" color="primary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  </Grid>
}

export {BoardItem};