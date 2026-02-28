import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const [settings, setSettings] = useState({
    push: true,
    email: false,
    sound: true,
    twoFA: true,
    ai: true,
  });

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const tabs = [
    { id: "profile", label: "Hồ sơ cá nhân" },
    { id: "system", label: "Hệ thống" },
    { id: "ui", label: "Giao diện" },
    { id: "notify", label: "Thông báo" },
    { id: "security", label: "Bảo mật" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-6 border-b">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 text-sm font-medium transition ${
                activeTab === t.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="col-span-2 space-y-6">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <Card title="Hồ sơ cá nhân">
                <Input label="Họ tên" />
                <Input label="Email" />
                <Input label="Số điện thoại" />
              </Card>
            )}

            {/* SYSTEM */}
            {activeTab === "system" && (
              <Card title="Cài đặt hệ thống">
                <Select label="Ngôn ngữ" options={["Việt Nam", "English"]} />
                <Select label="Múi giờ" options={["GMT+7", "GMT+8"]} />
              </Card>
            )}

            {/* UI */}
            {activeTab === "ui" && (
              <Card title="Giao diện">
                <ModeCard title="Sáng" desc="Theme sáng" active />
                <ModeCard title="Tối" desc="Theme tối" />
                <ModeCard title="System" desc="Theo thiết bị" />
              </Card>
            )}

            {/* NOTIFY */}
            {activeTab === "notify" && (
              <Card title="Thông báo">
                <Toggle
                  label="Thông báo đẩy"
                  desc="Hiển thị trên trình duyệt"
                  checked={settings.push}
                  onChange={() => toggle("push")}
                />
                <Toggle
                  label="Email"
                  desc="Gửi qua email"
                  checked={settings.email}
                  onChange={() => toggle("email")}
                />
                <Toggle
                  label="Âm thanh"
                  desc="Phát âm báo"
                  checked={settings.sound}
                  onChange={() => toggle("sound")}
                />
              </Card>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <Card title="Bảo mật">
                <Toggle
                  label="Xác thực 2 lớp"
                  desc="Bảo vệ tài khoản"
                  checked={settings.twoFA}
                  onChange={() => toggle("twoFA")}
                />

                <Row label="Đổi mật khẩu" desc="Cập nhật định kỳ">
                  <ActionBtn text="Đổi" />
                </Row>

                <Toggle
                  label="AI phát hiện đăng nhập lạ"
                  desc="Cảnh báo truy cập bất thường"
                  checked={settings.ai}
                  onChange={() => toggle("ai")}
                />
              </Card>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <Card title="✨ Gợi ý AI">
              <Hint
                title="Tối ưu thông báo"
                desc="Bạn hoạt động nhiều buổi sáng."
              />
              <Hint title="Bảo mật" desc="Nên bật xác thực 2 lớp." />
            </Card>

            <Card title="Dung lượng">
              <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
                <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <ActionBtn text="Nâng cấp" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
      <h2 className="font-semibold text-lg">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <select className="w-full mt-1 px-3 py-2 border rounded-lg">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}

function ModeCard({ title, desc, active }) {
  return (
    <div
      className={`p-4 rounded-xl border cursor-pointer ${
        active ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function Row({ label, desc, children }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p>{label}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function ActionBtn({ text }) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      {text}
    </button>
  );
}

function Hint({ title, desc }) {
  return (
    <div className="p-3 rounded-lg border bg-blue-50">
      <p className="font-medium text-blue-700">{title}</p>
      <p className="text-sm text-blue-600">{desc}</p>
    </div>
  );
}
