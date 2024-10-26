import React, { useState,useEffect } from "react";
import { SudokuSolver } from "../Solver";
import {examples} from "./examples";


const getBorderClass = (i, j) => {
    let borderClass = "border border-white ";
    if (i % 3 === 0) {
        borderClass += "border-t-2 ";
    }
    if (i === 8) {
        borderClass += "border-b-2 ";
    }
    if (j % 3 === 0) {
        borderClass += "border-l-2 ";
    }
    if (j === 8) {
        borderClass += "border-r-2 ";
    }
    return borderClass;
}

const preFilledCell = (value, i, j) => {
    const borderClass = getBorderClass(i, j);
    const fullClass = `w-10 h-10 text-center text-white ${borderClass}`;
    return(
        <td key={i} class={fullClass}>{value === 0 ? "" : value}</td>
    )
}
const mapExample = (example) => {
    let map = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(parseInt(example[i*9+j]));
        }
        map.push(row);
    }
    return map;
  }
const Sudoku = () => {
    const [solver, setSolver] = useState(null);
    const [board, setBoard] = useState(null);
    const [solving, setSolving] = useState(false);
    // Initialize the solver when the component mounts
    useEffect(() => {
        const initialBoard = examples[Math.floor(Math.random() * examples.length)];
        setBoard(mapExample(initialBoard));
        const solverInstance = new SudokuSolver(mapExample(initialBoard));
        setSolver(solverInstance.solveBoard()); // Start the generator
    }, []);


    const handleSolve = () => {
        setSolving(true);
        stepThroughSolver();
    };

    const stepThroughSolver = () => {
        if (!solver) return;

        const { value, done } = solver.next();
        if (!done) {
            setBoard(value); // Update the board to show the current step
            setTimeout(stepThroughSolver, 50); // Adjust delay to control speed
        } else {
            setSolving(false); // Stop the loop when solved
        }
    };
    const randomExample = () => {
        const initialBoard = examples[Math.floor(Math.random() * examples.length)];
        setBoard(mapExample(initialBoard));
        const solverInstance = new SudokuSolver(mapExample(initialBoard));
        setSolver(solverInstance.solveBoard()); // Start the generator
    }

    return (
        <div className="sudoku flex sm:flex-row-reverse bg-black items-center justify-center">
            <div className="flex flex-col">
                <table className="table-fixed">
                    {board && board.map((row, i) => (
                        <tr key={i} className="row">
                            {row.map((cell, j) => (
                                preFilledCell(cell, i, j)
                            ))}
                        </tr>
                    ))    
                    }
                </table>
            <div className="flex flex-row items-center justify-evenly">
                <button disabled={solving} className="text-white w-40 p-2 sm:p-5 m-1 border-2 border-white text-center self-center z-10" onClick={handleSolve}><p className="text-center items-center justify-center">Click me</p></button>
                <button disabled={solving} className="text-white w-40 p-2 sm:p-5 m-1 border-2 border-white text-center self-center z-10" onClick={randomExample}>New Sudoku</button>
            </div>
            </div>
        </div>
    );
}

export default Sudoku;