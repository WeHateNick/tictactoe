'use strict';

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var fs          = require('fs');


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
		console.log(chalk.yellow('Great. You selected', answer.player));
	})
}
init();


