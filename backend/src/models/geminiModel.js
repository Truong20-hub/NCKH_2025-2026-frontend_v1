const { GoogleGenerativeAI } = require("@google/generative-ai");

// Khởi tạo một lần duy nhất
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cấu hình retry (bạn có thể điều chỉnh)
const RETRY_CONFIG = {
  maxRetries: 5, // Số lần thử lại tối đa
  initialDelay: 1000, // Delay ban đầu (ms)
  maxDelay: 30000, // Delay tối đa (ms)
  backoffFactor: 2, // Hệ số tăng delay (exponential)
};

/**
 * Hàm sleep với jitter để tránh nhiều request cùng lúc
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hàm chính gọi Gemini với retry khi quá tải
 */
async function askGemini(message, options = {}) {
  const {
    maxRetries = RETRY_CONFIG.maxRetries,
    modelName = "gemini-2.5-flash", // Có thể thay bằng gemini-2.5-pro nếu cần
  } = options;

  const model = genAI.getGenerativeModel({ model: modelName });

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(message);
      const response = await result.response;

      if (response && response.text) {
        return response.text();
      }

      throw new Error("Không nhận được phản hồi hợp lệ từ Gemini.");
    } catch (error) {
      const isRateLimit =
        error.message?.includes("429") ||
        error.message?.includes("RESOURCE_EXHAUSTED") ||
        error.message?.includes("Too Many Requests") ||
        error.status === 429 ||
        error.code === 429;

      const isOverloaded =
        error.message?.includes("503") ||
        error.message?.includes("overloaded") ||
        error.message?.includes("UNAVAILABLE");

      // Chỉ retry khi là lỗi tạm thời (rate limit, overloaded, network...)
      if (
        (isRateLimit || isOverloaded || error.name === "FetchError") &&
        attempt < maxRetries
      ) {
        // Tính delay theo exponential backoff + jitter
        const delay = Math.min(
          RETRY_CONFIG.maxDelay,
          RETRY_CONFIG.initialDelay *
            Math.pow(RETRY_CONFIG.backoffFactor, attempt),
        );

        // Thêm jitter ±20% để tránh nhiều request đồng thời
        const jitter = delay * (0.8 + Math.random() * 0.4);

        console.warn(
          `[Gemini] Lỗi tạm thời (attempt ${attempt + 1}/${maxRetries + 1}): ${error.message}`,
        );
        console.warn(
          `[Gemini] Thử lại sau ${Math.round(jitter / 1000)} giây...`,
        );

        await sleep(jitter);
        continue; // thử lại
      }

      // Lỗi không retry được → throw ra ngoài
      console.error(`[Gemini] Lỗi sau ${attempt} lần thử:`, error.message);

      // In thêm thông tin hữu ích để debug
      if (error.status) console.error(`Status code: ${error.status}`);
      if (error.code) console.error(`Error code: ${error.code}`);

      throw error;
    }
  }

  throw new Error("Đã thử lại tối đa số lần nhưng vẫn thất bại với Gemini.");
}

module.exports = { askGemini };
