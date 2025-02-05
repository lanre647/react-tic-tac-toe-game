import React, { useState } from "react"; // Importing React and the useState hook
import "./TicTacToe.css"; // Importing the CSS file for styling
import circle_icon from "../assets/circle.png"; // Importing the circle icon for the "O" player
import cross_icon from "../assets/cross.png"; // Importing the cross icon for the "X" player

const TicTacToe = () => {
  // State to manage the board, initialized with an array of 9 empty strings
  const [board, setBoard] = useState(Array(9).fill(""));

  // State to track the number of moves (used to determine turns)
  const [count, setCount] = useState(0);

  // State to track the winner
  const [winner, setWinner] = useState(null);

  // Function to check if there is a winner
  const checkWin = (updatedBoard) => {
    // Array of winning patterns (indices of the board that make a winning line)
    const winPatterns = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    // Loop through each winning pattern
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern; // Destructuring the indices
      // Check if all three indices in the pattern have the same value (either "x" or "o") and are not empty
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        setWinner(updatedBoard[a]); // Set the winner to "x" or "o"
        return true; // Return true to indicate a win
      }
    }
    return false; // Return false if no winner is found
  };

  // Function to handle a player's move
  const handleClick = (index) => {
    // If the clicked cell is already occupied or if there is a winner, do nothing
    if (board[index] !== "" || winner) return;

    // Create a copy of the board array
    const newBoard = [...board];

    // Set the current move based on the turn count (even for "X", odd for "O")
    newBoard[index] = count % 2 === 0 ? "x" : "o";

    // Update the board state
    setBoard(newBoard);

    // Increment the move count
    setCount(count + 1);

    // Check if the move results in a win
    checkWin(newBoard);
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill("")); // Reset the board to empty
    setCount(0); // Reset the move count
    setWinner(null); // Reset the winner state
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>

      {/* Display the winner message if there's a winner */}
      {winner && <h2 className="winner-text">{winner.toUpperCase()} Wins!</h2>}

      {/* Game Board */}
      <div className="board">
        {board.map((val, index) => (
          <div
            key={index} // Unique key for each cell
            className="boxes" // Applying styles to each box
            onClick={() => handleClick(index)} // Click handler for making a move
          >
            {/* Display "X" or "O" image based on the board state */}
            {val && (
              <img src={val === "x" ? cross_icon : circle_icon} alt={val} />
            )}
          </div>
        ))}
      </div>

      {/* Reset Button to restart the game */}
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
