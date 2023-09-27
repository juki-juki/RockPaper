let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

function updateScore() {
    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("draw-score").textContent = drawScore;
}

function computerPlay() {
    const moves = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        const drawPopup = document.getElementById("draw-popup");
        drawPopup.style.display = "block";
        setTimeout(() => {
            drawPopup.style.display = "none";
        }, 1500);

        return "It's a tie!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "Nice One Lods!";
    } else {
        return "Talo Ka Lods!";
    }
}

const userButtons = document.querySelectorAll(".user-choices button");
const resultDiv = document.getElementById("result");

function animateComputerChoice(computerSelection) {
    const computerChoiceButton = document.getElementById(`${computerSelection}-computer`);
    computerChoiceButton.querySelector("img").style.animation = "computerChoiceAnimation 0.5s ease-in-out";
    setTimeout(() => {
        computerChoiceButton.querySelector("img").style.animation = "";
    }, 500);
}

function enableUserButtons() {
    userButtons.forEach(userButton => {
        userButton.disabled = false;
    });
}

function disableUserButtons() {
    userButtons.forEach(userButton => {
        userButton.disabled = true;
    });
}

function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById("overlay");
    const popupImage = popup.querySelector("img");
    const closeButton = popup.querySelector("button");

    overlay.style.display = "none";
    popup.style.display = "none";
    popupImage.src = "";
    closeButton.removeEventListener("click", () => hidePopup(popupId));
}

function showComputerWinsPopup() {
    const popup = document.getElementById("computer-wins-popup");
    const popupImage = popup.querySelector("img");
    const popupText = popup.querySelector("p");
    const closeButton = document.createElement("button");
    const overlay = document.getElementById("overlay");

    overlay.style.display = "block";
    popupImage.src = "images/computer.gif";
    popupText.textContent = "Computer Wins";
    popup.style.display = "block";

    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        hidePopup("computer-wins-popup");
        resetGame();
    });

    popup.appendChild(closeButton);
}

function hideComputerWinsPopup() {
    const computerWinsPopup = document.getElementById("computer-wins-popup");
    const overlay = document.getElementById("overlay");
    const computerWinsGIF = computerWinsPopup.querySelector("img");
    const closeButtonComputer = computerWinsPopup.querySelector("button");

    overlay.style.display = "none";
    computerWinsPopup.style.display = "none";
    computerWinsGIF.src = "";
    closeButtonComputer.removeEventListener("click", hideComputerWinsPopup);
}




function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    updateScore();
    resultDiv.textContent = "";

    enableUserButtons();

    updateUserPickImage("");
    updateComputerPickImage("");
}



const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    updateScore();
    resultDiv.textContent = "";

    enableUserButtons();

    updateUserPickImage("");
    updateComputerPickImage("");

    hideChampionPopup();
    hideComputerWinsPopup();
});

function updateUserPickImage(pick) {
    const userPickImage = document.getElementById("player-pick-image");
    userPickImage.src = pick ? `images/${pick}.png` : "";
}


function updateComputerPickImage(pick) {
    const computerPickImage = document.getElementById("computer-pick-image");
    computerPickImage.src = pick ? `images/${pick}.png` : "";
}

userButtons.forEach(button => {
    button.addEventListener("click", () => {
        
        if (playerScore >= 5 || computerScore >= 5) {
            return; 
        }

        const playerSelection = button.id.replace("-user", "");
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);

        resultDiv.textContent = `You chose ${playerSelection}. Computer is deciding...`;

        userButtons.forEach(userButton => {
            userButton.disabled = true;
        });

        updateUserPickImage(playerSelection);

        setTimeout(() => {
            resultDiv.textContent = `You chose ${playerSelection}. Computer chose ${computerSelection}. ${result}`;

            updateComputerPickImage(computerSelection);

            if (result === "Nice One Lods!") {
                const winPopup = document.getElementById("win-popup");
                const winImage = document.getElementById("win-image");
                winImage.src = "images/win.png";
                winPopup.style.display = "block";

                setTimeout(() => {
                    winPopup.style.display = "none";
                }, 1500);
                playerScore++;

                if (playerScore >= 5) {
                    showChampionPopup();
                }
            } else if (result === "Talo Ka Lods!") {
                const losePopup = document.getElementById("lose-popup");
                const loseImage = document.getElementById("lose-image");
                loseImage.src = "images/lose.png";
                losePopup.style.display = "block";

                setTimeout(() => {
                    losePopup.style.display = "none";
                }, 1500);
                computerScore++;

                if (computerScore >= 5) {
                    showComputerWinsPopup();
                }
            } else {
                drawScore++;
            }

            updateScore();
            enableUserButtons();

            if (playerScore < 5 && computerScore < 5) {
                resultDiv.textContent = `You chose ${playerSelection}. Computer is deciding...`;
            } else {
                resultDiv.textContent += " The game is over!";
                disableUserButtons();
            }

            animateComputerChoice(computerSelection);
        }, 1500);
    });
});



