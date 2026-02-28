import { Sparkles, CalendarDays, ChevronDown } from "lucide-react";

const CreateProject = () => {
  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thêm dự án mới</h1>
            <p className="text-gray-500 text-sm">
              Khởi tạo không gian làm việc cho dự án tiếp theo của bạn.
            </p>
          </div>

          <div className="px-4 py-2 text-sm rounded-full bg-orange-100 text-orange-600 flex items-center gap-2">
            <Sparkles size={16} />
            AI Đang Sẵn Sàng
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORM LEFT */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
            {/* Tên dự án */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Tên dự án
              </label>
              <input
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ví dụ: Thiết kế Website TaskAI 2.0"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Mô tả
              </label>
              <textarea
                rows={4}
                className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Mô tả chi tiết về mục tiêu và phạm vi của dự án..."
              />
            </div>

            {/* DATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* start */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Ngày bắt đầu
                </label>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <CalendarDays
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* end */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Ngày kết thúc
                </label>
                <div className="mt-2 relative">
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <CalendarDays
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* SELECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* priority */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Mức độ ưu tiên
                </label>
                <div className="relative mt-2">
                  <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400">
                    <option>Trung bình</option>
                    <option>Cao</option>
                    <option>Thấp</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* goal */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Gắn mục tiêu
                </label>
                <div className="relative mt-2">
                  <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400">
                    <option>Chọn mục tiêu liên quan...</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AI PANEL */}
          <div className="space-y-6">
            {/* AI suggestion */}
            <div className="bg-[#fff7f3] border border-orange-200 rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                ✨ Gợi ý từ AI
              </h3>

              {[
                {
                  title: "THỜI HẠN THỰC TẾ",
                  desc: "Dựa trên các dự án tương tự, thời gian 4 tuần là tối ưu.",
                },
                {
                  title: "CHIA NHỎ CÔNG VIỆC",
                  desc: "AI có thể tự động tạo ra 12 đầu việc cho dự án này.",
                },
                {
                  title: "ĐÁNH GIÁ RỦI RO",
                  desc: "Bạn nên cân nhắc thêm 2 thành viên UI/UX.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 border border-orange-100"
                >
                  <p className="text-xs font-bold text-orange-500">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}

              <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                Áp dụng gợi ý AI
              </button>
            </div>

            {/* NOTE */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold mb-3 text-gray-800">Lưu ý</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
                <li>Dự án sau khi tạo có thể được chia sẻ với toàn bộ team.</li>
                <li>Mục tiêu gắn kèm sẽ giúp theo dõi tiến độ OKR.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            Hủy
          </button>

          <button className="px-8 py-2 rounded-lg bg-orange-500 text-white font-semibold shadow hover:bg-orange-600 transition">
            + Tạo dự án
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
