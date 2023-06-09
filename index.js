/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
// LATER give option for 1-player vs pc or two players
// randomize player (X) or PC (O) to go first
// this continues until no valid spaces,
// each turn run function to check if 3 in a row
// if no 3 in a row and no more spaces left, game ends in draw

// COMPONENTS:
// - player factory to make 1-2 players
//   (automatically create one, create another later with button for 2P)
// - game board starts empty and updated with X or O onclick each turn,
//   has function to check win status (3 in a row)
// - PC player that plays random move in valid square
// - game module that starts new game, resets game

// TODO: fix newGame so it resets variables after clicking reset game btn (click listeners)

const gameState = (() => {
    const banner = document.querySelector("#win-banner");
    const gameOver = false;

    const getBoardArray = () => {
        const boardArray = Array.from(document.querySelectorAll(".tile")).map(
            (tile) => tile.innerText
        );

        return boardArray;
    };

    const displayWin = (tieGame) => {
        let winner;

        if (tieGame) {
            winner = "Tie Game :/";
        } else if (newGame.isPlayer1Playing) {
            winner = "Player 1 wins!";
        } else winner = "The computer wins!";

        banner.style.display = "grid";
        banner.innerText = `${winner}`;
        gameBoard.removeTileClickListeners();
        newGame.gameOver = true;
    };

    const checkWin = (array) => {
        if (array[0] !== "" && array[0] === array[1] && array[1] === array[2]) {
            displayWin();
            console.log("WINNER1");
        } else if (
            array[0] !== "" &&
            array[0] === array[3] &&
            array[3] === array[6]
        ) {
            displayWin();
            console.log("WINNER2");
        } else if (
            array[0] !== "" &&
            array[0] === array[4] &&
            array[4] === array[8]
        ) {
            displayWin();
            console.log("WINNER3");
        } else if (
            array[1] !== "" &&
            array[1] === array[4] &&
            array[4] === array[7]
        ) {
            displayWin();
            console.log("WINNER4");
        } else if (
            array[3] !== "" &&
            array[3] === array[4] &&
            array[4] === array[5]
        ) {
            displayWin();
            console.log("WINNER5");
        } else if (
            array[6] !== "" &&
            array[6] === array[7] &&
            array[7] === array[8]
        ) {
            displayWin();
            console.log("WINNER6");
        } else if (
            array[2] !== "" &&
            array[2] === array[5] &&
            array[5] === array[8]
        ) {
            displayWin();
            console.log("WINNER7");
        } else if (
            array[2] !== "" &&
            array[2] === array[4] &&
            array[4] === array[6]
        ) {
            displayWin();
            console.log("WINNER8");
        } else if (isBoardFull()) {
            displayWin(true);
            console.log("tie game");
        } else {
            console.log("Not yet");
        }
    };

    const isBoardFull = () => {
        const board = getBoardArray();
        let isFull = true;

        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                isFull = false;
            }
        }

        return isFull;
    };

    const startNewGame = () => {
        const boardArray = getBoardArray();
        boardArray.forEach((tile, index) => {
            boardArray[index] = "";
            document.getElementById(`${index}`).innerText = "";
        });
        banner.style.display = "none";
        banner.innerText = "";
        gameBoard.addTileClickListeners();
        newGame.isPlayer1Playing = true;
        newGame.gameOver = false;
    };

    const isPlayer1Playing = true;

    return {
        getBoardArray,
        checkWin,
        isBoardFull,
        startNewGame,
        isPlayer1Playing,
        gameOver,
    };
})();

let newGame = gameState;

const playerFactory = (number, letter) => {
    const makeMove = (event) => {
        if (!newGame.gameOver) {
            event.target.innerText = letter;
            event.target.removeEventListener(
                "click",
                gameBoard.tileClickHandler
            );
            const updatedBoard = newGame.getBoardArray();
            newGame.checkWin(updatedBoard);
            newGame.isPlayer1Playing = !newGame.isPlayer1Playing;
            computerMove(newGame.gameOver);
        }
    };

    const computerMove = (isGameOver) => {
        if (isGameOver);
        else {
            const array = newGame.getBoardArray();
            let turnPlayed = false;

            while (!turnPlayed && !newGame.isBoardFull()) {
                let randNum = Math.round(Math.random() * 8);

                if (array[randNum] === "") {
                    document.getElementById(`${randNum}`).innerText = "O";
                    turnPlayed = true;
                    newGame.checkWin(newGame.getBoardArray());
                    newGame.isPlayer1Playing = true;
                } else {
                    randNum = Math.round(Math.random() * 8);
                }
            }
        }
    };

    return { number, letter, makeMove };
};

const gameBoard = (() => {
    const tileClickHandler = (event) => {
        console.log(newGame);
        if (newGame.isPlayer1Playing && event.target.innerText === "") {
            player1.makeMove(event);
        }
    };

    const addTileClickListeners = () => {
        const tiles = Array.from(document.querySelectorAll(".tile"));

        tiles.forEach((tile) => {
            tile.addEventListener("click", tileClickHandler);
        });
    };

    const removeTileClickListeners = () => {
        const tiles = Array.from(document.querySelectorAll(".tile"));
        tiles.forEach((tile) => {
            tile.removeEventListener("click", tileClickHandler);
        });
    };

    const addResetFunction = () => {
        document
            .querySelector(".reset")
            .addEventListener("click", newGame.startNewGame);
    };

    addTileClickListeners();
    addResetFunction();

    return {
        addTileClickListeners,
        removeTileClickListeners,
        tileClickHandler,
    };
})();

const player1 = playerFactory(1, "X");
