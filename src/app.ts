// Import relevant modules
import {Command} from 'commander';
const {spawn} = require('child_process');
const process = require('process');

// Create a new program handler
const program = new Command();

// Specify the current version
program.version('0.1.0');

// Specify the configuration for the "commands" flag
program.requiredOption('-c, --commands <cmd...>', 'Commands to run');

// Parse the command line arguments
program.parse(process.argv);
const options = program.opts();

// Process and execute each command
options.commands.forEach(function(cmd: string) {
  // Process the command
  const cmdArray = cmd.split(' ');
  const cmdProgram: string = cmdArray[0];
  const cmdArgs: string[] = cmdArray.slice(1);

  // Execute the command
  // process.stdout.write(`Info: Running "${cmd}" ...`);
  const childProcess = spawn(cmdProgram, cmdArgs);
  // process.stdout.write('\r\x1b[K');
  // process.stdout.write(`Info: Running "${cmd}" ... done.\n`);

  // Handle execution errors
  childProcess.on('error', function() {
    console.log('Error executing the command "' + cmd + '"');
  });

  // Handle the exit conditions
  childProcess.on('exit', function(exitCode: number, exitSignal: string) {
    if (exitCode == 0) {
      childProcess.stdout.on('data', (data: string) => {
        console.log(`${data}`);
      });
    } else {
      childProcess.stderr.on('data', (data: string) => {
        console.error(`${data}`);
      });
    }
  });
});
