import { X, Send, User, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatWindow({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today?" },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated bot reply
    setTimeout(() => {
      const botMsg = {
        from: "bot",
        text: "This is a sample response.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 animate-slide-up transition-all">
      {/* Header */}
      <div className="bg-red-600 text-white p-3 rounded-t-xl flex justify-between items-center shadow">
        <h2 className="text-sm font-bold tracking-wide">
          VeriBot
        </h2>
      
      </div>

      {/* Chat messages */}
      <div
        className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50 text-sm"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hide scrollbar for webkit */}
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end gap-2 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "bot" && (
              <div className="bg-gray-300 p-1 rounded-full">
                <Bot size={16} className="text-gray-700" />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl ${
                msg.from === "user"
                  ? "bg-red-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>

            {msg.from === "user" && (
              <div className="bg-red-500 p-1 rounded-full">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-2 bg-white rounded-b-xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <button
            onClick={handleSend}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
