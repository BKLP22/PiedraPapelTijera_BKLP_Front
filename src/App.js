import { useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [result, setResult] = useState('');

  const playGame = async () => {
    try {
      if (player1 === "" || player2 === "") {
        setResult("Ambos jugadores han de escoger")
      } else {
        const backendUrl = "http://localhost:5265";
        const queryParameters = new URLSearchParams({ player1, player2 }).toString();
        const response = await axios.post(`${backendUrl}/api/Game?${queryParameters}`);
        setResult(response.data);
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

  return (
    <div className='contenedor'>
      <div className='flex'>
        <div>
          <p>Jugador 1: {player1} </p>
          <button onClick={() => cambiarOpcionJugador1('piedra')}>Piedra</button>
          <button onClick={() => cambiarOpcionJugador1('papel')}>Papel</button>
          <button onClick={() => cambiarOpcionJugador1('tijera')}>Tijera</button>
        </div>
        <div>
          <p>Jugador 2: {player2}</p>
          <button onClick={() => cambiarOpcionJugador2('piedra')}>Piedra</button>
          <button onClick={() => cambiarOpcionJugador2('papel')}>Papel</button>
          <button onClick={() => cambiarOpcionJugador2('tijera')}>Tijera</button>
        </div>
        <button onClick={playGame}>Jugar</button>
        {result && <p>Resultado: {result}</p>}
      </div>
    </div>
  );
}

export default App;
