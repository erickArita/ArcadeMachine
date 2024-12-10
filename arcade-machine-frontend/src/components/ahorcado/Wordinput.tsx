"use client"

import { Button } from '@nextui-org/react';
import { useState, useRef, useEffect } from 'react'
 
interface WordInputProps {
  onWordSubmit: (word: string) => void;
}

export function WordInput({ onWordSubmit }: WordInputProps) {
  const [ word, setWord ] = useState<string[]>(Array(5).fill(''))
  const [ error, setError ] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  console.log(inputRefs);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 10)
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if(value.length <= 1) {
      const newWord = [ ...word ]
      newWord[ index ] = value.toLowerCase()
      setWord(newWord)

      if(value && index < 9) {
        inputRefs.current[ index + 1 ]?.focus()
      }

      if(newWord.filter(Boolean).length < 5) {
        setError('La palabra debe tener al menos 5 letras.')
      } else {
        setError('')
      }

      if(newWord.length < 10 && newWord.every(Boolean)) {
        setWord([ ...newWord, '' ])
        setTimeout(() => {
          inputRefs.current[ newWord.length ]?.focus()
        }, 0)
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Backspace' && !word[ index ] && index > 0) {
      inputRefs.current[ index - 1 ]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalWord = word.join('').trim()
    if(finalWord.length >= 5 && finalWord.length <= 10) {
      onWordSubmit(finalWord)
    } else {
      setError('La palabra debe tener entre 5 y 10 letras.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center space-x-2">
        {word.map((letter, index) => (
          <input
            key={index}
            type="text"
            value={letter}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) =>{ inputRefs.current[ index ] = el}}
            className="w-8 h-12 text-center text-2xl border-b-2 border-black focus:outline-none focus:border-blue-500 bg-transparent"
            maxLength={1}
            aria-label={`Letra ${index + 1}`}
            style={{ caretColor: 'transparent' }}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-center" role="alert">{error}</p>}
      <Button type="submit" className="w-full">Comenzar Juego</Button>
    </form>
  )
}

