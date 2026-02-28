import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BrainCircuit,
  Clock,
} from "lucide-react";

const CalendarView = () => {
  // 1. Quản lý trạng thái lọc theo Tháng/Tuần/Ngày
  const [viewMode, setViewMode] = useState("month");

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Dữ liệu mẫu (Gồm cả Project và Goal)
  const events = {
    3: [
      {
        id: 1,
        title: "Họp dự án A",
        type: "project",
        color: "bg-blue-100 text-blue-600 border-blue-500",
      },
      {
        id: 2,
        title: "Chạy bộ 5km",
        type: "goal",
        color: "bg-emerald-50 text-emerald-600 border-emerald-500",
      },
    ],
    5: [
      {
        id: 3,
        title: "Review Thiết kế UI",
        type: "project",
        color: "bg-blue-100 text-blue-600 border-blue-500",
      },
    ],
    14: [
      {
        id: 4,
        title: "Deadline Báo cáo",
        type: "project",
        color: "bg-blue-100 text-blue-600 border-blue-500",
      },
    ],
  };

  // 2. Hàm xử lý tiêu đề động theo chế độ lọc
  const getHeaderTitle = () => {
    if (viewMode === "week") return "01 Th10 - 07 Th10, 2023";
    if (viewMode === "day") return "Thứ Năm, 05 Tháng 10, 2023";
    return "Tháng 10, 2023";
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-start gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Lịch Quản lý</h2>
        <div className="flex bg-gray-300 p-1 rounded-lg">
          {["month", "week", "day"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === mode
                  ? "bg-white shadow-sm text-blue-600 font-bold"
                  : "text-gray-800 hover:text-gray-700"
              }`}
            >
              {mode === "month" ? "Tháng" : mode === "week" ? "Tuần" : "Ngày"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-full gap-6">
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-gray-800">
                {getHeaderTitle()}
              </h3>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button className="p-1 hover:bg-white rounded-md transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-1 hover:bg-white rounded-md transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
              <button className="px-4 py-1.5 text-sm font-bold border border-gray-200 rounded-lg hover:bg-gray-50">
                Hôm nay
              </button>
            </div>

            <div className="flex gap-4">
              {["Dự án", "Mục tiêu", "Cố định"].map((label, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400"
                >
                  <span
                    className={`size-2 rounded-full ${idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-emerald-500" : "bg-gray-400"}`}
                  ></span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Logic hiển thị Grid dựa trên Filter */}
          {viewMode !== "day" && (
            <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-50">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-black text-gray-400 uppercase tracking-widest"
                >
                  {day}
                </div>
              ))}
            </div>
          )}

          <div
            className={`flex-1 grid ${viewMode === "day" ? "grid-cols-1" : "grid-cols-7"} auto-rows-fr`}
          >
            {/* Logic render ô lịch */}
            {[
              ...Array(viewMode === "month" ? 35 : viewMode === "week" ? 7 : 1),
            ].map((_, i) => {
              const day =
                viewMode === "month" ? i - 3 : viewMode === "week" ? i + 1 : 5;
              const isCurrentMonth = day > 0 && day <= 31;
              const isToday = day === 5;

              return (
                <div
                  key={i}
                  className={`${viewMode === "day" ? "min-h-[400px]" : "min-h-[110px]"} p-2 border-r border-b border-gray-50 transition-all hover:bg-blue-50/30 ${!isCurrentMonth ? "bg-gray-50/30 opacity-40" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-sm font-bold ${isToday ? "size-7 flex items-center justify-center bg-blue-600 text-white rounded-full" : "text-gray-700"}`}
                    >
                      {isCurrentMonth ? day : ""}
                    </span>
                    {viewMode === "day" && (
                      <span className="text-gray-400 text-xs">
                        Sự kiện trong ngày
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    {isCurrentMonth &&
                      events[day]?.map((event) => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 text-[10px] font-bold rounded border-l-2 truncate shadow-sm ${event.color}`}
                        >
                          {event.title}
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-sm text-gray-800">Tháng 10 2023</p>
              <div className="flex gap-1 text-gray-400">
                <ChevronLeft
                  size={16}
                  className="cursor-pointer hover:text-blue-600"
                />
                <ChevronRight
                  size={16}
                  className="cursor-pointer hover:text-blue-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-7 text-[10px] font-black text-gray-300 text-center mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-[11px] text-center gap-y-2 font-medium">
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`py-1 ${i + 1 === 5 ? "bg-blue-600 text-white rounded-full font-bold" : "text-gray-600"}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex-1">
            <h4 className="font-bold text-sm text-gray-800 mb-4">Sắp tới</h4>
            <div className="space-y-3">
              {Object.values(events)
                .flat()
                .slice(0, 3)
                .map((ev, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[42px] h-11 bg-white rounded-lg shadow-sm border border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 leading-none mb-1">
                        TH5
                      </p>
                      <p
                        className={`text-sm font-black ${ev.type === "goal" ? "text-emerald-600" : "text-blue-600"} leading-none`}
                      >
                        05
                      </p>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-gray-800 truncate">
                        {ev.title}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                        <Clock size={10} /> 14:00 - 15:30
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-blue-600 rounded-lg text-white">
                  <BrainCircuit size={14} />
                </div>
                <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  AI Gợi ý
                </h5>
              </div>
              <p className="text-[11px] text-blue-800/80 leading-relaxed font-medium">
                Bạn có mục tiêu chạy bộ chưa hoàn thành. AI gợi ý thực hiện vào
                sáng mai.
              </p>
              <button className="mt-3 w-full py-2 bg-blue-600 text-white text-[11px] font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Sparkles size={12} /> Tối ưu lịch trình
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
