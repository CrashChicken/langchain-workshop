import { readFileSync } from "fs";
import { AnalyzeDocumentChain, loadSummarizationChain } from "langchain/chains";

export async function analyzeDocument(model) {
  const text = readFileSync("files/text.txt", "utf8");

  const combineDocsChain = loadSummarizationChain(model);
  const chain = new AnalyzeDocumentChain({
    combineDocumentsChain: combineDocsChain,
  });
  const res = await chain.call({
    input_document: docs[0],
  });

  console.log(res.text);
}
