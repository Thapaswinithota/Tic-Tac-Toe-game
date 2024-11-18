import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [winner, setWinner] = useState(null);


  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore clicks on already-filled cells or when the game is over
  
    const newBoard = [...board];
    newBoard[index] = currentPlayer === "Player 1" ? "X" : "O"; // Place X for Player 1, O for Player 2
    setBoard(newBoard);
  
    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result === "X" ? "Player 1" : "Player 2"); // Determine the winner based on the marker
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner("Draw"); // Handle draw
    } else {
      setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2" : "Player 1"); // Switch player
    }
  };
  
  

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return "X" or "O"
      } 
    }
  
    return null; // No winner
  };
  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("Player 1");
  };
  

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      
      {/* Display Current Player */}
      <div className="player-indicator">
        {!winner && (
          <h2>
            Current Turn: {currentPlayer} ({currentPlayer === "Player 1" ? "X" : "O"})
          </h2>
        )}
        {winner && (
          <h2>
            {winner === "Draw"
              ? "It's a Draw!"
              : `${winner} (${winner === "Player 1" ? "X" : "O"}) Wins!`}
          </h2>
        )}
      </div>
  
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`cell ${board[index] === "X" ? "x" : board[index] === "O" ? "o" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
  
      <button onClick={resetGame}>Restart</button>
    </div>
  );
  
  
}

export default App;
