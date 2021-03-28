[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/sofienekhiari/baechli/blob/main/LICENSE)

## baechli

### Description

A command-line tool that watches a folder's structure and, on files' changes, run commands in the order they are provided.

![demo_animation](https://github.com/sofienekhiari/baechli/raw/main/demo/demo_animation.gif)

### Installation and usage

The app can be found on [npm](https://www.npmjs.com/package/baechli) and can therefore be installed with the following methods.

#### Global installation

To install the app globally, run this command in your `terminal` app:

```bash
npm install -g baechli
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
npm install --save-dev baechli
```

Then, to run the app, execute the following command:

```bash
npx baechli -c "command 1" "command 2" ...
```

Please refer to the [description](#description) section for an example.
