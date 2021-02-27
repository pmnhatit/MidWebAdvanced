import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import FormEditCard from "../FormEditCard";


const ActionItem = function(props){

    const deleteCard = async () => {
      await fetch("https://api-mid.herokuapp.com/card/delete", {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_card:props.id,
          id_board: props.id_board,
          type: 3
        }),
      })
        .then((res) => res.json())
       .then(result =>{ 
      console.log(result);
      props.setCards(result.cards);
    })
    }

  const handleDelete = (e) =>{
    e.preventDefault();
    deleteCard();
  }

    return <ListItem style={{backgroundColor: '#d12885', margin:'5px'}}>
    <ListItemText
        primary={props.content}
    />
        <FormEditCard id_card={props.id} type={3} setCards={props.setCards} id_board={props.id_board} content={props.content}/>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    </ListItem>
}

export {ActionItem};