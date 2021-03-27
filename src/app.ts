#!/usr/bin/env node

// Import relevant modules.
const {once} = require('events');
const process = require('process');
const {spawn} = require('child_process');
import {Command, OptionValues} from 'commander';
const chalk = require('chalk');
const ora = require('ora');

/**
 * Process and execute the specified commands.
 * @constructor
 * @param {OptionValues} options - Options containing the commands
 */
async function processAndExecute(options: OptionValues) {
  // Create a variable to control the loop breaking condition.
  let iterationError: boolean = false;
  // Iterate through the commands.
  for (const command of options.commands) {
    // Process the command.
    const cmdArray = command.split(' ');
    const cmdProgram: string = cmdArray[0];
    const cmdArgs: string[] = cmdArray.slice(1);
    // Start the display system.
    const infoSpinner = ora(`Running "${command}"`);
    infoSpinner.color = 'yellow';
    infoSpinner.spinner = 'dots';
    infoSpinner.start();
    // Execute the command.
    const childProcess = spawn(cmdProgram, cmdArgs);
    // Check if the command could be executed.
    childProcess.on('error', () => {
      infoSpinner.stop();
      console.log(chalk.red('Error executing the command "' + command + '"'));
      console.log(chalk.yellow('Hint: ') +
        'The command could not be executed on your terminal. ' +
        'It may be the case that the command was typed incorrectly. ' +
        'Please run if possible the command on its own on your terminal ' +
        'to further investigate the problem.');
      iterationError = true;
    });
    // Evaluate the result of the execution.
    childProcess.on('exit', (exitCode: number) => {
      if (childProcess.stdout || childProcess.stderr) {
        if (exitCode == 0) {
          infoSpinner.succeed();
        } else {
          infoSpinner.fail();
          console.log('Getting output...');
          spawn(cmdProgram, cmdArgs, {stdio: 'inherit'});
          iterationError = true;
        }
      }
    });
    // Wait for the process of the current command to finish.
    try {
      await once(childProcess, 'exit');
    } catch (error) {}
    // Check if the program should be allowed
    // to proceed to the next iteration.
    if (iterationError) {
      break;
    }
  };
}


/** Main function */
function run() {
  // Create a new program handler.
  const program = new Command();
  // Specify the current version.
  program.version('0.1.0');
  // Specify the configuration for the "commands" flag.
  program.requiredOption('-c, --commands <cmd...>', 'Commands to run');
  // Parse the command line arguments.
  program.parse(process.argv);
  const options = program.opts();
  // Process and execute each command.
  processAndExecute(options);
}


// Run the main program.
run();
