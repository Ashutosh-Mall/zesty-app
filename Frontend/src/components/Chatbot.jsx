import {useState, useEffect, useRef} from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {type: "bot", text: "Hi! I'm Zesty. Ask me about food!"},
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, {type: "user", text: input}]);

    const userMessage = input;
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: userMessage}),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, {type: "bot", text: data.reply}]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {type: "bot", text: "Oops! Something went wrong 😵"},
      ]);
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg"
        >
          Zesty 🍕
        </button>
      )}

      {open && (
        <div className="flex flex-col w-80 max-w-xs h-[400px] md:w-96 md:h-[500px] bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-orange-500 text-white px-4 py-2 flex justify-between items-center">
            <span>Zesty 🍕🔥</span>
            <button className="font-bold" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[80%] break-words ${
                  msg.type === "user"
                    ? "bg-orange-200 text-gray-900 self-end"
                    : "bg-gray-700 text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 flex gap-2 bg-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-3 py-2 rounded-lg text-white"
              placeholder="Ask Zesty..."
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
