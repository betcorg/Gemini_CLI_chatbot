import { GoogleGenerativeAI } from'@google/generative-ai';
import {formatter} from './text-formatter.js';



const geminiPro = 'gemini-pro';

export async function startChat(instructions) {

    try {
        // Creates a new instance of the class GoogleGenerativeAI and configures the api key
        // Get your api key here: https://makersuite.google.com/app/apikey
        // Documentation here:  https://ai.google.dev/docs/
        const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);
        
        // Sets the model to use for the chat
        const model = genAI.getGenerativeModel({ model: geminiPro });
    
        // Model parameters to manipulate the output
        const generationConfig = {
            // stopSequences: ["red"],
            maxOutputTokens: 1200,
            temperature: 0.4,
            // topP: 0.1,
            // topK: 16,
        }
        
        // Inicializes the chat mode that enables history chat and passes the configuration object
        // these two examples work as context to guide the conversation
        const chat = model.startChat({
            history: [
                { role: 'user', parts: instructions },
                { role: 'model', parts: 'ok' },
            ],
            generationConfig,
        });
        return chat;

    } catch (error) {
        console.log(`An error occured while configuring the model ${geminiPro}: `, error.message);
    }
}

// Generates a response from model
export async function getResponse(prompt, chat, history) {

    try {
        // Uses the sendMessageStream() method of the chat object to send the prompt to the model
        // and returns a readable stream.
        // const result = await chat.sendMessageStream(prompt);
        const result = await chat.sendMessage(prompt);
    
        // let text = '';
        // Prints the response from the model to the console chunk by chunk.
        // for await (let chunk of result.stream) {
        //     let chunkText = chunk.text();
        //     // This line convets the markdown output to a terminal readable format with syntax highlighting
        //     console.log(chunkText);
        //     // Concats the chunks
        //     text += chunkText;
        // }

        const text = result.response.text();
        process.stdout.write(formatter(text));
        //process.stdout.write(text);
        // Updates the chat history adding the model response
        const modelResponse = { role: 'model', parts: text };
        [...history, modelResponse];
        return;
        
    } catch (error) {
        console.log(`An error occured while generating a respose from the model ${geminiPro}:`, error.message);
    }

}
