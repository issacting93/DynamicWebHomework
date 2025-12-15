
import { useState , useEffect } from 'react'
import cx from 'classnames'
// using Css modules for styling
import styles from './UI.module.css'
import CardPattern from './assets/moroccan-flower-dark.png'
import Bilbo from './assets/bilbo-baggins.png'
import Cameron from './assets/cameron-poe.png'
import Nikki from './assets/nikki-cage.png'
import Pollux from './assets/pollux-troy.png'

// const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

// click the card to flip it, match two cards to match them
// shuffle cards at start of game
// track number of moves
// track time elapsed
// when all cards are matched, show a "You Win!" message with the time and moves taken

const cardImages = [{ src: Bilbo   }, { src: Cameron }, { src: Nikki  }, { src: Pollux  }
]



export default function Grid(props) {
    // What states to we need? Turns, a deck of cards - in state. 
    // We need choice 1 and choice 2 in state.

  const [cards, setCards] = useState([]) // array of card objects
  const [turns, setTurns] = useState(0) // number of turns taken
  const [choiceOne, setChoiceOne] = useState(null) // first card chosen 
  const [choiceTwo, setChoiceTwo] = useState(null) // second card chosen
  const [disabled, setDisabled] = useState(false) // disable clicking more than two cards at a time

  // handleChoice function to handle card selection
  const handleChoice = (card) => {
    // You can implement your logic here for handling card selection
    // For now, just log the selected card
    console.log('Card chosen:', card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

    // comapre choices
    // But not here.

    // if choiceOne is null, set it to the selected card

    // fire a function when eitehr choiceOne or choiceTwo updates
   // useEffect(() => { with a second argument of [choiceOne, choiceTwo]  );
  }
  
  const  shuffleCards = () => {
    // shuffle the cards here
    // User clicks the first card, it flips. We need to track that card as "flipped". 
    // they can compare the URL to see if the next card they click matches the first card 
    // spread all of our card images twice to make pairs
    const shuffleCards = [...cardImages, ...cardImages]
 
    // ",,," means copy and paste everything in this array 
    // this is different from adding in the array itself, which would make a nested array
    //add the sort function to randomize the array
    // when the number is negative, aka not true, we will leave the card where it is in the deck.
    // when the number is positive, aka true, we will swap the two cards
    .sort(() => Math.random() - 0.5) 
    .map((card) => ({ ...card, id: Math.round (Math.random()*100000  )})) // add a random id to each card
    
    console.log(shuffleCards);
    setCards(shuffleCards);


  }

  useEffect(() => {
    // Do we have both choices?
    if (choiceOne && choiceTwo) {
    // now they both exist, compare the value. 
    if (choiceOne.src === choiceTwo.src) {
      console.log("Those cards match!")
      // we have an array of cards in state
      // we have to map thorugh our cards array and assign a new property to the card objects that match
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              console.log("Cards Matched")
              return { ...card, matched: true } // set matched property to true - Mutating state directly is bad!
            } else {
              return card // leave card unchanged
            }
          })
        })
        resetTurn() // reset choices and increment turn counter
      }
    }
  }, [choiceOne, choiceTwo]) // if either choice changes, run this function

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1) // increment turns by 1
  setDisabled(false) // re-enable clicking
}

  return (
    <>
    <button onClick={shuffleCards}>Shuffle Cards</button>
      <button>New Game</button>
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((card) => (
            <Card key={card.id} card={card} handleChoice={handleChoice} flipped = {card === choiceOne || card === choiceTwo || card.matched } />
          ))}
        </div>
      </div>
    </>
  )
}

function Card(props) {
  const { card, handleChoice , flipped} = props; 

 // TODO: determine if card is flipped 
  const[isActive, setIsActive] = useState(false);

  const handleClick = () => {
 
    // check if we have already flipped this card
       setIsActive(!isActive);
    handleChoice(card) 
  } 


  return (
    <div className={styles.flip_card}>
      <div 
      onClick={handleClick}
        className={cx(styles.flip_card_inner, {[styles.flipped] : isActive})} >
          <div className={styles.flip_card_front}>
          <img src={CardPattern} alt="card back" />
        </div>

        <div className={styles.flip_card_back}>
          <img src={card.src} alt="card front" />
        </div>
      </div>
    </div>
  )
}
  