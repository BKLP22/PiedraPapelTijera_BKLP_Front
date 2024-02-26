import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Inicio from './inicio';


function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [result, setResult] = useState('');
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);



  const playGame = async () => {
    try {
      if (player1 === "" || player2 === "") {
        setResult("Ambos jugadores han de escoger")
      } else {
        const backendUrl = "http://localhost:5265";
        const queryParameters = new URLSearchParams({ player1, player2 }).toString();
        const response = await axios.post(`${backendUrl}/api/Game?${queryParameters}`);
        setResult(response.data);
        // Incrementar la puntuación del jugador ganador
        if (response.data === 'Gana jugador 1') {
          setScorePlayer1(scorePlayer1 + 1);
        } else if (response.data === 'Gana jugador 2') {
          setScorePlayer2(scorePlayer2 + 1);
        }

        if (scorePlayer1 === 2 || scorePlayer2 === 2) {
          setGameOver(true);
        }
      }
    } catch (error) {
      console.error('Error con la partida:', error);
    }
  };

  const cambiarOpcionJugador1 = (choice) => {
    setPlayer1(choice);
  };

  const cambiarOpcionJugador2 = (choice) => {
    setPlayer2(choice);
  };
  const handleStartGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setPlayer1('');
    setPlayer2('');
    setResult('');
    setScorePlayer1(0);
    setScorePlayer2(0);
    setGameOver(false);
  };

  return (
    <div className="container">
      {!gameStarted && <Inicio onStartGame={handleStartGame} />}
      {gameStarted && (
        <div>
          <div className="buttons-container">
            <div className="column">
              <button className="button" onClick={() => cambiarOpcionJugador1('piedra')}><img src={require('./img/piedra.png')} alt='piedra' /></button>
              <button className="button" onClick={() => cambiarOpcionJugador1('papel')}><img src={require('./img/papel.png')} alt='papel' /></button>
              <button className="button" onClick={() => cambiarOpcionJugador1('tijera')}><img src={require('./img/tijera.png')} alt='tijera' /></button>
              <p>Puntuación: {scorePlayer1}</p>
            </div>
            <div className="separator"></div>
            <div className="column">
              <button className="button" onClick={() => cambiarOpcionJugador2('piedra')}><img src={require('./img/piedra.png')} alt='piedra' /></button>
              <button className="button" onClick={() => cambiarOpcionJugador2('papel')}><img src={require('./img/papel.png')} alt='papel' /></button>
              <button className="button" onClick={() => cambiarOpcionJugador2('tijera')}><img src={require('./img/tijera.png')} alt='tijera' /></button>
              <p>Puntuación: {scorePlayer2}</p>
            </div>
          </div>
          <div className="text-center">
            {!gameOver && <button className="play-button" onClick={playGame}>Jugar</button>}
            {gameOver && <button className="reset-button" onClick={resetGame}>Reiniciar</button>}
          </div>
          {result && <p className="mt-4">Resultado: {result}</p>}
        </div>
      )}
    </div>
  );
  
}

export default App;
