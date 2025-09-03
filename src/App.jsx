import './App.css'
import Header from './components/Header'
import {ranks} from './ranks.js'
import { useState } from 'react'
import clsx from "clsx";

function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const [currentWord, setCurrentword] = useState("temporary") 

  const [guessedLetters, setGuessedLetters] = useState([]) 

    const currentWordArray = currentWord.toUpperCase().split("").map((letter, index) => (<span key={index} className="letter-guess">{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>))

    const alphabetArray = alphabet.split("").map((letter) =>
    
    {
      const isGuessed = guessedLetters.includes(letter)
      const isCorrect = isGuessed && currentWord.includes(letter)
      const isWrong = isGuessed && !currentWord.includes(letter)
      const className = clsx(
    "keyboard-letter", 
    {
      "keyboard-letter-correct": isCorrect,
      "keyboard-letter-wrong": isWrong
    }
  );
      
      return(<button key={letter} className={className} onClick={() => handleLetterClick(letter)}>{letter.toUpperCase()}</button>)
    
    })

  function handleLetterClick(letter){
  setGuessedLetters(prevArray =>  prevArray.includes(letter) ? prevArray : [...prevArray, letter])
  }

  return (
    <>
     <Header />
     <main>
      <section className="game-status">
        <h2>You won temporary</h2>
        <p>Temporary text</p>
      </section>
      <section className="ranks">
        {ranks.map((rank) => (
          <div 
            key={rank.name} 
             style={{
    backgroundColor: rank.backgroundColor,
    color: rank.color
  }}
            >{rank.name}</div>))}
      </section>
      <section className="word-guess">
        {currentWordArray}
      </section>
      <section className="keyboard">
        {alphabetArray}
      </section>
      <button className="new-game">New Game</button>
     </main>
    </>
  )
}

export default App
