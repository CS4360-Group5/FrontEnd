import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";


const CELL_SIZE = 35;
const WIDTH = 26;
const HEIGHT = 9;


function Map() {
  const [cells, setCells] = useState(Array(WIDTH * HEIGHT).fill(true));
  const [playerPosition, setPlayerPosition] = useState(0);

  /*
  const handleClick = (index) => {
    const newCells = [...cells];
    newCells[index] = !newCells[index];
    setCells(newCells);
  };
  */

  const handleMove = (direction) => {
    const newPosition =
      direction === "north"
        ? playerPosition - WIDTH
        : direction === "south"
        ? playerPosition + WIDTH
        : direction === "west"
        ? playerPosition - 1
        : direction === "east"
        ? playerPosition + 1
        : playerPosition;
    if (
      newPosition >= 0 &&
      newPosition < WIDTH * HEIGHT &&
      (direction === "north" ||
        direction === "south" ||
        direction === "west" ||
        direction === "east")
    ) {
      setPlayerPosition(newPosition);
    }
  };

  const renderCells = () => {
    const cellRects = [];
    cells.forEach((cell, index) => {
      const colIndex = index % WIDTH;
      const rowIndex = Math.floor(index / WIDTH);
      const x = colIndex * CELL_SIZE;
      const y = rowIndex * CELL_SIZE;
      const color = cell ? "black" : "white";
      cellRects.push(
        <Rect
          key={index}
          x={x}
          y={y}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={color}
          stroke="black"
          //onClick={() => handleClick(index)}
        />
      );
    });
    return cellRects;
  };

  const renderPlayer = () => {
    const colIndex = playerPosition % WIDTH;
    const rowIndex = Math.floor(playerPosition / WIDTH);
    const x = colIndex * CELL_SIZE;
    const y = rowIndex * CELL_SIZE;
    return (
      <Rect
        x={x}
        y={y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill="blue"
      />
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => handleMove("north")}>Move North</button>
        <button onClick={() => handleMove("south")}>Move South</button>
        <button onClick={() => handleMove("west")}>Move West</button>
        <button onClick={() => handleMove("east")}>Move East</button>
      </div>
      <Stage width={CELL_SIZE * WIDTH} height={CELL_SIZE * HEIGHT}>
        <Layer>{renderCells()}</Layer>
        <Layer>{renderPlayer()}</Layer>
      </Stage>
    </div>
  );
}


export default Map;
