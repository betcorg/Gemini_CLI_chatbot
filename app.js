require('dotenv/config');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//  Creates a new instance of the class GoogleGenerativeAI and configures the api key
const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);

// Sets the model to use for the chat
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Model parameters to manipulate the output
// https://ai.google.dev/docs/concepts?hl=es-419#model_parameters
const generationConfig = {
    // stopSequences: ["red"],
    maxOutputTokens: 600,
    temperature: 0.9,
    // topP: 0.1,
    // topK: 16,
};

// Inicializes the chat mode that enables history chat and passes the configuration object
const chat = model.startChat({
    history: [],
    generationConfig
});


// Shortcut of the history array
let history = chat.params.history;

// Initializes a command line interface using readline and a promise that gets resolved when enter an input prompt
async function prompt() {
    return new Promise((resolve) => {
        rl.question('\ngemini >>> ', (answer) => {
            resolve(answer);
        });
    });
}

// Generates a response from model
async function getResponse(prompt) {

    // uses the sendMessage() method of the chat object to send the prompt to the model
    // and returns a promise that resolves to the response from the model.
    // then, add the model response to the history array and return the response.
    const result = await chat.sendMessage(prompt);
    const response = result.response.text();
    const modelResponse = { role: 'model', parts: response }
    history = [...history, modelResponse];
    return response;
}

async function run() {

    let isPromptAlive = true;
    while (isPromptAlive) {
        // Gets a prompt from the user and adds it to the history array.
        const question = await prompt();
        const userQuestion = { role: 'user', parts: question };
        history = [...history, userQuestion];

        // Gets a response from the model and prints it to the console.
        const response = await getResponse(question);
        console.log('\x1b[32m%s\x1b[0m', `\n${response}\n`);
    }
}

run();