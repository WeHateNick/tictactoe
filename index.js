'use strict';

const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const fs          = require('fs');

var player1Symbol, player2Symbol;

var availableCells = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

var boardValues = {
	a1: 'A1',
	a2: 'A2',
	a3: 'A3',
	b1: 'B1',
	b2: 'B2',
	b3: 'B3',
	c1: 'C1',
	c2: 'C2',
	c3: 'C3',
};

let turnOptions = [
	{
	  type: 'list',
	  name: 'cell',
	  message: 'Select a cell where you would like to place your mark',
	  choices: availableCells
	}
];

let playerOptions = [
	{
	  type: 'list',
	  name: 'player',
	  message: 'Which player do you want to be?',
	  choices: ['Player X', 'Player O']
	}
];

function init () {
	clear();
	console.log(
	  chalk.yellow(
	    figlet.textSync('Nick\'s Tic Tac Toe', { horizontalLayout: 'full' })
	  )
	);
	console.log(
	  chalk.yellow('Welcome to Nick\'s Tic Tac Toe')
	);
	inquirer.prompt(playerOptions).then(function (answer) {
		clear();
		console.log(chalk.yellow('Great. You selected', answer.player));
		player1Symbol = answer.player === 'Player X' ? 'X' : 'O';
		startGame();
	})
}
function showBoard () {
	console.log(chalk.yellow(`
		      A    B    C

		    +----+----+----+
		1   | ${boardValues.a1} | ${boardValues.b1} | ${boardValues.c1} |
		    +----+----+----+
		2   | ${boardValues.a2} | ${boardValues.b2} | ${boardValues.c2} |
		    +----+----+----+
		3   | ${boardValues.a3} | ${boardValues.b3} | ${boardValues.c3} |
		    +----+----+----+
	`));
}
function startGame () {
	console.log(chalk.blue(`You\'re up first. Select a place to put your "${player1Symbol}" mark on`));
	showBoard();
	showTurnOptions();
}
function showTurnOptions () {
	inquirer.prompt(turnOptions).then(function (answer) {
		playerTurn(answer.cell.toLowerCase());
	})
}
function playerTurn (cell) {
	console.log(`You selected ${cell}`);
	boardValues[cell] = `${player1Symbol} `;
	showBoard();
}

init();


