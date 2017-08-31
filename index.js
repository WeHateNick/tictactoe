'use strict';

const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const fs          = require('fs');

var board = `
	      A    B    C

	    +----+----+----+
	1   | A1 | B1 | C1 |
	    +----+----+----+
	2   | A2 | B2 | C2 |
	    +----+----+----+
	3   | A3 | B3 | C3 |
	    +----+----+----+
`
var availableCells = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

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
		startGame();
	})
}
function showTurnOptions () {
	inquirer.prompt(turnOptions).then(function (answer) {

	})
}

function startGame () {
	console.log(chalk.blue('You\'re up first. Select a place to put your mark on'));
	console.log(chalk.grey(board));
	showTurnOptions();
}

init();


