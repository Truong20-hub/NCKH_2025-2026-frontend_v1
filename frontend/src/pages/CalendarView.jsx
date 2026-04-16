import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, BrainCircuit, Clock } from "lucide-react";

// Giả lập dữ liệu fetch từ TiDB bảng 'events'
const MOCK_EVENTS = {
  5: [{ id: 1, title: "Họp dự án Alpha", type: "project", color: "bg-blue-100 text-blue-600 border-blue-500" }],
  7: [{ id: 2, title: "Review UI/UX", type: "project", color: "bg-blue-100 text-blue-600 border-blue-500" }],
  10: [{ id: 3, title: "Chạy bộ 5km", type: "goal", color: "bg-emerald-100 text-emerald-600 border-emerald-500" }]
};

const CalendarView = () => {
  const [viewMode, setViewMode] = useState("month");
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-gray-800">Lịch Quản lý</h2>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["month", "week", "day"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  viewMode === mode ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                }`}
              >
                {mode === "month" ? "Tháng" : mode === "week" ? "Tuần" : "Ngày"}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-blue-200 shadow-lg">
          + Thêm sự kiện
        </button>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <h3 className="text-lg font-bold">Tháng 10, 2023</h3>
            <div className="flex items-center gap-2">
               <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft size={20}/></button>
               <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight size={20}/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-gray-50">
            {daysOfWeek.map(day => (
              <div key={day} className="py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-fr">
            {[...Array(35)].map((_, i) => {
              const dayNum = i - 2; // Giả lập bắt đầu từ đầu tháng
              const isCurrentDay = dayNum === 5;
              const hasEvent = MOCK_EVENTS[dayNum];

              return (
                <div key={i} className="min-h-[120px] p-2 border-r border-b border-gray-50 hover:bg-blue-50/20 transition-colors">
                  {dayNum > 0 && dayNum <= 31 && (
                    <>
                      <span className={`text-sm font-bold ${isCurrentDay ? "bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full" : "text-gray-700"}`}>
                        {dayNum}
                      </span>
                      <div className="mt-2 space-y-1">
                        {hasEvent?.map(ev => (
                          <div key={ev.id} className={`text-[9px] font-bold p-1 rounded border-l-2 truncate ${ev.color}`}>
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 space-y-6">
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="text-blue-400" size={20}/>
                <span className="text-xs font-black uppercase tracking-widest text-blue-400">AI Gợi ý</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Bạn có 3 task chưa hoàn thành. AI gợi ý nên tập trung vào <b>Dự án Alpha</b> vào sáng mai.
              </p>
              <button className="w-full bg-blue-600 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
                <Sparkles size={14}/> TỐI ƯU NGAY
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h4 className="font-bold mb-4">Sắp tới</h4>
            <div className="space-y-4">
              {MOCK_EVENTS[5].map(ev => (
                <div key={ev.id} className="flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-xl font-black text-center min-w-[50px]">
                    <span className="block text-[10px] uppercase">Th5</span>
                    <span className="text-lg">05</span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate text-gray-800">{ev.title}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10}/> 09:00 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;