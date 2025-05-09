const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);

//error
  app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      });
  
      res.json({ reply: response.choices[0].message.content });
    } catch (err) {
      console.error("OpenAI Error:", err?.response?.data);
  
      res.status(500).json({
        error: err?.response?.data?.error?.message || "Server error",
      });
    }
  });
  

});
