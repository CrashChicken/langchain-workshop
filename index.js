import { ChatOpenAI } from "langchain/chat_models";

import { config } from "dotenv";
import promptSync from "prompt-sync";
import { chat } from "./01-chat.js";
import { analyzeDocument } from "./02-document.js";
config();
const prompt = promptSync({ sigint: true });

const openAIApiKey = process.env.OPENAI_API_KEY;

if (!openAIApiKey) {
  throw new Error("No API key found, please set OPENAI_API_KEY in .env file.");
}

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.9,
  openAIApiKey,
});

async function main() {
  const input = prompt("Select example number: ");
  switch (input) {
    case "1":
      await chat(model);
      break;
    case "2":
      await analyzeDocument(model);
      break;
    default:
      console.log("Invalid input");
  }
}

main();
