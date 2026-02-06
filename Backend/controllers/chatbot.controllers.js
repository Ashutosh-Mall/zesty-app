import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Memory
let summary = "User is chatting with Zesty, a funny short-food chatbot. No orders yet.";
let chatHistory = [];

// Safe Text Extractor
function extractText(response) {
  try {
    return (
      response?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") ||
      response?.response?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ") ||
      response?.output_text ||
      "😵 Chef dropped the tray! Try again!"
    );
  } catch {
    return "😵 Chef dropped the tray! Try again!";
  }
}

// Generate Zesty Reply
async function generateReply(userMessage) {
  chatHistory.push(`User: ${userMessage}`);

  if (chatHistory.length > 6) chatHistory = chatHistory.slice(-6);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are Zesty, a funny short Indian food delivery chatbot.

Rules:
- Reply VERY SHORT (1–3 lines)
- Use emojis 😋🔥🍕
- Only food & delivery
- If non-food → funny redirect
- Promote delicious vibes

Summary:
${summary}

Chat:
${chatHistory.join("\n")}

Reply as Zesty only.
`
  });

  const botReply = extractText(response);
  chatHistory.push(`Zesty: ${botReply}`);
  await updateSummary();
  return botReply;
}

// Update Memory Summary
async function updateSummary() {
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Make a tiny chat memory summary.
Store only:
- food likes
- veg/nonveg
- cravings
- order intent

Chat:
${chatHistory.join("\n")}

Old:
${summary}
`
  });

  summary = extractText(res);
}

// Controller Function for API
export const chatBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const reply = await generateReply(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
