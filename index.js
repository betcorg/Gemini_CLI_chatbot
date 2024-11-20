import 'dotenv/config';
import readline from'readline';
import * as gemini from'./src/gemini.js';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Initializes a command line interface using readline and a promise that gets resolved when enter an input prompt
async function prompt() {
    return new Promise((resolve) => {
        rl.question(chalk.bold.green('\nGemini >>> '), (answer) => {
            resolve(answer);
        });
    });
}

// Starts de chatbot
async function run() {

    // Initializes the chat mode
    const chat = await gemini.startChat();

    // Shortcut of the history array
    let history = chat.params.history;

    let isPromptAlive = true;
    while (isPromptAlive) {
        // Gets a prompt from the user and adds it to the history array.
        const question = await prompt();
        console.log('\n');

        // some input validation...

        const userQuestion = { role: 'user', parts: question };
        [...history, userQuestion];

        // Gets a response from the model and prints it to the console.
        await gemini.getResponse(question, chat, history);
    }
}

run();
