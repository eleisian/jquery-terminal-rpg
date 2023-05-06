const messages = [
  "Let's begin.",
  "Rock.",
  "Paper.",
  "Scissors.",
  "Shoot!\n",
];

const greetingCard = [
  "Hello! Welcome to my rock paper scissors computer",
  "You will really feel like a hackerman playing this version of rock paper scissors",
  "To start just type 'Play' or /help if you need assistance."
];

const greeting = greetingCard.join("\n");

function computerPlayer() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

async function animateMessages(terminal, messages) {
  for (let message of messages) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    terminal.echo(message);
  }
}

async function playGame(terminal) {
  let playerWinCount = 0;
  let computerWinCount = 0;
  for (let i = 0; i < 5; i++) {
    terminal.echo(`\nRound ${i + 1}:`);
    await new Promise((resolve) => setTimeout(resolve, 200));
    await animateMessages(terminal, messages);
    let playerSelection = await terminal.read(
      `Please enter your selection (rock, paper, scissors): \n> `
    );
    if (!["rock", "paper", "scissors"].includes(playerSelection.toLowerCase())) {
      terminal.echo("Invalid selection. Please try again.");
      i--;
      continue;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const computerSelection = computerPlayer();
    terminal.echo(`\nThe computer chooses ${computerSelection}\n`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    let winner = calculateWinner(
      terminal,
      playerSelection.toLowerCase(),
      computerSelection
    );
    if (winner === "player") {
      playerWinCount++;
    } else if (winner === "computer") {
      computerWinCount++;
    }
  }
  terminal.echo(`Player wins: ${playerWinCount}`);
  terminal.echo(`Computer wins: ${computerWinCount}`);
  if(computerWinCount > playerWinCount){
    terminal.echo("The Computer wins the series.")
  }
  else if(computerWinCount < playerWinCount){
    terminal.echo("The Player wins the series.")
  }
  else {
    terminal.echo("It's a tie!")
  }

}


function calculateWinner(terminal, playerSelection, computerSelection) {
  if (
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "paper" && computerSelection == "rock") ||
    (playerSelection == "scissors" && computerSelection == "paper")
  ) {
    terminal.echo("You WIN!");
    return "player";
  } else if (playerSelection == computerSelection) {
    terminal.echo("WOW, it's a tie!");
    return "tie";
  } else {
    terminal.echo("You LOSE!");
    return "computer";
  }
}

$("#terminal").terminal(
  async function (command, terminal) {
    if (command === "play" || command === "Play") {
      playGame(terminal);
    } else if (command === "/help") {
      terminal.echo("If you're having trouble, just type 'Play' to start a game!");
    } else {
      terminal.echo("That is an invalid command type /help for more information.")
      /*const prompt = `User input: ${command}\nAI response:`;
      const response = await fetch(
        `https://api.openai.com/v1/completions`,
        {
          body: JSON.stringify({
            "model": "text-davinci-002",
            "prompt": "you angry because someone keeps inputting the wrong command",
            "temperature": 0.7,
            "max_tokens": 128,
            "stop": ["\n"]
          }),
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer API_KEY`,
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        const text = json.choices[0].text.trim();
        terminal.echo(text);
      } else {
        terminal.echo("Error fetching response from OpenAI API.");
      }*/
    }
  },
  {
    greetings: greeting,
    height: 400,
    width: 800,
    prompt: "> "
  }
);

