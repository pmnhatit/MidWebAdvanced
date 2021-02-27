import React, { useState, useEffect } from 'react';
import {BoardItem} from "../BoardItem";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormAddBoard from "../FormAddBoard";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function(){
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [boards, setBoards] = useState([]);
  //id user de lay nhung bang cua user do
  const user = JSON.parse(localStorage.getItem('user')); 
  const user_id=user.id;
  const token = JSON.parse(localStorage.getItem('token'));

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://api-mid.herokuapp.com/boards?user=${user_id}`,{
      headers: {
        Authorization: 'Bearer ' + `${token}`,
         'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          
            setIsLoaded(true);
            setBoards(result);
          
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<>
      <Container className={classes.cardGrid} maxWidth="md">
         <FormAddBoard boards={boards} setBoards={setBoards}></FormAddBoard>
         </Container>
      {boards.map((board) => (
      <BoardItem key={board._id} id={board._id} name={board.name} setBoards={setBoards}/>
    ))}
    </>);
  }
    
}