import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import saveQuizz from "./saveToDb";

interface Quiz {
  name: string;
  description: string;
  questions: {
    questionText: string;
    answers: {
      answerText: string;
      isCorrect: boolean;
    }[];
  }[];
}

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf");

  if (!document || !(document instanceof File)) {
    return NextResponse.json({ error: "PDF file is required" }, { status: 400 });
  }

  try {
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ",
    });
    const docs = await pdfLoader.load();
    const selectDocument = docs.filter((doc) => doc.pageContent !== undefined);
    const texts = selectDocument.map((doc) => doc.pageContent);

    if (texts.length === 0 || texts.join("").trim().length === 0) {
      return NextResponse.json({ error: "PDF appears to be empty or unreadable" }, { status: 400 });
    }

    const prompt = `A partir do texto de um documento fornecido abaixo, gere um quiz.
    
    Instruções Importantes:
    1. Sua resposta DEVE SER APENAS o objeto JSON.
    2. Não inclua nenhum texto, explicação ou formatação markdown como \`\`\`json antes ou depois do JSON.
    3. As answers devem ter 4 alternativas, com apenas 1 sendo correta
    4. O objeto JSON deve ter a seguinte estrutura:
    {
      "name": "string",
      "description": "string",
      "questions": [
        {
          "questionText": "string",
          "answers": [
            {
              "answerText": "string",
              "isCorrect": "boolean"
            }
          ]
        }
      ]
    }
    
    Texto do documento:
    ${texts.join("\n")}
    `;

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: "Google API key not provided" }, { status: 500 });
    }

    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "gemini-1.5-flash",
      temperature: 0.7,
    });

    const parser = new JsonOutputParser<Quiz>();

    const runnable = model.pipe(parser);

    const message = new HumanMessage({
      content: [{ type: "text", text: prompt }],
    });

    const result = await runnable.invoke([message]);
    const { quizzId } = await saveQuizz(result)

    return NextResponse.json({ quizzId }, { status: 200 })

  } catch (e: any) {
    console.error("Error processing quiz generation: ", e);
    if (e.message.includes("Failed to parse")) {
      return NextResponse.json({ error: "Failed to parse JSON from model output. The model may have returned an invalid format.", details: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
