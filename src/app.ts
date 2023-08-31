import express from "express";
import MindsDB from "mindsdb-js-sdk";
require("dotenv").config();
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://sability-ai.vercel.app/", "https://sability-ai.vercel.app"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectToMindsDB = async () => {
  try {
    await MindsDB.connect({
      user: process.env.MINDS_DB_USER || "",
      password: process.env.MINDS_DB_PASSWORD || "",
    });
    console.log("connected");
  } catch (error) {
    // Failed to connect to local instance
    console.log(error);
  }
};
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/grammar-check", async (req, res) => {
  console.log(req.body.textData);
  const textData = req.body.textData;
  const query = `SELECT response FROM mindsdb.grammar_checker_3 WHERE text="${textData}"`;
  try {
    const queryResult = await MindsDB.SQL.runQuery(query);
    if (queryResult.rows.length > 0) {
      const matchingUserRow = queryResult.rows[0];
      res.status(200).json({ queryResult: matchingUserRow });
    }
  } catch (error) {
    console.error(` ${error}`);
    res.status(500).send(` ${error}`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectToMindsDB();
  console.log(`Server is running on port ${PORT}`);
});
