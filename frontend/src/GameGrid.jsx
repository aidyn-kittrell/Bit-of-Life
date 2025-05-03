import React, { useState, useEffect, useCallback } from 'react';
import './GameGrid.css';

const createEmptyGrid = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );
};

const countNeighbors = (grid, x, y) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  let count = 0;
  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
      count += grid[newX][newY];
    }
  });
  return count;
};

// Predefined patterns
const patterns = {
  "Block (Still Life)": [
    [1, 1],
    [1, 1],
  ],
  "Blinker (Oscillator)": [
    [1, 1, 1],
  ],
  "Beehive (Still Life)": [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  "Toad (Oscillator)": [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
  ],
};

const GameGrid = ({ rows = 20, cols = 20 }) => {
  const [grid, setGrid] = useState(createEmptyGrid(rows, cols));
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const toggleCellState = (row, col) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? (cell ? 0 : 1) : cell))
    );
    setGrid(newGrid);
  };

  const nextGeneration = useCallback(() => {
    const newGrid = grid.map((row, x) =>
      row.map((cell, y) => {
        const neighbors = countNeighbors(grid, x, y);
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
          return 0; // Underpopulation or Overcrowding
        }
        if (cell === 0 && neighbors === 3) {
          return 1; // Reproduction
        }
        return cell; // Stays the same
      })
    );
    setGrid(newGrid);
    setGeneration((prev) => prev + 1);
  }, [grid]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        nextGeneration();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isRunning, nextGeneration]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setGrid(createEmptyGrid(rows, cols));
    setGeneration(0);
    setIsRunning(false);
  };

  const loadPattern = (patternName) => {
    const pattern = patterns[patternName];
    const newGrid = createEmptyGrid(rows, cols);

    // Center the pattern on the grid
    const startX = Math.floor((rows - pattern.length) / 2);
    const startY = Math.floor((cols - pattern[0].length) / 2);

    pattern.forEach((row, i) => {
      row.forEach((cell, j) => {
        newGrid[startX + i][startY + j] = cell;
      });
    });

    setGrid(newGrid);
    setGeneration(0);
    setIsRunning(false);
  };

  return (
    <div className="game-container">
      <h2>Conway's Game of Life</h2>
      <p>Generation: {generation}</p>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell ? 'alive' : 'dead'}`}
                onClick={() => toggleCellState(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={nextGeneration}>Next Generation</button>
        <button onClick={handleReset}>Reset</button>
        <select
          onChange={(e) => loadPattern(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Load Pattern
          </option>
          {Object.keys(patterns).map((patternName) => (
            <option key={patternName} value={patternName}>
              {patternName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameGrid;