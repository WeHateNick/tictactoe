'use strict';

const chalk       = require('chalk');
const clear       = require('clear');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const figlet      = require('figlet');
const inquirer    = require('inquirer');
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
	  message: 'Select a cell',
	  choices: availableCells
	}
];

let playerOptions = [
	{
	  type: 'list',
	  name: 'player',
	  message: 'Choose player:',
	  choices: ['Player X', 'Player O']
	}
];

let thinking = new Spinner('Your opponent is thinking...'); // This just helps simulate the experience of playing with another person

function init () {
	clear();
	log(chalk.yellow(
    figlet.textSync('Nick\'s Tic Tac Toe', { horizontalLayout: 'full' })
	));
	log(chalk.yellow(
		'Welcome to Nick\'s Tic Tac Toe'
	));
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
let getBoardValue = (val) => {
	let value = boardValues[val];
	if (value[0] === player1Symbol) {
		return chalk.blue(value);
	} else if (value[0] === player2Symbol) {
		return chalk.red(value);
	} else {
		return chalk.gray(value);
	}
};
function showBoard () {
	log(chalk.yellow(`
		      A    B    C

		    +----+----+----+
		1   | ${getBoardValue('a1')} | ${getBoardValue('b1')} | ${getBoardValue('c1')} |
		    +----+----+----+
		2   | ${getBoardValue('a2')} | ${getBoardValue('b2')} | ${getBoardValue('c2')} |
		    +----+----+----+
		3   | ${getBoardValue('a3')} | ${getBoardValue('b3')} | ${getBoardValue('c3')} |
		    +----+----+----+
	`));
}
function showTurnOptions () {
	inquirer.prompt(turnOptions).then(function (answer) {
		makePlay(answer.cell);
	})
}
function startGame () {
	log(chalk.yellow(`You\'re up first. Select a cell to put your "${chalk.blue(player1Symbol)}" mark on`));
	showBoard();
	showTurnOptions();
}
function makePlay (cell) {
	boardValues[cell.toLowerCase()] = `${player1Symbol} `;
	_.pull(availableCells, cell)
	clear();
	log(chalk.yellow(`You selected ${chalk.blue(cell)}`));
	referee( () => { computerTurn(); });
}
function computerTurn () {
	thinking.start();
	let selection = availableCells.splice(_.random(0, availableCells.length -1), 1);
	boardValues[selection[0].toLowerCase()] = `${player2Symbol} `;
	setTimeout( () => {
		thinking.stop();
		clear();
		log(chalk.yellow(`Your opponent selected ${chalk.red(selection[0])}`));
		referee( () => { nextTurn(); });
	}, 4000);
}
function nextTurn () {
	log(chalk.blue(`You\'re up again. Select a cell to put your "${chalk.yellow(player1Symbol)}" mark on`));
	showTurnOptions();
}
function referee (_callback) {
	// Check if there is a winner or a draw
	let gameEnded = false;

	winningStrategies.forEach( (strategy) => {
		if ( 	
				boardValues[strategy[0]] === boardValues[strategy[1]] && 
				boardValues[strategy[0]] === boardValues[strategy[2]] 
		) {
			gameEnded = true;
			endGame(boardValues[strategy[0]]); // Passing the winner's symbol
		}
	});

	if (!gameEnded && !availableCells.length) {
		endGame('draw');
	} else if (!gameEnded) {
		showBoard();
		_callback();
	}
}
function endGame (winner) {
	showBoard();
	if (winner === 'draw') {
		log(chalk.yellow(
			figlet.textSync(`Draw`, { horizontalLayout: 'full' })
		));
	} else {
		log(chalk.yellow(
			figlet.textSync(`Player ${winner} won!`, { horizontalLayout: 'full' })
		));
	}
}

init();


