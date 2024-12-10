import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTimer } from 'use-timer'
import { Timer } from '../../components/Timer/Timer'
import { WordInput } from '../../components/ahorcado/Wordinput'
import { Hangman } from '../../components/ahorcado/hangman'
import { useUser } from '../../libraries/auth/hooks/useUser'
import { WinOrLoseOrTie } from '../../libraries/games/components/WinOrLose/WinOrLose'
import { invoke, useSignalREffect } from '../../providers/SignalProvider'
import { useTerminarPartidaMutation, useValidarGanadorMutation } from '../api/Partidas/partidas'
import { ResultadoPartida } from '../api/enums/ResultadoPartidaEunm'
import { speak } from '../../utils/speechUtil'


const useAhorcadoTimer = (initialTime: number) => {
  const { reset, start, time, pause } = useTimer({
    initialTime: initialTime,
    autostart: true,
    timerType: "DECREMENTAL",
    endTime: 0,
  });

  return { reset, start, time, pause };
}

export function Ahorcado() {
  const [ word, setWord ] = useState('')
  const [ guessedLetters, setGuessedLetters ] = useState<Set<string>>(new Set())
  const [ errors, setErrors ] = useState(0)
  const [ gameState, setGameState ] = useState<'input' | 'playing' | 'won' | 'lost'>('playing')
  const [ currentGuess, setCurrentGuess ] = useState('')

  const { partidaId } = useParams<{
    partidaId: string;
    tipoJugador: string;
  }>();
  const { user } = useUser();

  const maxErrors = 10
  const maxValue = 60;

  const { time, pause } = useAhorcadoTimer(maxValue);

  const handleWordSubmit = (newWord: string) => {
    setWord(newWord)
    setGameState('playing')
  }

  const handleGuess = () => {
    if(currentGuess.length !== 1) {
      setCurrentGuess('');
      return;
    }

    const letter = currentGuess.toLowerCase();

    if(guessedLetters.has(letter)) {
      setCurrentGuess('');
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if(!word.includes(letter)) {
      const newErrors = errors + 1;
      setErrors(newErrors);

      if(newErrors >= maxErrors) {
        setGameState('lost');
        handleValidarGanador(ResultadoPartida.Derrota);
        pause();
      }
    } else {
      const hasWon = word.split('').every(char => newGuessedLetters.has(char));
      if(hasWon) {
        setGameState('won');
        handleValidarGanador(ResultadoPartida.Victoria);
        pause();
      }
    }

    setCurrentGuess('');
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {

    invoke(
      "SyncGame",
      partidaId,
      user?.userId,
      'initGame'
    );
  }, [])

  useSignalREffect(
    "SyncGame",
    (evento: string, data: Record<string, string>) => {
      console.log(evento, data);

      if(evento === 'initGame') {
        setWord(data.text?.toLocaleLowerCase())
        setGameState('playing')
      }

    },
    []
  );
  const [ openResults, setopenResults ] = useState(false);
  useSignalREffect(
    "TerminarPartida",
    () => {
      setopenResults(true);
    },
    []
  );

  const [ validarResultados ] = useValidarGanadorMutation();

  const [ terminarPartida ] = useTerminarPartidaMutation();


  const handleValidarGanador = useCallback(
    async (resultado: ResultadoPartida) => {
      speak(resultado === ResultadoPartida.Victoria ? 'Felicidades Ganaste' : 'Fuiste humillado por la IA')
      await validarResultados({
        jugadorId: user?.userId as string,
        partidaId: partidaId as string,
        resultado: resultado
      }).unwrap();
      await terminarPartida({
        partidaId: partidaId as string,
        jugadorId: user?.userId as string,
      }).unwrap()
    },
    [ partidaId, terminarPartida, user?.userId ]
  );

  const handleEndGame = useCallback(
    async () => {
      if(gameState !== 'won') {
        handleValidarGanador(ResultadoPartida.Derrota);
        return
      }

      handleValidarGanador(ResultadoPartida.Victoria);
    },
    [ gameState ]
  );

  useEffect(() => {
    if(time !== 0) return;
    handleEndGame();
  }, [ time ])


  const navigate = useNavigate();

  const onFinalizar = async () => {
    navigate(-1);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center justify-center flex-1">
        <Card className="py-4 px-4 max-w-lg w-full">
          <CardHeader className="justify-center">
            <h1 className="text-4xl text-black font-bold text-center">Juego del Ahorcado</h1>
          </CardHeader>
          <CardBody className="py-2">
            <div className="flex justify-center items-center flex-col flex-1">
              {gameState === 'input' && (
                <WordInput onWordSubmit={handleWordSubmit} />
              )}
              {(gameState === 'playing' || gameState === 'won' || gameState === 'lost') && (
                <div className="flex flex-col space-y-8 justify-center">
                  <div className="self-center">
                    <Hangman errors={errors} />
                  </div>
                  <div className="flex justify-center space-x-2" aria-live="polite" aria-label="Palabra a adivinar">
                    <div className="flex justify-center space-x-2">
                      {word.split('').map((char, index) => (
                        <div key={index} className="text-black w-8 h-12 flex items-center justify-center border-b-2 border-black text-2xl font-bold">
                          {guessedLetters.has(char) ? char : '_'}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {gameState === 'playing' && (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={currentGuess}
                          onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
                          maxLength={1}
                          className="w-8 h-12 text-black text-center text-2xl border-b-2 border-black focus:outline-none focus:border-blue-500 bg-transparent"
                          aria-label="Ingresa una letra"
                          style={{ caretColor: 'transparent' }}
                        />
                        <Button variant='bordered' className='self-end' color='secondary' onClick={handleGuess}>Adivinar</Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-full px-2 z-10 bottom-0">
        <Timer timer={time} maxValue={maxValue} />
      </div>
      <WinOrLoseOrTie
        isOpen={openResults}
        oncClick={onFinalizar}
        result={gameState === 'won' ? ResultadoPartida.Victoria : ResultadoPartida.Derrota}
        answer={word}
      />
    </div>
  )
}

