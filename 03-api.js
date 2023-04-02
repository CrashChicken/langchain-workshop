import promptSync from "prompt-sync";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { JsonSpec } from "langchain/tools";
import { createOpenApiAgent, OpenApiToolkit } from "langchain/agents";

export async function apiCalls(model) {
  const prompt = promptSync({ sigint: true });
  let data;
  try {
    const yamlFile = fs.readFileSync("files/tsw-api.yaml", "utf8");
    data = yaml.load(yamlFile);
    if (!data) {
      throw new Error("Failed to load OpenAPI spec");
    }
  } catch (e) {
    console.error(e);
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TSW_API_KEY}`,
  };

  const toolkit = new OpenApiToolkit(new JsonSpec(data), model, headers);
  const executor = createOpenApiAgent(model, toolkit);

  const input = prompt("Enter command: ");
  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });
  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );
}
