const ChatBox = ({ onClose }) => {
  return (
    <div className="fixed bottom-28 right-6 w-80 h-96 bg-white shadow-2xl rounded-xl border">
      <div className="p-3 border-b flex justify-between items-center">
        <span className="font-bold">AI Assistant</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="p-3 text-sm text-gray-500">
        Xin chào 👋 tôi có thể giúp gì cho bạn?
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-md">
          <input
            type="text"
            placeholder="Nhập câu hỏi của bạn..."
            className="
                        flex-1
                        outline-none
                        text-sm
                        text-gray-700
                        placeholder-gray-400
                      "
          />
          <button
            className="
                        px-3 py-1.5
                        bg-blue-600
                        text-white
                        text-sm
                        rounded-lg
                        hover:bg-blue-700
                        transition
                        "
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
