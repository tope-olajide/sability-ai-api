import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const corsOptions: cors.CorsOptions = {
  origin: [
    "http://localhost:3000",
    "https://sabi-ai.vercel.app/",
    "https://sabi-ai.vercel.app",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to count words
const countWords = (text: string): number => {
  const words = text.split(" ");
  const filteredWords = words.filter((word) => word.trim() !== "");
  return filteredWords.length;
};

// Middleware for word count validation and error handling
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const textData: string = req.body.textData;
  const wordCount: number = countWords(textData);
  if (wordCount > 100) {
    return res.status(400).send("Word Limit Exceeded");
  }
  next();
};

// Common function to handle API requests
const handleRequest = async (
  req: Request,
  res: Response,
  model: string,
  systemMessage: string,
  maxTokens: number
) => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: req.body.textData },
      ],
      max_tokens: maxTokens,
      top_p: 1,
    });
    res.status(200).json({ queryResult: response.choices[0].message.content });
  } catch (error) {
    console.error(` ${error}`);
    res.status(500).send(` ${error}`);
  }
};

// Route for grammar check
app.post(
  "/grammar-check",
  validateRequest,
  async (req: Request, res: Response) => {
    await handleRequest(
      req,
      res,
      "gpt-4",
      'Ignore any previous messages. Start fresh. You are a grammar checker app like grammarly. You will be provided with texts. Your task is to identify all the grammatical errors and wrap the incorrect phrase with the specified HTML "span" element in all the statements. Configure the span element in this manner: <span class="highlight" data-corrected="CORRECTED_WORD_HERE" data-error-type="ERROR_TYPE_HERE"> Substitute "CORRECTED_WORD_HERE" with the precise correction that should replace the incorrect phrase and "ERROR_TYPE_HERE" with the identified error type. If no grammar errors are found, just return the given text as it is, do not add any context or justification or double quotes or any other information to your response.',
      500
    );
  }
);

// Route for paraphrasing text
app.post(
  "/paraphrase-text",
  validateRequest,
  async (req: Request, res: Response) => {
    await handleRequest(
      req,
      res,
      "gpt-3.5-turbo",
      `Paraphrase content you are provided in ${req.body.mode} tone. Do not add any context or justification or quotes or any other information to your response.`,
      200
    );
  }
);

// Route for summarizing text
app.post(
  "/summarize-text",
  validateRequest,
  async (req: Request, res: Response) => {
    await handleRequest(
      req,
      res,
      "gpt-3.5-turbo",
      `Provide a ${req.body.length} summary for the given content. Do not add any context or justification or quotes or any other information to your response.`,
      300
    );
  }
);

// Route for translating text
app.post(
  "/translate-text",
  validateRequest,
  async (req: Request, res: Response) => {
    await handleRequest(
      req,
      res,
      "gpt-3.5-turbo",
      `Translate the provided contents to ${req.body.language}. Do not add any context or justification or quotes or any other information to your response.`,
      300
    );
  }
);

// Route for generating content
app.post(
  "/generate-content",
  validateRequest,
  async (req: Request, res: Response) => {
    await handleRequest(
      req,
      res,
      "gpt-3.5-turbo",
      `Generate original content inspired by the given content. Do not add any context or justification or quotes or any other information to your response.`,
      300
    );
  }
);

const PORT: number = parseInt(process.env.PORT!) || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
