import { SudokuAction, ActionState, SudokuCell } from '../../models/sudoku-model';
import { createSolutionGrid } from './sudoku-util';
import { copyBoard } from '../list-util';

function getIntGrid(board: SudokuCell[][]) {
    const intGrid: number[][] = board.map((row) => {
        return row.map((cell) => cell.value);
    });

    return intGrid;
}

export async function getSudokuActions(initialBoard: SudokuCell[][]) {
    const initialBoardCpy = copyBoard(initialBoard);
    const actionsArray: SudokuAction[] = [];
    const intGrid = getIntGrid(initialBoardCpy);
    let solution = solveSudoku(actionsArray, intGrid);

    // await solveSudokuAsync(actionsArray, intGrid);
    return {
        actions: actionsArray,
        solution: createSolutionGrid(solution),
    };
}

function attachSudokuAction(
    actionsArray: SudokuAction[],
    actionState: ActionState,
    row: number = -1,
    col: number = -1,
    current: number = -1,
) {
    actionsArray.push({
        actionState,
        row,
        col,
        current,
    });
}

export function solveSudoku(actionsArray: SudokuAction[], board: number[][]) {
    const original = copyBoard(board);

    let row = 0,
        col = 0;
    let isValid = true;

    while (row < 9 && row >= 0) {
        while (col < 9 && col >= 0) {
            if (original[row][col] === 0) {
                let curr = board[row][col];
                // Try Fit
                attachSudokuAction(actionsArray, ActionState.TRY_FIT, row, col, curr);
                isValid = fitValidNumber(actionsArray, board, row, col);
            }
            if (isValid) col++;
            else col--;
        }

        // After inner loop
        if (col < 0) {
            row--;
            col = 8;
        } else {
            row++;
            col = 0;
        }
    }

    if (isValid) {
        // console.log("sudoku solved");
        attachSudokuAction(actionsArray, ActionState.FINAL_VALID);
    } else {
        attachSudokuAction(actionsArray, ActionState.FINAL_INVALID);
    }
    return board;
}

function fitValidNumber(
    actionsArray: SudokuAction[],
    board: number[][],
    row: number,
    col: number,
) {
    let currentNumber = Math.max(board[row][col], 1);
    let rowColValid = rowAndColAreValid(board, row, col, currentNumber);
    let squareValid = squareIsValid(board, row, col, currentNumber);
    let isValid = rowColValid && squareValid && currentNumber < 10;

    while (!isValid && currentNumber <= 9) {
        // Invalid cell value. Incorrect.
        attachSudokuAction(actionsArray, ActionState.SET_INVALID, row, col, currentNumber);
        currentNumber++;
        rowColValid = rowAndColAreValid(board, row, col, currentNumber);
        squareValid = squareIsValid(board, row, col, currentNumber);
        isValid = rowColValid && squareValid && currentNumber < 10;
    }

    isValid = rowColValid && squareValid && currentNumber < 10;
    if (isValid) {
        // Valid cell value. Correct.
        attachSudokuAction(actionsArray, ActionState.SET_VALID, row, col, currentNumber);
        board[row][col] = currentNumber;
    } else board[row][col] = 0;
    return isValid;
}

export function squareIsValid(board: number[][], row: number, col: number, curr: number) {
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            if (board[i][j] === curr) return false;
        }
    }
    return true;
}

export function rowAndColAreValid(board: number[][], row: number, col: number, curr: number) {
    const rowIsValid = !board[row].includes(curr);
    const colIsValid = board.filter((r) => r[col] === curr).length === 0;
    return rowIsValid && colIsValid;
}
