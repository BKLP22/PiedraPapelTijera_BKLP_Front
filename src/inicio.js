import React from 'react';

function Inicio({ onStartGame }) {
  return (
    <div className="inicio">
      <h1>Bienvenido al juego</h1>
      <button onClick={onStartGame}>Empezar Juego</button>
    </div>
  );
}

export default Inicio;
