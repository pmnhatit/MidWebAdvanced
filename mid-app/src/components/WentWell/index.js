import React, { useState, useEffect } from 'react';
import {WentWellItem} from "../WentWellItem";
import FormAddCard from "../FormAddCard";



export default function InteractiveList(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  console.log("id: "+props.id);

  useEffect(() => {
    fetch(`https://api-mid.herokuapp.com/card?id=${props.id}&type=1`)
      .then(res => res.json())
      .then(
        (result) => {
          
            setCards(result);
            setIsLoaded(true);
          console.log(cards);
          
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
    return (<div>
        <FormAddCard id={props.id} type={1} cards={cards} setCards={setCards}/>
      {cards.map((card) => (
      <WentWellItem key={card._id} id={card._id} type={card.type} content={card.content} id_board={props.id} setCards={setCards}/>
    ))}
    </div>);
  }
}