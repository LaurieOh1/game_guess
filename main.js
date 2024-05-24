#!/usr/bin/node
import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import readlineSync from "readline-sync";

// Array of Objects with the differents characters
const persons = [
  { name: "Laurie", hairType: "curly", hairColor: "black", glasses: false },
  { name: "Suzanne", hairType: "straight", hairColor: "white", glasses: true },
  { name: "Selim", hairType: "curly", hairColor: "brown", glasses: true },
  { name: "Bruno", hairType: "straight", hairColor: "blond", glasses: false },
];

const randomCharactere = persons[Math.floor(Math.random() * persons.length)];

const questions = [
  { question: "Is the hair curly ?", key: "hairType", value: "curly" },
  { question: "Is the hair straight ?", key: "hairType", value: "straight" },
  { question: "Is the hair curly ?", key: "hairType", value: "curly" },
  { question: "Is the hair straight ?", key: "hairType", value: "straight" },
  { question: "Is the hair black ?", key: "hairColor", value: "black" },
  { question: "Is the hair brown ?", key: "hairColor", value: "brown" },
  { question: "Is the hair blond ?", key: "hairColor", value: "blond" },
  { question: "Is the hair white ?", key: "hairColor", value: "white" },
  { question: "Does the person wear glasses ?", key: "glasses", value: true },
  {
    question: "Does the person not wear glasses",
    key: "glasses",
    value: false,
  },
];

let numberOfTries = 0;
let maxTries = 6;
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Guess Who ?");
  await sleep();
  rainbowTitle.stop();
  console.log(`${chalk.bgRed.bold("HOW TO PLAY")}
Look at the differents characters 
Choose a Yes or No question and guess which of those different persons is the hidden chosen  ${chalk.bgYellowBright(
    "character"
  )} \n
You'll get 5 tries`);
}

await welcome();

async function askName() {
  const userName = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name ?",
    default() {
      return "Player";
    },
  });
  playerName = userName.player_name;
}

await askName();

console.log(persons);

while (numberOfTries < maxTries) {
  const questionIndex = readlineSync.keyInSelect(
    questions.map((q) => q.question),
    "choose a question "
  );
  if (questionIndex === -1) {
    console.log("Exit");
    break;
  }
  const quest = questions[questionIndex];
  const answer = randomCharactere[quest.key] === quest.value;
  console.log(answer ? "Yes" : "No");
  numberOfTries += 1;

  const finalAnswer = readlineSync.question("Who is the person ? ");

  if (
    finalAnswer.toLocaleLowerCase() ===
    randomCharactere.name.toLocaleLowerCase()
  ) {
    console.log(`Congratulation ${playerName} ! You are correct`);
    break;
  } else {
    console.log("Try again");
  }
}

if (numberOfTries === maxTries) {
  console.log("Game Over! try again!");
}
