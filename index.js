'use strict';

const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const figlet      = require('figlet');
const inquirer    = require('inquirer');
const fs          = require('fs');
const _          	= require('lodash');
const log					= console.log;

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

let thinking = new Spinner('Your opponent is thinking...'); // This just helps simulate the experience of playing with another person

function init () {
	clear();
	log(
	  chalk.yellow(
	    figlet.textSync('Nick\'s Tic Tac Toe', { horizontalLayout: 'full' })
	  )
	);
	log(
	  chalk.yellow('Welcome to Nick\'s Tic Tac Toe')
	);
	inquirer.prompt(playerOptions).then(function (answer) {
		clear();
		log(chalk.yellow('Great. You selected', answer.player));
		if (answer.player === 'Player X') {
			player1Symbol = 'X';
			player2Symbol = '0';
		} else {
			player1Symbol = '0';
			player2Symbol = 'X';
		}
		startGame();
	})
}
function showBoard () {
	log(chalk.yellow(`
		      A    B    C

		    +----+----+----+
		1   | ${chalk.gray(boardValues.a1)} | ${chalk.gray(boardValues.b1)} | ${chalk.gray(boardValues.c1)} |
		    +----+----+----+
		2   | ${chalk.gray(boardValues.a2)} | ${chalk.gray(boardValues.b2)} | ${chalk.gray(boardValues.c2)} |
		    +----+----+----+
		3   | ${chalk.gray(boardValues.a3)} | ${chalk.gray(boardValues.b3)} | ${chalk.gray(boardValues.c3)} |
		    +----+----+----+
	`));
}
function startGame () {
	log(chalk.blue(`You\'re up first. Select a place to put your "${player1Symbol}" mark on`));
	showBoard();
	showTurnOptions();
}
function showTurnOptions () {
	inquirer.prompt(turnOptions).then(function (answer) {
		playerTurn(answer.cell);
	})
}
function playerTurn (cell) {
	boardValues[cell.toLowerCase()] = `${player1Symbol} `;
	_.pull(availableCells, cell)
	log(chalk.blue(`You selected ${chalk.yellow(cell)}`));
	showBoard();
	endPlayerTurn();
}
function endPlayerTurn () {
	thinking.start();
	setTimeout( () => {
		thinking.stop();
		computerTurn();
	}, 6000);
}
function computerTurn () {
	let selection = availableCells.splice(_.random(1, availableCells.length), 1);
	boardValues[selection[0].toLowerCase()] = `${player2Symbol} `;
	log(chalk.red(`Your opponent selected ${chalk.yellow(selection[0])}`));
	showBoard();
}

init();


