/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({ sigint: true });

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    return board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(`${board[1]} | ${board[2]} | ${board[3]}\n---------\n${board[4]} | ${board[5]} | ${board[6]}\n---------\n${board[7]} | ${board[8]} | ${board[9]}`)
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    if (board[position] == 'X' || board[position] == 'O') {
        console.log('the position is occupied\nplease pick other position')
        return false
    } else if (position == '1' || position == '2' || position == '3' || position == '4' || position == '5' || position == '6' || position == '7' || position == '8' || position == '9') {
        return true
    } else {
        return false
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    let result = false
    for (let index = 0; index < winCombinations.length; index++) {
        checkWinner = board[winCombinations[index][0]] == player && board[winCombinations[index][1]] == player && board[winCombinations[index][2]] == player

        if (checkWinner == true) {
            return result = true
        }
    }
    return result
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    let result = true
    for (let index = 1; index <= Object.keys(board).length; index++) {
        if (board[index] !== 'X' && board[index] !== 'O') {
            return result = false
        }
    }
    return result
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let pickingPosition = true
    while (pickingPosition) {
        let position = prompt(`It's ${player} turn\nPlease pick your position in the board\n`)
        if (validateMove(position) == true) {
            console.log(`${player}'s turn, input ${position}`);
            markBoard(position, player);
            printBoard();
            pickingPosition = false
        } else {
            validateMove(position);
        }
    }
}



// entry point of the whole program
function gameStart() {
    console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n');

    let winnerIdentified = false
    let currentTurnPlayer = 'X'

    while (!winnerIdentified) {
        currentTurnPlayer = 'X'
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie

        if (checkWin(currentTurnPlayer) == true) {
            console.log(`congratulations ${currentTurnPlayer} is the winner!!\n--game over--`)
            return winnerIdentified = true
        } if (checkFull() == true && checkWin(currentTurnPlayer) == false) {
            console.log(`theres no winner, game is tie`)
            return winnerIdentified = true
        }

        currentTurnPlayer = 'O'
        playTurn(currentTurnPlayer);
        if (checkWin(currentTurnPlayer) == true) {
            console.log(`congratulations ${currentTurnPlayer} is the winner!!\n--game over--`)
            return winnerIdentified = true
        } if (checkFull() == true && checkWin(currentTurnPlayer) == false) {
            console.log(`theres no winner, game is tie`)
            return winnerIdentified = true
        }
    }
}

gameStart()

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over

let wantRestart = true;

while (wantRestart) {
    let askForRestart = prompt(`do you want to restart?\n['Y'/'N']`)
    if (askForRestart == 'Y') {
        board = {
            1: ' ', 2: ' ', 3: ' ',
            4: ' ', 5: ' ', 6: ' ',
            7: ' ', 8: ' ', 9: ' '
        };
        gameStart()
    } if (askForRestart == 'N') {
        console.log(`thank you for playing`)
        wantRestart = false
    }
}