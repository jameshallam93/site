import React, { useState,useEffect } from "react";
import { SudokuSolver } from "../Solver";
import {examples} from "./examples";


const getBorderClass = (i, j) => {
    let borderClass = "border border-slate-500 ";
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
        <td key={`${i}${j}`} class={fullClass}>{value === 0 ? "" : value}</td>
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
    const [customSudoku, setCustomSudoku] = useState(null)
    const [showInput, setShowInput] = useState(false)
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

    const handleCustomSudoku = () => {

        const regex =new RegExp(/^\d+$/)
        if (!regex.test(customSudoku) || customSudoku.length !== 81){
            console.log("invalid format")
            return
        }
        setBoard(mapExample(customSudoku))
        const solverInstance = new SudokuSolver(mapExample(customSudoku));
        setSolver(solverInstance.solveBoard()); // Start the generator
        setShowInput(!showInput)
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
                <div className="flex flex-row items-center justify-evenly grow ">
                    <button
                        disabled={solving}
                        className="text-slate-300 w-40 p-2 border-2 border-slate-500 text-center self-center z-10"
                        onClick={handleSolve}
                    >
                        Click me
                    </button>
                    <button
                        disabled={solving}
                        className="text-slate-300 w-40 p-2 border-2 border-slate-500 text-center self-center z-10"
                        onClick={randomExample}
                    >
                        New Sudoku
                    </button>
                </div>
                <input
                    style={{display: showInput ? 'block' : 'none'}}
                    type="text"
                    onChange={(e) => setCustomSudoku(e.target.value)}
                    className="my-1 bg-black border-slate-500 border-2 text-slate-300"
                    value={customSudoku}
                />
                <button
                    onClick={showInput ? handleCustomSudoku : () => setShowInput(!showInput)}
                    className="text-slate-300 w-90 p-2 border-2 border-slate-500 text-center z-10"
                >
                    {showInput ? "Submit sudoku" : "Provide a custom sudoku string"}
                </button>
            </div>
        </div>
    );
}

export default Sudoku;