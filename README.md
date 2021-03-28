[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/sofienekhiari/baechli/blob/main/LICENSE)

## baechli

### Description

A command-line tool that watches a folder's structure and, on files' changes, run provided commands.

![demo_animation](https://github.com/sofienekhiari/baechli/raw/main/demo/demo_animation.gif)

### Instalation and usage

The app hasn't been published on npm yet, so the best way to get it is to follow these steps.

#### Global installation

To install the app globally, run this command in your `terminal` app:

```bash
npm install -g git+https://github.com/sofienekhiari/baechli.git
```

Then, to run the app, execute the following command:

```bash
baechli -c "command 1" "command 2" ...
```

Please refer to the [description](#description) section for an example.

#### Local installation

To install the app locally (only for your current project), follow these steps:
- make sure that you have a proper `package.json` file in your project;
- open your `terminal` app and navigate to your project's directory;
- execute the following command in your terminal app.

```bash
npm install --save-dev git+https://github.com/sofienekhiari/baechli.git
```

Then, to run the app, execute the following command:

```bash
npx baechli -c "command 1" "command 2" ...
```

Please refer to the [description](#description) section for an example.
