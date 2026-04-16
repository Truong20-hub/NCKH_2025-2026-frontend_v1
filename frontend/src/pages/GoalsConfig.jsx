import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Check,
  Sparkles,
  Layout,
  Trash2,
  Info,
  Repeat,
  Upload,
  FileText,
} from "lucide-react";
import * as XLSX from "xlsx";

const GoalsConfig = () => {
  // --- STATE MANAGEMENT ---
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [isRepeating, setIsRepeating] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const daysOfWeekMap = [
    { id: 0, label: "CN" },
    { id: 1, label: "T2" },
    { id: 2, label: "T3" },
    { id: 3, label: "T4" },
    { id: 4, label: "T5" },
    { id: 5, label: "T6" },
    { id: 6, label: "T7" },
  ];

  // --- LOGIC XỬ LÝ API (KẾT NỐI BACKEND) ---
  const handleConfirmSchedule = async () => {
    if (sessions.length === 0) {
      alert("Vui lòng thêm ít nhất một phiên làm việc!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Chuyển đổi từng session thành một task để lưu vào database
      const promises = sessions.map((session) => {
        const taskData = {
          goal_id: selectedProjectId,
          title: `Học tập: ${session.dayLabel}`,
          description: `Phiên làm việc dự kiến từ ${session.start} đến ${session.end}`,
          estimated_minutes: 120, // Mặc định 2 tiếng
          priority: "NORMAL",
          due_date: session.date,
          is_completed: 0,
        };

        return fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });
      });

      await Promise.all(promises);
      alert("Đã xác nhận và lưu lộ trình vào danh sách công việc thành công!");
      setSessions([]); // Reset sau khi lưu thành công
    } catch (error) {
      console.error("Lỗi khi lưu lộ trình:", error);
      alert("Không thể kết nối với Server. Quynh kiểm tra lại Backend nhé!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LOGIC XỬ LÝ EXCEL ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const importedSessions = data.map((item) => {
        const itemDate = item.Date || startDate;
        return {
          id: Date.now() + Math.random(),
          date: itemDate,
          dayLabel: daysOfWeekMap[new Date(itemDate).getDay()]?.label || "??",
          start: item.Start || "08:00",
          end: item.End || "10:00",
        };
      });
      setSessions((prev) => [...prev, ...importedSessions]);
    };
    reader.readAsBinaryString(file);
  };

  // --- LOGIC TÍNH TOÁN NGÀY ---
  const calculateNextDate = (dayIndex, weeksOffset = 0) => {
    const start = new Date(startDate);
    const resultDate = new Date(start);
    const startDay = start.getDay();
    let daysToAdd = (dayIndex - startDay + 7) % 7;
    daysToAdd += weeksOffset * 7;
    resultDate.setDate(start.getDate() + daysToAdd);
    return resultDate.toISOString().split("T")[0];
  };

  const addSession = (dayIdx, label) => {
    setSessions((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        date: calculateNextDate(dayIdx),
        dayLabel: label,
        start: "08:00",
        end: "10:00",
      },
    ]);
  };

  const spreadMonthly = (dayIdx, label) => {
    const newSessions = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      date: calculateNextDate(dayIdx, i),
      dayLabel: label,
      start: "08:00",
      end: "10:00",
    }));
    setSessions((prev) => [...prev, ...newSessions]);
  };

  const updateTime = (id, field, value) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [sessions]);

  const highlightedDates = useMemo(
    () => sessions.map((s) => s.date),
    [sessions],
  );

  const calendarDays = useMemo(() => {
    const date = new Date(startDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const current = new Date(year, month, i + 1);
      const iso = current.toISOString().split("T")[0];
      return {
        dayNum: i + 1,
        isoDate: iso,
        isWeekend: current.getDay() === 0 || current.getDay() === 6,
      };
    });
  }, [startDate]);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in p-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Cấu hình Mục tiêu
          </h2>
          <div className="flex items-center gap-2 mt-2 bg-slate-100 w-fit px-3 py-1 rounded-full border border-slate-200">
            <Layout size={14} className="text-blue-600" />
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="text-xs font-bold text-slate-600 bg-transparent outline-none cursor-pointer"
            >
              <option value={1}>Dự án Tiếng Nhật N4</option>
              <option value={2}>Đồ án Tốt nghiệp</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg transition-all active:scale-95">
          <Sparkles size={18} /> AI Tối ưu lịch rảnh
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* CỘT TRÁI: ĐIỀU KHIỂN */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" /> Ngày bắt đầu dự
              án
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />

            <div className="pt-2">
              <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                Trạng thái tháng hiện tại
              </p>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day) => {
                  const isScheduled = highlightedDates.includes(day.isoDate);
                  return (
                    <div
                      key={day.isoDate}
                      className={`h-7 rounded-lg text-[10px] flex items-center justify-center transition-all border
                        ${
                          isScheduled
                            ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                            : day.isWeekend
                              ? "bg-red-50 text-red-400 border-red-50"
                              : "bg-slate-50 text-slate-400 border-slate-50"
                        }`}
                    >
                      {day.dayNum}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <label className="text-sm font-bold text-slate-700 mb-4 block">
              Thêm phiên / Rải lịch tháng
            </label>
            <div className="space-y-2">
              {daysOfWeekMap.map((day) => (
                <div key={day.id} className="flex gap-2 group">
                  <button
                    onClick={() => addSession(day.id, day.label)}
                    className="flex-1 py-2 rounded-xl font-bold text-xs bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                  >
                    Thêm {day.label}
                  </button>
                  <button
                    onClick={() => spreadMonthly(day.id, day.label)}
                    className="px-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all border border-slate-100"
                  >
                    <Repeat size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 border-dashed">
            <h4 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
              <Upload size={18} /> Nhập từ Excel
            </h4>
            <div className="group relative flex flex-col items-center justify-center w-full h-32 bg-white rounded-2xl border-2 border-dashed border-emerald-200 cursor-pointer hover:border-emerald-400 transition-all text-center">
              <FileText className="text-emerald-300 mb-2" size={32} />
              <span className="text-[10px] font-bold text-emerald-600">
                Kéo thả file .xlsx
              </span>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: LIST PHIÊN */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800">
              Lộ trình chi tiết{" "}
              <span className="ml-2 bg-blue-100 text-blue-600 px-3 py-0.5 rounded-full text-[10px]">
                {sessions.length} phiên
              </span>
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border">
              <Repeat size={12} /> Lặp lại tuần
              <input
                type="checkbox"
                checked={isRepeating}
                onChange={(e) => setIsRepeating(e.target.checked)}
                className="size-4 rounded text-blue-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {sortedSessions.length > 0 ? (
              sortedSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-blue-300 transition-all"
                >
                  <div className="size-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 border border-blue-100">
                    {session.dayLabel}
                  </div>
                  <div className="flex-1">
                    <input
                      type="date"
                      value={session.date}
                      onChange={(e) =>
                        updateTime(session.id, "date", e.target.value)
                      }
                      className="bg-slate-50 border-none rounded-lg p-2 text-sm font-bold text-slate-700 outline-none w-full"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <input
                      type="time"
                      value={session.start}
                      onChange={(e) =>
                        updateTime(session.id, "start", e.target.value)
                      }
                      className="bg-transparent text-xs font-bold w-16 outline-none text-slate-700"
                    />
                    <span className="text-slate-300">→</span>
                    <input
                      type="time"
                      value={session.end}
                      onChange={(e) =>
                        updateTime(session.id, "end", e.target.value)
                      }
                      className="bg-transparent text-xs font-bold w-16 outline-none text-slate-700"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setSessions((prev) =>
                        prev.filter((s) => s.id !== session.id),
                      )
                    }
                    className="p-3 text-slate-300 hover:text-red-500 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                <Info size={40} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">
                  Chưa có dữ liệu. Hãy thêm phiên làm việc mới, Quynh nhé!
                </p>
              </div>
            )}
          </div>

          {sessions.length > 0 && (
            <button
              onClick={handleConfirmSchedule}
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-slate-900 hover:bg-black"} text-white py-5 rounded-3xl font-black shadow-2xl transition-all flex items-center justify-center gap-3 transform active:scale-[0.98]`}
            >
              <Check size={20} />{" "}
              {isSubmitting ? "ĐANG LƯU..." : "XÁC NHẬN LỘ TRÌNH DỰ ÁN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsConfig;
