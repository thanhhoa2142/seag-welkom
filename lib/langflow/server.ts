import { LangflowClient } from "@datastax/langflow-client";
export const dsLangflowClient = new LangflowClient({
  langflowId: "002b5959-77b8-4944-8b9a-95106f58d2f5",
  apiKey: process.env.LANGFLOW_API_KEY,
});

export const mainLangflow = dsLangflowClient.flow(
  "94f4fe19-a4e9-49de-a274-de2f0b747103"
);
