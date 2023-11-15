import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';

// The images for the cards with an initial state of not matched
const cardImages = [
  { "src": "/img/tiger.jpg", matched: false },
  { "src": "/img/lion.jpg", matched: false },
  { "src": "/img/pumba.jpg", matched: false },
  { "src": "/img/timon.jpg", matched: false },
  { "src": "/img/lepoard.jpg", matched: false },
  { "src": "/img/cat.jpg", matched: false },
]

function App() {
  // State variables for our game
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const maxTurns = 8; // Set the maximum number of turns

  // Function to randomize cards and set up the game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // Function to handle card choices
  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  }

  // Effect hook to check for matches and update game state
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // Function to reset the turn and update game state
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setClickCount(prevClickCount => prevClickCount + 1);
    setDisabled(false);

    if (choiceOne && choiceTwo && choiceOne.src !== choiceTwo.src) {
      setTurns((prevTurns) => prevTurns + 1);
    }
  }

  // Check if the maximum number of turns has been reached
  if (turns === maxTurns) {
    alert(`Game over! You reached the maximum number of turns: ${maxTurns} YOU SUCK!!!`);
  }

  // Effect hook to start a new game automatically without clicking the new game button
  useEffect(() => {
    shuffleCards();
  }, [])

  // Render the game UI
  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Clicks: {clickCount}</p> {/* Display the click count */}

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
