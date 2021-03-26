// Import relevant modules
import {Command} from 'commander';

// Create a new program handler
const program = new Command();

// Specify the current version
program.version('0.1.0');

// Specify the configuration for the "commands" flag
program.requiredOption('-c, --commands <cmd...>', 'Commands to run');

// Parse the command line arguments
program.parse(process.argv);
const options = program.opts();

// Process and log each command
options.commands.forEach(function(cmd: string) {
  const cmdArray = cmd.split(' ');
  const cmdProgram: string = cmdArray[0];
  const cmdArgs: string[] = cmdArray.slice(1);
  console.log(`${cmdProgram} | ${cmdArgs}`);
});
