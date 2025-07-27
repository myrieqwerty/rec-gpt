require("dotenv").config();

const express = require("express");
const cors = require("cors");

const openai = require("openai");

const PORT = process.env.BACKEND_PORT;

const app = express();
app.use(express.json());
app.use(cors());

const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

app.get("/", async (req, res) => {
  res.send({ hello: "world" });
});

app.post("/", async (req, res) => {
  const q = req.query.q;

  if (!q) {
    res.status(400).send({
      error: "Empty query",
    });
  }

  try {
    const response = await client.responses.create({
      model: "chatgpt-4o-latest",
      instructions: "Работай в обычном вежливом режиме",
      input: q,
    });

    res.status(200).send({
      response: response.output_text,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error: " +
      error.error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("it work on port:", PORT);
});
