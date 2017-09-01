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

let player1Symbol, player2Symbol, 
		availableCells = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
		boardValues = {
			a1: 'A1',
			a2: 'A2',
			a3: 'A3',
			b1: 'B1',
			b2: 'B2',
			b3: 'B3',
			c1: 'C1',
			c2: 'C2',
			c3: 'C3',
		},
		winningStrategies = [
			['a1', 'b1', 'c1'],
			['a2', 'b2', 'c2'],
			['a3', 'b3', 'c3'],
			['a1', 'a2', 'a3'],
			['b1', 'b2', 'b3'],
			['c1', 'c2', 'c3'],
			['a1', 'b2', 'c3'],
			['c1', 'b2', 'a3']
		];

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
		log(chalk.yellow('Great. You selected', chalk.blue(answer.player)));
		if (answer.player === 'Player X') {
			player1Symbol = 'X';
			player2Symbol = 'O';
		} else {
			player1Symbol = 'O';
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
function showTurnOptions () {
	inquirer.prompt(turnOptions).then(function (answer) {
		playerTurn(answer.cell);
	})
}
function startGame () {
	log(chalk.yellow(`You\'re up first. Select a place to put your "${chalk.blue(player1Symbol)}" mark on`));
	showBoard();
	showTurnOptions();
}
function referee (_callback) {
	// Check if there is a winner or a draw
	winningStrategies.forEach( (strategy) => {
		if (!availableCells.length) {
			endGame('draw');
		}
		if ( 	boardValues[strategy[0]] === boardValues[strategy[1]] && 
					boardValues[strategy[0]] === boardValues[strategy[2]] ) {
			endGame(boardValues[strategy[0]]);
			return;
		}
	});
	showBoard();
	_callback();
}
function endGame (symbol) {
	if (symbol === 'draw') {
		console.log(
			chalk.yellow(
				figlet.textSync(`Draw`, { horizontalLayout: 'full' })
			)
		);
	} else {
		console.log(
			chalk.yellow(
				figlet.textSync(`Player ${symbol} won!`, { horizontalLayout: 'full' })
			)
		);
	}
}
function playerTurn (cell) {
	boardValues[cell.toLowerCase()] = `${player1Symbol} `;
	_.pull(availableCells, cell)
	log(chalk.yellow(`You selected ${chalk.blue(cell)}`));
	referee( () => { endPlayerTurn(); });
}
function endPlayerTurn () {
	thinking.start();
	setTimeout( () => {
		thinking.stop();
		computerTurn();
	}, 6000);
}
function computerTurn () {
	let selection = availableCells.splice(_.random(0, availableCells.length -1), 1);
	boardValues[selection[0].toLowerCase()] = `${player2Symbol} `;
	log(chalk.yellow(`Your opponent selected ${chalk.red(selection[0])}`));
	referee( () => { nextTurn(); });
}
function nextTurn () {
	log(chalk.blue(`You\'re up again. Select a place to put your "${chalk.yellow(player1Symbol)}" mark on`));
	showTurnOptions();
}

init();


