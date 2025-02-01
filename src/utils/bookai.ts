import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"
import { Airesp } from './types'; 

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey:import.meta.env.VITE_AI_KEY,
    dangerouslyAllowBrowser:true
  });


export const messages:ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: `Conversational AI that recomend books to be read by user.
    please expect user input is containing about what kind of book they want to read , author , or title
    otherwise make validUserInput falsy. Your response must be string in format with 
    this type {"content" : [{"title":string,"numberOfPages":number,"author":string,"isbn":string}] , "validUserInput" : boolean}
    you can respond max 10 books`
  }
]


export async function fetchAiResponse(inputText:string){
  try {
    messages.push({ role: "user", content: inputText })
    
    const response =await client.chat.completions.create({
        messages:messages,
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
    })
    
    const respContentRaw=response.choices[0].message.content
    // console.log(respContentRaw)
    if(respContentRaw){
        const respContent = JSON.parse(respContentRaw) as Airesp
        return {respContent};
    }else{
        throw new Error("something wrong in parsing respond")
    }

  } catch (error) {
    console.log(error);
    return {respContent:null};
  }
};