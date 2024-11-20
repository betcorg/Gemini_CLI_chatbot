import { GoogleGenerativeAI } from'@google/generative-ai';
import {formatter} from './text-formatter.js';

// Get your api key here: https://makersuite.google.com/app/apikey
// Documentation here:  https://ai.google.dev/docs/

export async function startChat() {

    const geminiPro = 'gemini-1.5-pro-latest';
    const instructions = "Eres un experto en Javascript/Nodejs, te especializas en tecnologías relacionadas al stack MERN pero tienes conocimientod generales amplios sobre desarrollo de software en el backend y en el frontend. Proporciona ejemplos de código cuando se solicite formateandolo correctamente en Markdown y especificando el lenguaje del código, por ejemplo: \`\`\` javscript\nconsole.log('Hola mundo')\n\`\`\`"
    
    try {
        const genAI = new GoogleGenerativeAI(process.env.G_API_KEY);
        
        const model = genAI.getGenerativeModel({ model: geminiPro });
    
        // Model parameters to manipulate the output
        const generationConfig = {
            // stopSequences: ["red"],
            maxOutputTokens: 1200,
            temperature: 0.4,
            // topP: 0.1,
            // topK: 16,
        }

        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{text: instructions}] },
                { role: 'model', parts: [{text:'ok'}] },
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

        const result = await chat.sendMessage(prompt);
        const text = result.response.text();
        process.stdout.write(formatter(text));
        const modelResponse = { role: 'model', parts: [{text}] };
        [...history, modelResponse];
	//console.log(history);
        return;
        
    } catch (error) {
        console.log(`An error occured while generating a respose from the model ${geminiPro}:`, error.message);
    }

}
