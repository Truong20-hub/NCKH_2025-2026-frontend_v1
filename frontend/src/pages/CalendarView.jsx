import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, BrainCircuit, Clock } from "lucide-react";

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 is Sunday

const formatDateString = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const getWeekNumber = (d) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

const CalendarView = () => {
  const [viewMode, setViewMode] = useState("month");
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const [events, setEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userId = currentUser ? currentUser.id : "";
    
    // Gọi API từ bảng Tasks
    fetch(`http://localhost:3000/api/tasks${userId ? `?userId=${userId}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const eventsMap = {};
        data.forEach((task) => {
          if (task.due_date || task.NgayTao) {
            const date = new Date(task.due_date || task.NgayTao);
            const dateStr = formatDateString(date);

            if (!eventsMap[dateStr]) eventsMap[dateStr] = [];

            eventsMap[dateStr].push({
              id: task.id || task.Id,
              title: task.title || task.TieuDe || "Task chưa đặt tên",
              type: "task",
              color:
                task.priority === "HIGH"
                  ? "bg-red-100 text-red-600 border-red-500"
                  : "bg-emerald-100 text-emerald-600 border-emerald-500",
            });
          }
        });
        setEvents(eventsMap);
      })
      .catch((err) => console.error("Lỗi tải lịch:", err));
  }, []);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const getHeaderTitle = () => {
    if (viewMode === "month") return `Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`;
    if (viewMode === "week") return `Tuần ${getWeekNumber(currentDate)} - Năm ${currentDate.getFullYear()}`;
    return `Ngày ${currentDate.getDate()} Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`;
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Tính tổng số ô vẽ ra cho vừa khung Grid
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - firstDay + 1;
      const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;

      let dateStr = "";
      let isToday = false;
      let hasEvent = [];

      if (isCurrentMonth) {
        const iterDate = new Date(year, month, dayNum);
        dateStr = formatDateString(iterDate);
        hasEvent = events[dateStr] || [];
        isToday = dateStr === formatDateString(new Date());
      }

      cells.push(
        <div
          key={i}
          className={`min-h-[120px] p-2 border-r border-b border-gray-50 hover:bg-blue-50/20 transition-colors ${!isCurrentMonth ? "bg-gray-50/50" : ""}`}
        >
          {isCurrentMonth && (
            <>
              <span
                className={`text-sm font-bold ${isToday ? "bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full" : "text-gray-700"}`}
              >
                {dayNum}
              </span>
              <div className="mt-2 space-y-1">
                {hasEvent.map((ev) => (
                  <div key={ev.id} className={`text-[9px] font-bold p-1 rounded border-l-2 truncate ${ev.color}`}>
                    {ev.title}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>,
      );
    }
    return <div className="grid grid-cols-7 auto-rows-fr">{cells}</div>;
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday as start

    const cells = [];
    for (let i = 0; i < 7; i++) {
      const iterDate = new Date(startOfWeek);
      iterDate.setDate(iterDate.getDate() + i);
      const dateStr = formatDateString(iterDate);
      const hasEvent = events[dateStr] || [];
      const isToday = dateStr === formatDateString(new Date());

      cells.push(
        <div
          key={i}
          className="min-h-[400px] p-4 border-r border-b border-gray-50 hover:bg-blue-50/10 transition-colors"
        >
          <div
            className={`text-center pb-2 border-b border-gray-100 ${isToday ? "text-blue-600 font-black" : "text-gray-500"}`}
          >
            <div className="text-xs uppercase">{daysOfWeek[i]}</div>
            <div className="text-xl mt-1">{iterDate.getDate()}</div>
          </div>
          <div className="mt-4 space-y-3">
            {hasEvent.map((ev) => (
              <div
                key={ev.id}
                className={`text-xs font-bold p-3 rounded-lg border-l-4 shadow-sm flex flex-col gap-1 ${ev.color}`}
              >
                <span>{ev.title}</span>
                <span className="opacity-60 flex items-center gap-1 text-[10px]">
                  <Clock size={10} /> Cả ngày
                </span>
              </div>
            ))}
          </div>
        </div>,
      );
    }
    return <div className="grid grid-cols-7 auto-rows-fr">{cells}</div>;
  };

  const renderDayView = () => {
    const dateStr = formatDateString(currentDate);
    const hasEvent = events[dateStr] || [];
    const isToday = dateStr === formatDateString(new Date());

    return (
      <div className="p-8 min-h-[400px]">
        <div
          className={`mb-8 flex flex-col items-center pb-6 border-b border-gray-100 ${isToday ? "text-blue-600" : "text-gray-800"}`}
        >
          <span className="text-sm font-bold uppercase tracking-widest">{daysOfWeek[currentDate.getDay()]}</span>
          <span className="text-6xl font-black mt-2">{currentDate.getDate()}</span>
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          {hasEvent.length === 0 ? (
            <div className="text-center text-gray-400 italic py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              Hôm nay bạn không có lịch trình nào!
            </div>
          ) : (
            hasEvent.map((ev) => (
              <div
                key={ev.id}
                className={`text-base font-bold p-5 rounded-2xl border-l-[6px] shadow-sm flex justify-between items-center transition-transform hover:scale-[1.02] cursor-pointer ${ev.color}`}
              >
                <span>{ev.title}</span>
                <Clock size={18} className="opacity-60" />
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const getUpcomingEvents = () => {
    const upcoming = [];
    const todayStr = formatDateString(new Date());
    Object.keys(events)
      .sort()
      .forEach((dateStr) => {
        if (dateStr >= todayStr) {
          events[dateStr].forEach((ev) => {
            upcoming.push({ ...ev, dateStr });
          });
        }
      });
    return upcoming.slice(0, 5); // Take top 5
  };

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
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-blue-200 shadow-lg hover:bg-blue-700 transition-colors">
          + Thêm sự kiện
        </button>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-50 bg-white z-10 sticky top-0">
            <h3 className="text-lg font-bold text-gray-800">{getHeaderTitle()}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-xs font-bold bg-gray-100 rounded hover:bg-gray-200 text-gray-600 mx-2"
              >
                HÔM NAY
              </button>
              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {viewMode === "month" && (
            <div className="grid grid-cols-7 border-b border-gray-50 bg-gray-50/50">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"
                >
                  {day}
                </div>
              ))}
            </div>
          )}
          {viewMode === "week" && <div className="bg-gray-50/50 border-b border-gray-50 h-2"></div>}

          <div className="flex-1 overflow-auto">
            {viewMode === "month" && renderMonthView()}
            {viewMode === "week" && renderWeekView()}
            {viewMode === "day" && renderDayView()}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 space-y-6 shrink-0">
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="text-blue-400" size={20} />
                <span className="text-xs font-black uppercase tracking-widest text-blue-400">AI Gợi ý</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Bạn có {getUpcomingEvents().length} task sắp tới. AI gợi ý nên tập trung hoàn thành sớm các mục tiêu có
                độ ưu tiên cao.
              </p>
              <button className="w-full bg-blue-600 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50">
                <Sparkles size={14} /> TỐI ƯU NGAY
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              Sắp tới{" "}
              <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full">
                {getUpcomingEvents().length}
              </span>
            </h4>
            <div className="space-y-4">
              {getUpcomingEvents().map((ev, idx) => {
                const evDate = new Date(ev.dateStr);
                return (
                  <div key={idx} className="flex gap-4 group cursor-pointer">
                    <div className="bg-gray-50 text-gray-600 p-2 rounded-xl font-black text-center min-w-[50px] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors h-fit">
                      <span className="block text-[9px] uppercase tracking-wider">Th{evDate.getMonth() + 1}</span>
                      <span className="text-lg leading-tight">{evDate.getDate()}</span>
                    </div>
                    <div className="overflow-hidden py-1">
                      <p className="text-sm font-bold truncate text-gray-800 group-hover:text-blue-600 transition-colors">
                        {ev.title}
                      </p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                        <Clock size={10} /> Cả ngày
                      </p>
                    </div>
                  </div>
                );
              })}
              {getUpcomingEvents().length === 0 && (
                <div className="text-xs text-gray-400 italic text-center py-4">Chưa có sự kiện nào sắp diễn ra</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
