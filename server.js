require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// إعداد الذكاء الاصطناعي (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// نقطة استقبال الطلبات من الواجهة
app.post("/api/explain", async (req, res) => {
  try {
    const { code } = req.body;

    // إعداد نموذج الذكاء الاصطناعي والطلب (Prompt)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Explain the following code simply and briefly:\n\n${code}`;

    // إرسال الطلب وانتظار الرد
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // إرسال الشرح عائداً إلى الواجهة
    res.json({ explanation: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with the AI." });
  }
});

// تشغيل الخادم على المنفذ 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
