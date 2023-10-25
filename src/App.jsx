import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard.jsx'


const cardImages = [
{"src":"/img/tiger.jpg", matched: false },
{"src":"/img/lion.jpg", matched: false },
{"src":"/img/pumba.jpg", matched: false },
{"src":"/img/timon.jpg", matched: false },
{"src":"/img/lepoard.jpg", matched: false },
{"src":"/img/cat.jpg", matched: false },
]


// const cards = document.querySelectorAll('.card');

// cards.forEach(card => {
//   card.addEventListener('click', () => {
//     card.classList.toggle('flipped');
//   });
// });

// const cardFrontImage = [
//   {"src":"/img/crown.jpg"}
// ]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [clicks, setClicks] = useState(0);

  //randomize cards
  const shuffleCards = () =>  {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurns(0);

    // Reset the click count to 0
    setClicks(0);
  }

  //handle a choice funct, make prop then pass to single card
  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
      setClicks(clicks + 1);
    }
    

    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
    
  }

  useEffect(() => {
    if (choiceOne && choiceTwo)  {

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })  
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  } , [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1) 
  }


  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Clicks: {clicks}</p> {/* Display the click count */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
};

export default App;