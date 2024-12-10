
import { useState } from 'react'
import { WordInput } from '../../components/ahorcado/Wordinput'
import { Hangman } from '../../components/ahorcado/hangman'
import { Button } from '@nextui-org/react'

export function Ahorcado() {
  const [ word, setWord ] = useState('')
  const [ guessedLetters, setGuessedLetters ] = useState<Set<string>>(new Set())
  const [ errors, setErrors ] = useState(0)
  const [ gameState, setGameState ] = useState<'input' | 'playing' | 'won' | 'lost'>('playing')
  const [ currentGuess, setCurrentGuess ] = useState('')

  const maxErrors = 10

  const handleWordSubmit = (newWord: string) => {
    setWord(newWord)
    setGameState('playing')
  }

  const handleGuess = () => {
    if(currentGuess.length === 1) {
      const letter = currentGuess.toLowerCase()
      if(!guessedLetters.has(letter)) {
        const newGuessedLetters = new Set(guessedLetters)
        newGuessedLetters.add(letter)
        setGuessedLetters(newGuessedLetters)

        if(!word.includes(letter)) {
          const newErrors = errors + 1
          setErrors(newErrors)
          if(newErrors >= maxErrors) {
            setGameState('lost')
          }
        } else if(word.split('').every(char => newGuessedLetters.has(char))) {
          setGameState('won')
        }
      }
    }
    setCurrentGuess('')
  }

  const restartGame = () => {
    setWord('')
    setGuessedLetters(new Set())
    setErrors(0)
    setGameState('input')
    setCurrentGuess('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Juego del Ahorcado</h1>
      {gameState === 'input' && (
        <WordInput onWordSubmit={handleWordSubmit} />
      )}
      {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
        <div className="space-y-8">
          <Hangman errors={errors} />
          <div className="flex justify-center space-x-2" aria-live="polite" aria-label="Palabra a adivinar">
            {word.split('').map((char, index) => (
              <div key={index} className="w-8 h-12 flex items-center justify-center border-b-2 border-black text-2xl font-bold">
                {guessedLetters.has(char) ? char : '_'}
              </div>
            ))}
          </div>
          {gameState === 'playing' && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
                maxLength={1}
                className="w-8 h-12 text-center text-2xl border-b-2 border-black focus:outline-none focus:border-blue-500 bg-transparent"
                aria-label="Ingresa una letra"
                style={{ caretColor: 'transparent' }}
              />
              <Button onClick={handleGuess}>Adivinar</Button>
            </div>
          )}
          {gameState === 'won' && <p className="text-green-500 text-xl" role="alert">¡Felicidades! Has ganado.</p>}
          {gameState === 'lost' && (
            <p className="text-red-500 text-xl" role="alert">
              Has perdido. La palabra era: <span className="font-bold">{word}</span>
            </p>
          )}
          {(gameState === 'won' || gameState === 'lost') && (
            <Button onClick={restartGame} className="mt-4">Jugar de nuevo</Button>
          )}
        </div>
      )}
    </div>
  )
}

