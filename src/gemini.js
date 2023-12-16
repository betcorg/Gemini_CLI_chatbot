const { GoogleGenerativeAI } = require('@google/generative-ai');
const toText = require('./toPlainText');

//  Creates a new instance of the class GoogleGenerativeAI and configures the api key
const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);

// Sets the model to use for the chat
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });


async function startChat() {

    // Model parameters to manipulate the output
    // https://ai.google.dev/docs/concepts?hl=es-419#model_parameters
    const generationConfig = {
        // stopSequences: ["red"],
        maxOutputTokens: 1200,
        temperature: 0.9,
        // topP: 0.1,
        // topK: 16,
    };
    
    // Inicializes the chat mode that enables history chat and passes the configuration object
    const chat = model.startChat({
        history: [
            { role: 'user', parts: "Actúa como un experto en desarrollo de software con nodejs" },
            { role: 'model', parts: 'De acuerdo, estaré atento a tus preguntas' },
        ],
        generationConfig,
    });
    return chat;
};

// Generates a response from model
async function getResponse(prompt, chat, history) {

    // uses the sendMessage() method of the chat object to send the prompt to the model
    // and returns a promise that resolves to the response from the model.
    // then, add the model response to the history array and return the response.
    const result = await chat.sendMessageStream(prompt);

    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log('\x1b[34m%s\x1b[0m', toText(chunkText));
        text += chunkText;
    }
    const modelResponse = { role: 'model', parts: text };
    [...history, modelResponse];
    return;
}

module.exports = { 
    startChat,
    getResponse, 
};