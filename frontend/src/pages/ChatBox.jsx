import { Sparkles, Mic, Send, X } from "lucide-react";

const ChatBox = ({ onClose }) => {
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* ICON */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.6)] mb-6">
          <div className="w-6 h-6 border-l-4 border-r-4 border-white animate-pulse"></div>
        </div>

        {/* TEXT */}
        <h2 className="text-xl font-bold mb-2 leading-snug">
          Chào bạn, tôi có thể giúp gì cho lịch trình hôm nay?
        </h2>

        <p className="text-sm text-purple-200 mb-6">
          Tôi có thể giúp bạn sắp xếp cuộc họp, tóm tắt dữ liệu hoặc tối ưu hóa
          công việc của bạn.
        </p>

        {/* QUICK ACTION */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {["Tóm tắt dự án", "Tìm thời gian rảnh", "Tối ưu hóa mục tiêu"].map(
            (item, i) => (
              <button
                key={i}
                className="px-4 py-2 rounded-full text-sm bg-purple-800/40 border border-purple-500/30 hover:bg-purple-700/40 transition"
              >
                {item}
              </button>
            ),
          )}
        </div>

        {/* TIP */}
        <div className="w-full rounded-2xl border border-purple-500/20 bg-purple-900/30 p-4 text-left">
          <p className="font-semibold text-purple-300 mb-1">Mẹo hôm nay</p>
          <p className="text-sm text-purple-200">
            Hãy sử dụng "Focus Mode" để tăng 40% hiệu suất.
          </p>
        </div>
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3 backdrop-blur">
          <input
            placeholder="Nhập yêu cầu của bạn tại đây..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-purple-300"
          />

          <Mic size={18} className="text-purple-300 cursor-pointer" />

          <button className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center hover:scale-105 transition">
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
