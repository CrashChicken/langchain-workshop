import { ChatOpenAI } from "langchain/chat_models";
import {
  AIChatMessage,
  HumanChatMessage,
  SystemChatMessage,
} from "langchain/schema";
import promptSync from "prompt-sync";

export async function chat(model: ChatOpenAI) {
  const prompt = promptSync();

  const messages = [
    new SystemChatMessage(
      "You are a teacher helping a student with their questions."
    ),
  ];

  while (true) {
    const input = prompt("You: ");
    if (input === "q") break;
    messages.push(new HumanChatMessage(input));
    const response = await model.call(messages);
    messages.push(new AIChatMessage(response.text));
    console.log(`AI: ${response.text}`);
  }
  console.log("Bye!");
}