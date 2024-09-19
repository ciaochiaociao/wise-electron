# wise-electron
An edge-AI and LLM powered Smart Assistant for laptops

## Requirements
- Windows 11 OS
- Node.js (20.15.0)
- Yarn package manager

## Installation
Install the app from the release folder (the .exe file).

## Development Environment Setup

### 1. Install Node.js
1. Visit the [official Node.js website](https://nodejs.org/)
2. Download the LTS version for Windows
3. Run the installer and follow the prompts
4. Verify installation by opening a command prompt and running:
   ```bash
   node --version
   ```

### 2. Install Yarn
1. Open a command prompt
2. Run the following command:
   ```bash
   npm install -g yarn
   ```
3. Verify installation by running:
   ```bash
   yarn --version
   ```


### 3. Build from source
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
