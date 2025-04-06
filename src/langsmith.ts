import { Client } from "langsmith";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


console.log("LangSmith API Key:", process.env.LANGSMITH_API_KEY);

const client = new Client({
  apiKey: process.env.LANGSMITH_API_KEY,
});

export async function fetchLatestTrace(projectName: string) {
  const runsIter = client.listRuns({
    projectName,
    executionOrder: 1,
    limit: 1
  });

  const runs = [];
  for await (const run of runsIter) {
    runs.push(run);
  }

  if (runs.length === 0) {
    throw new Error("No traces found in this project.");
  }

  return runs[0];
}
