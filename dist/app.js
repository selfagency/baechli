#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import relevant modules.
var once = require('events').once;
var process = require('process');
var spawn = require('child_process').spawn;
var commander_1 = require("commander");
var chalk = require('chalk');
var ora = require('ora');
var chokidar = require('chokidar');
var sleep = require('sleep');
/**
 * Process and execute the specified commands.
 * @constructor
 * @param {OptionValues} options - Options containing the commands
 */
function processAndExecute(options) {
    return __awaiter(this, void 0, void 0, function () {
        var iterationError, _loop_1, _i, _a, command, state_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    iterationError = false;
                    _loop_1 = function (command) {
                        var cmdArray, cmdProgram, cmdArgs, infoSpinner, childProcess, error_1;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    cmdArray = command.split(' ');
                                    cmdProgram = cmdArray[0];
                                    cmdArgs = cmdArray.slice(1);
                                    infoSpinner = ora("Running \"" + command + "\"");
                                    infoSpinner.color = 'yellow';
                                    infoSpinner.spinner = 'dots';
                                    infoSpinner.start();
                                    childProcess = spawn(cmdProgram, cmdArgs);
                                    // Check if the command could be executed.
                                    childProcess.on('error', function () {
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
                                    childProcess.on('exit', function (exitCode) {
                                        if (childProcess.stdout || childProcess.stderr) {
                                            if (exitCode == 0) {
                                                infoSpinner.succeed();
                                            }
                                            else {
                                                infoSpinner.fail();
                                                spawn(cmdProgram, cmdArgs, { stdio: 'inherit' });
                                                iterationError = true;
                                            }
                                        }
                                    });
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, once(childProcess, 'exit')];
                                case 2:
                                    _c.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _c.sent();
                                    return [3 /*break*/, 4];
                                case 4:
                                    // Check if the program should be allowed
                                    // to proceed to the next iteration.
                                    if (iterationError) {
                                        return [2 /*return*/, "break"];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = options.commands;
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    command = _a[_i];
                    return [5 /*yield**/, _loop_1(command)];
                case 2:
                    state_1 = _b.sent();
                    if (state_1 === "break")
                        return [3 /*break*/, 4];
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
/** Main function */
function run() {
    var _this = this;
    // Create a new program handler.
    var program = new commander_1.Command();
    // Specify the current version.
    program.version('0.1.0');
    // Specify the configuration for the "commands" flag.
    program.requiredOption('-c, --commands <cmd...>', 'Commands to run');
    // Parse the command line arguments.
    program.parse(process.argv);
    var options = program.opts();
    // Watch files and process and execute
    // each command on change.
    var waitSpinner = ora('Waiting for changes...');
    waitSpinner.color = 'green';
    waitSpinner.spinner = {
        interval: 1000,
        frames: ['●', '○'],
    };
    var watcher = chokidar.watch('.');
    console.clear();
    waitSpinner.start();
    watcher.on('change', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    waitSpinner.stop();
                    console.clear();
                    return [4 /*yield*/, watcher.unwatch('.')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, processAndExecute(options)];
                case 2:
                    _a.sent();
                    waitSpinner.color = 'yellow';
                    waitSpinner.text = 'Please wait...';
                    waitSpinner.start();
                    sleep.sleep(6);
                    watcher.add('.');
                    waitSpinner.color = 'green';
                    waitSpinner.text = 'Waiting for changes...';
                    return [2 /*return*/];
            }
        });
    }); });
}
// Run the main program.
run();
