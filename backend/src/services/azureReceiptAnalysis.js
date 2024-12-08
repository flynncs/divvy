const DocumentIntelligence =
  require("@azure-rest/ai-document-intelligence").default;
const {
  getLongRunningPoller,
  isUnexpected,
} = require("@azure-rest/ai-document-intelligence");
const { AzureKeyCredential } = require("@azure/core-auth");

const key = process.env["DI_KEY"];
const endpoint = process.env["DI_ENDPOINT"];

const client = DocumentIntelligence(endpoint, new AzureKeyCredential(key));

const analyzeReceipt = async (url) => {
  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
    .post({
      contentType: "application/json",
      body: {
        urlSource: url,
      },
    });

  if (isUnexpected(initialResponse)) {
    console.error("Error analyzing receipt:", initialResponse.body.error);
    throw new Error(initialResponse.body.error || "Unknown error");
  }

  const poller = await getLongRunningPoller(client, initialResponse);

  const analyzeResult = (await poller.pollUntilDone()).body.analyzeResult;

  const documents = analyzeResult?.documents;

  const result = documents && documents[0];

  if (!result) {
    throw new Error("No results found");
  }

  return result;
};

module.exports = {
  analyzeReceipt,
};
