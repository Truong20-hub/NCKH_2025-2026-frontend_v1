import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Mic, Send, X, Loader2 } from "lucide-react";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const messageToSend = typeof text === "string" ? text : input;
    if (!messageToSend.trim() || isLoading) return;

    // Thêm tin nhắn của người dùng vào UI
    const userMsg = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error(data.error || "Không thể kết nối AI");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lỗi: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-6 w-[360px] h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-purple-900/40 bg-gradient-to-b from-[#1a1325] to-[#120c1c] text-white flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-purple-900/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600/20">
            <Sparkles className="text-purple-400" size={20} />
          </div>
          <div>
            <p className="font-semibold">Trợ lý AI</p>
            <p className="text-xs text-green-400">● Đang trực tuyến</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="hover:bg-white/10 p-1 rounded-lg transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            {/* ICON */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] mb-6">
              <div className="w-5 h-5 border-l-4 border-r-4 border-white animate-pulse"></div>
            </div>

            <h2 className="text-lg font-bold mb-2">
              Chào bạn, tôi có thể giúp gì cho lịch trình hôm nay?
            </h2>

            <p className="text-xs text-purple-200 mb-6">
              Tôi có thể giúp bạn sắp xếp cuộc họp hoặc tối ưu hóa công việc.
            </p>

            {/* QUICK ACTION */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {["Tóm tắt dự án", "Tìm thời gian rảnh", "Gợi ý mục tiêu"].map(
                (item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(item)}
                    className="px-3 py-1.5 rounded-full text-xs bg-purple-800/40 border border-purple-500/30 hover:bg-purple-700/40 transition"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-none"
                    : "bg-white/10 text-purple-100 border border-white/10 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-purple-400" />
              <span className="text-xs text-purple-300">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3 backdrop-blur">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập yêu cầu của bạn tại đây..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-purple-300"
          />

          <Mic size={18} className="text-purple-300 cursor-pointer" />

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>

        <p className="text-xs text-purple-400 mt-2 text-center">
          AI có thể mắc sai lầm, hãy kiểm tra lại.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
