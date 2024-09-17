# wise-electron
 An edge-AI and LLM powered Smart Assistant in laptop

## Requirements
- Windows 11 OS

## Development
```bash
$ yarn
$ yarn dev
```

## Install
Install the app from the release folder (the .exe file).


## Build from source
It is useful to build from source if you want to use a custom OpenAI API key, or the key is not valid anymore.

Set the OpenAI API key in the .env file with the following format:
```bash
VITE_OPENAI_API_KEY=<your-openai-api-key>
```
Note how VITE_OPENAI_API_KEY is prefixed with VITE_.

```bash
$ yarn
$ yarn build
```

Sometimes, you may need to clean the cache and rebuild the app:
```bash
$ yarn cache clean
$ yarn
$ yarn build
```

or set the ssl strict rule to false:
```bash
$ yarn config set strict-ssl false
```
as needed.
