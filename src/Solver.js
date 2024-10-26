// import chalk from "chalk";

class SudokuSolver {
	board;
	originalBoard;
	constructor(board) {
		this.originalBoard = board;
		this.board = board.slice();
	}

	// printBoard(message = "") {
	// 	const horizontalBorder = "--------------------------";
	// 	const doubleHorizontalBorder = "==========================";

	// 	console.log(chalk.bold(message));
	// 	this.board.forEach((row: Row, index: number) => {
	// 		if (index % 3 === 0) {
	// 			console.log(chalk.green(doubleHorizontalBorder));
	// 		}
	// 		else (
	// 			console.log(horizontalBorder)
	// 		);
	// 		let str = "";
	// 		row.forEach((number: number, indexX: number) => {
	// 			if (indexX % 3 === 0) {
	// 				str = str.concat(chalk.green("|")).concat(number.toString()).concat("|");
	// 			} else if (indexX % 3 === 2) {
	// 				str = str.concat("|").concat(number.toString()).concat(chalk.green("| "));

	// 			} else {
	// 				str = str.concat("|").concat(number.toString());
	// 			}
	// 		});
	// 		console.log(str);
	// 	});
	// 	console.log(chalk.green(doubleHorizontalBorder));
	// }
	isValidRow(row, number) {
		for (let col = 0; col < 9; col++) {
			if (this.board[row][col] === number) {
				return false;
			}
		}
		return true;
	}
	isValidCollumn(col, number) {
		for (let row = 0; row < 9; row++) {
			if (this.board[row][col] === number) {
				return false;
			}
		}
		return true;
	}
	boxZerothIndex = (number) => number - (number % 3);
	isValidBox(row, col, number) {
		const rowZerothIndex = this.boxZerothIndex(row);
		const collumnZerothIndex = this.boxZerothIndex(col);
		for (let i = rowZerothIndex; i < rowZerothIndex + 3; i++) {
			for (let j = collumnZerothIndex; j < collumnZerothIndex + 3; j++) {
				if (this.board[i][j] === number) {
					return false;
				}
			}
		}
		return true;
	}
	isValidNumberPlacement(row, col, number) {
		return (this.isValidRow(row, number)
			&& this.isValidCollumn(col, number)
			&& this.isValidBox(row, col, number));
	}
	updateBoard(row, col, num) {
		this.board[row][col] = num;
	}
	noEmptySquares() {
		let emptySquares = 0;
		console.log(this.board)
		this.board.forEach((row) => {
			row.forEach((square) => {
				if (square === 0) {
					emptySquares += 1;
				}
			});
		});
		return (emptySquares === 0);
	}
	
	*solveBoard() {
		if (this.noEmptySquares()) {
			return true;
		}
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				const square = this.board[row][col];
				if (square === 0) {
					for (let possible = 1; possible <= 9; possible++) {
						console.log("considering ", possible)
						if (this.isValidNumberPlacement(row, col, possible)) {
							this.updateBoard(row, col, possible);
							yield this.board.map(row => [...row]); 	
							const result = yield* this.solveBoard(); // Recursive yield for further steps
	
							if (result === true) {
								return true; // Solution found
							}
	
							// Backtrack if needed
							this.updateBoard(row, col, 0);
							yield this.board.map(row => [...row]); 
						}
					}
	
					// If no valid placement, return false (continue backtracking)
					return false;
				}
			}
		}
		// If board is completely filled
		return true;
	}
	// *solveBoard() {
	// 	if (this.noEmptySquares()) {
	// 		return true;
	// 	}
	// 	console.log(this.board)
	// 	for (let row = 0; row < 9; row++) {
	// 		for (let col = 0; col < 9; col++) {
	// 			const square = this.board[row][col];
	// 			if (square === 0) {
	// 				for (let possible = 1; possible < 10; possible++) {
	// 					if (this.isValidNumberPlacement(row, col, possible)) {
	// 						this.updateBoard(row, col, possible);
	// 						yield this.board;
	// 						if ((yield* this.solveBoard()) === true) {
    //                             return true;
	// 						}
	// 						else {
	// 							this.updateBoard(row, col, 0);
	// 							yield this.board
	// 						}
	// 					}
	// 				}
	// 				yield false;
	// 				return false; // Stop further attempts in this path
	// 			}

	// 		}
	// 	}
	// 	return false
	// }
}
export { SudokuSolver };