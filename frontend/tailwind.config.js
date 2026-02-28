/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2563eb",
        "secondary-color": "#10b981",
        "danger-color": "#ef4444",
        "background-gray": "#F8FAFC",
        "sidebar-dark": "#0f172a",
      },
    },
  },
  plugins: [],
};
