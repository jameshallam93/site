import React from "react";
import { useEffect, useState } from "react";

export const Showcase = () => {
    const [gameInProgress, setGameInProgress] = useState(false);
    const [booped, setBooped] = useState(null);
    const [order, setOrder] = useState([]);
    const [turn, setTurn] = useState(0);
    const [guess, setGuess] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    // const boop = (id) => {
    //     setBooped(id);
    //     console.log("Booped", id);
    //     setTimeout(() => {
    //         setBooped(null);
    //     }, 1000);
    // }
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // const startGame = async  () => {
    //     setGuess([]);
    //     setGameInProgress(true);
    //     setTurn(0);
    //     const newOrder = Math.ceil(Math.random() * 2);
    //     setOrder((prevOrder) => [...prevOrder, newOrder]);

    //     [...order, newOrder].forEach((element, index) => {
    //         setTimeout(() => {
    //             boop(element);
    //         }, (index+1) * 1000); 
    //     });

    //     console.log("Game started");
    // }

    const boop = (id) => {
        setBooped(id);
        console.log("Booped", id);
    }
    const startGame = async () => {
        setGuess([]);
        setGameInProgress(true);
        setTurn(0);
    
        const newOrder = Math.ceil(Math.random() * 10);
        setOrder((prevOrder) => [...prevOrder, newOrder]);
    
        // Create a combined order with the new element for sequential booping
        const fullOrder = [...order, newOrder];
        console.log("Game started", fullOrder);
    
        for (let i = 0; i < fullOrder.length; i++) {
            await delay(1000);  // 1-second delay for each boop
            boop(fullOrder[i]);
        }
        
        // Clear the last booped element after the sequence finishes
        await delay(1000);  // Delay to allow last boop to be visible
        setBooped(null);    // Final reset of booped state
    }
    // const handleTurn = (id) => {
    //     console.log("currnelty booped", booped);
    //     console.log("User guessed", id);
    //     if (!gameInProgress) {
    //         startGame();
    //         return;
    //     }

    //     setGuess((prevGuess) => {
    //         const newGuess = [...prevGuess, id];
    //         console.log("Guess now", newGuess);
    //         console.log("Order now", order);
            
    //         if (id !== order[turn]) {
    //             console.log(newGuess, order);
    //             console.log("Game over");
    //             handleGameOver();
    //             return newGuess;
    //         }
    //         if (newGuess.length === order.length) {
    //             console.log("Correct sequence");
    //             const newOrderElement = Math.ceil(Math.random() * 10);
    //             setOrder((prevOrder) => [...prevOrder, newOrderElement]);

    //             [...order, newOrderElement].forEach((element, index) => {
    //                 setTimeout(async () => {
    //                     boop(element);

    //                 }, (index+1) * 1000); 
    //             });
               

    //             setTurn(0); // reset turn after a complete sequence
    //             setBooped(null)
    //             return [];
    //         }
    //         setBooped(null)
    //         setTurn((prevTurn) => prevTurn + 1); // update turn
    //         return newGuess;
    //     });
    //     setBooped(null)
    // };
    const handleTurn = async (id) => {
        console.log("User guessed", id);
        if (!gameInProgress) {
            startGame();
            return;
        }
    
        setGuess((prevGuess) => {
            const newGuess = [...prevGuess, id];
            console.log("Guess now", newGuess);
            console.log("Order now", order);
            
            if (id !== order[turn]) {
                console.log(newGuess, order);
                console.log("Game over");
                handleGameOver();
                return newGuess;
            }
            
            if (newGuess.length === order.length) {
                console.log("Correct sequence");
                const newOrderElement = Math.ceil(Math.random() * 10);
                setOrder((prevOrder) => [...prevOrder, newOrderElement]);
    
                // Sequential booping with delay
                const fullOrder = [...order, newOrderElement];
                (async () => {
                    for (let i = 0; i < fullOrder.length; i++) {
                        boop(fullOrder[i]);
                        await delay(1000);  // Delay to allow boop visibility
                        setBooped(null);    // Clear booped state after final boop
                        await delay(500);  // Extra delay to ensure last boop is visible
                    }
                    await delay(1000);  // Extra delay to ensure last boop is visible
                    setBooped(null);    // Clear booped state after final boop
                })();
    
                setTurn(0); // reset turn after a complete sequence
                return [];
            }
    
            setTurn((prevTurn) => prevTurn + 1); // update turn
            return newGuess;
        });
    };
    const handleGameOver = async () => {
        setGameOver(true);
        setGameInProgress(false);
        setOrder([]);
        setTurn(0);
        // await delay(1000)
        setTimeout(() => {
            setGameOver(false);
        }, 2000);
        setBooped(null)
    };

    return (
        <div className=" flex flex-col items-center" >
          <hr className="border-2 mt-48 w-8/12 border-slate-500"/>
            <h2 className="text-white text-5xl pt-24 pb-16 md:pt-48 select-none">Skillset</h2>
            <div className=" flex flex-col md:flex-row items-center" >
                <div className=" flex flex-col items-center">
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===1 && "text-terminal"}`} onClick={() => handleTurn(1)}  id="1">
                        Python
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===2 && "text-terminal"}`} onClick={() => handleTurn(2)} id="2">
                        CI/CD
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===3 && "text-terminal"}`} onClick={() => handleTurn(3)} id="3">
                        Docker
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===4 && "text-terminal"}`} onClick={() => handleTurn(4)} id="4">
                        DevOps
                    </button>    
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===5 && "text-terminal"}`} onClick={() => handleTurn(5)} id="5">
                        AWS
                    </button>
                </div>
                <div className=" flex flex-col items-center md:items-left" >
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===6 && "text-terminal"}`} onClick={() => handleTurn(6)} id="6">
                        Fullstack Development
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===7 && "text-terminal"}`} onClick={() => handleTurn(7)} id="7">
                        Incident Response Management
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===8 && "text-terminal"}`} onClick={() => handleTurn(8)} id="8">
                        Node/JS/TS/React
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===9 && "text-terminal"}`} onClick={() => handleTurn(9)} id="9">
                        Agile & Scrum Methodologies
                    </button>
                    <button className={`text-slate-300 text-center hover:text-terminal active:text-terminal select-none text-3xl px-10 py-7 ${gameOver && "text-red-700"} ${booped===10 && "text-terminal"}`} onClick={() => handleTurn(10)} id="10">
                        Problem solving
                    </button>
                </div>
            </div>
            <hr className="border-2 my-48 w-8/12 border-slate-500"/>
        </div>
    )
}