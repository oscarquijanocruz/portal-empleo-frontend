"use client";

import { useState } from "react";
import { Send, X, BotMessageSquare } from "lucide-react";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMessage = { role: "assistant", content: data.reply };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* BOTÓN FLOTANTE BONITO */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-600
        text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <BotMessageSquare size={28} />
      </button>

      {/* CHATBOX */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl border overflow-hidden animate-fadeIn z-50">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 flex justify-between items-center">
            <p className="font-semibold text-sm">Asistente IA</p>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X size={18} />
            </button>
          </div>

          {/* MENSAJES */}
          <div className="h-72 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg text-sm max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 flex gap-2 border-t bg-white">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ANIMACIÓN */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn .3s ease-in-out;
        }
      `}</style>
    </>
  );
}
