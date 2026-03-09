import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
        model: google("gemini-3-flash-preview"),
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
// export async function POST(req: Request) {
//     const { text } = await generateText({
//         model: google("gemini-3-flash-preview"),
//         prompt: "What is love?",
//     });

//     return Response.json({
//         success: true,
//         text: text,
//     });
// }
