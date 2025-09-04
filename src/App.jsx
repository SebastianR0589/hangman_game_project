import './App.css'
import Header from './components/Header'
import {ranks} from './ranks.js'
import { getFailNotice } from './failnotices.js'
import {getNewWord} from './words.js'
import { useState } from 'react'
import { useEffect } from 'react'
import clsx from "clsx";
import Confetti from 'react-confetti'


function App() {

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const [currentWord, setCurrentword] = useState("") 

  const [guessedLetters, setGuessedLetters] = useState([]) 
  
  const [failNotice, setFailNotice] = useState("")

useEffect(() => {
  setCurrentword(getNewWord())
}, []);


  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessCount >= ranks.length

  const isGameOver = isGameWon || isGameLost

  const wrongGuess = wrongGuessCount > 0 && !isGameOver

  const gameOverStyling = clsx(
    "game-status",
    {
      fail: wrongGuess,
      won: isGameWon,
     lost: isGameLost
    }
  )




  const rankElements = ranks.map((rank, index) => {
    const styles = {
      backgroundColor: rank.backgroundColor,
      color: rank.color
    }
    const className = clsx(
      "ranks", 
      {
        lost: index < wrongGuessCount
      }
    );
    return <span className={className} key={rank.name} style={styles}>{rank.name}</span>
  })

    const currentWordArray = currentWord.split("").map((letter, index) => {
  const wordRevealStyling = clsx(
    "letter-guess",
    {
      missed:  isGameLost && !guessedLetters.includes(letter),
      hit: guessedLetters.includes(letter)
    }
  )

      return (<span key={index} className={wordRevealStyling}>{isGameLost || guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>)})




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
      
      return(<button key={letter} className={className} onClick={() => handleLetterClick(letter)} disabled={isGameOver}>{letter.toUpperCase()}</button>)
    
    })


    useEffect(() => {
  if (wrongGuessCount > 0) {
    const rankName = ranks[wrongGuessCount - 1].name;
    setFailNotice(getFailNotice(rankName));
  }
}, [wrongGuessCount, isGameOver]);

  function handleLetterClick(letter){
  setGuessedLetters(prevArray =>  prevArray.includes(letter) ? prevArray : [...prevArray, letter])
  }

  function handleGameReset(){
    setGuessedLetters([])
    setCurrentword(getNewWord())
    setFailNotice("")
  }

  return (
    <>
     <Header />
     <main>
      {isGameWon && <Confetti />}
      <section className={gameOverStyling}>

       {wrongGuess && !isGameOver &&
       <>
       <h2>Wrong guess</h2>
       <p>{failNotice}</p></> }
       {isGameWon &&  <>  
        <h2>You won</h2>
        <p>{`You won with the rank of ${ranks[wrongGuessCount].name}`}</p>
        </>}
        {isGameLost && <>  
        <h2>You lost</h2>
       <p>You are not even good enough for Copper. You are Wood...Wood.</p></>
       }      
      </section>
      <section className="ranks">
       {rankElements}
      </section>
      <section className="word-guess">
        {currentWordArray}
      </section>
      <section className="keyboard">
        {alphabetArray}
      </section>
      {isGameOver &&   <button onClick={() => handleGameReset()} className="new-game">New Game</button>}
    
     </main>
    </>
  )
}

export default App
