import { LangflowClient } from "@datastax/langflow-client";
export const dsLangflowClient = new LangflowClient({
  langflowId: "002b5959-77b8-4944-8b9a-95106f58d2f5",
  apiKey: process.env.LANGFLOW_API_KEY,
});

export const mainLangflow = dsLangflowClient.flow(
  "d55d747a-a10e-45b4-8883-5fbc88923ef6"
);
