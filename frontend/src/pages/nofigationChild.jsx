import { Bell, X, Calendar, Zap, AlertTriangle } from "lucide-react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
const NofigationChild = (props) => {
  const { onClose } = props;
  const navigate = useNavigate();
  return (
    <div className="absolute flex flex-col top-[53px] right-0 w-[350px] h-[500px] bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center gap-2 h-[60px] pl-3 border-b-2 border-gray-200 bg-[#EEF3FF] rounded-t-xl text-black">
        <Bell className="w-6 h-6 text-blue-600" />
        <span className="text-[17px] font-semibold">Thông báo mới nhất</span>
        <X
          className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer absolute right-3"
          onClick={onClose}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {/* items */}
        <div className="w-[100%] m-0 flex h-[130px] relative border-b border-gray-200 bg-white p-0 hover:bg-blue-50 cursor-pointer">
          {/* Icon */}
          <div className="h-[100%] w-[20%] flex justify-center pt-3">
            <div className="h-[55px] w-[55px] flex items-center justify-center rounded-full bg-[#DBEAFE]">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
          </div>

          {/* Content */}
          <div className="w-[80%] h-[100%] flex flex-col pt-3 pr-3 text-black">
            <p className="text-[14px] font-semibold text-left">
              Hôm nay <span className="font-normal">(Thứ hai, 10/06)</span>
            </p>

            <p className="text-[13px] text-gray-600 text-left mt-1">
              Bạn còn{" "}
              <span className="text-blue-600 font-semibold">5 công việc</span>{" "}
              cần hoàn thành hôm nay.
            </p>

            <p className="text-[12px] text-gray-400 text-left mt-2">
              Cập nhật lúc 07:45
            </p>
          </div>
        </div>

        <div className="w-[100%] m-0 flex h-[130px] relative border-b border-gray-200 bg-white p-0 hover:bg-red-50 cursor-pointer">
          {/* Icon */}
          <div className="h-[100%] w-[20%] flex justify-center pt-3">
            <div className="h-[55px] w-[55px] flex items-center justify-center rounded-full bg-[#FEE2E2]">
              <AlertTriangle className="w-7 h-7 text-[#DC2626]" />
            </div>
          </div>

          {/* Content */}
          <div className="w-[80%] h-[100%] flex flex-col pt-3 pr-3 text-black">
            <p className="text-[14px] font-semibold text-left text-[#DC2626]">
              Hết hạn sắp tới
            </p>

            <p className="text-[13px] text-gray-700 text-left mt-1 leading-5">
              <span className="font-semibold text-black">
                Hoàn thiện hướng dẫn thương hiệu
              </span>
              <br />
              <span className="text-gray-600">
                Chiến dịch marketing · còn{" "}
                <span className="font-semibold text-[#DC2626]">2 ngày</span>
              </span>
            </p>

            <p className="text-[12px] text-gray-400 text-left mt-2">
              Cập nhật lúc 07:45
            </p>
          </div>
        </div>

        <div className="w-[100%] m-0 flex h-[130px] relative border-b border-gray-200 bg-white p-0 hover:bg-green-50 cursor-pointer">
          {/* Icon */}
          <div className="h-[100%] w-[20%] flex justify-center pt-3">
            <div className="h-[55px] w-[55px] flex items-center justify-center rounded-full bg-[#ECFDF5]">
              <Zap className="w-7 h-7 text-[#16A34A]" />
            </div>
          </div>

          {/* Content */}
          <div className="w-[80%] h-[100%] flex flex-col pt-3 pr-3 text-black">
            <p className="text-[14px] font-semibold text-left">Gợi ý từ AI</p>

            <p className="text-[13px] text-gray-600 text-left mt-1">
              Bạn có thể chia nhỏ nhiệm vụ{" "}
              <span className="font-semibold text-black">
                "Hoàn thiện hướng dẫn thương hiệu"
              </span>{" "}
              để hoàn thành nhanh hơn.
            </p>

            <p className="text-[12px] text-gray-400 text-left mt-2">
              Gợi ý lúc 08:10
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-[50px] flex items-center justify-center border-t border-gray-200">
        <button
          className="text-[14px] font-semibold text-blue-600 hover:underline"
          onClick={() => navigate("/announce")}
        >
          Tất cả thông báo
        </button>
      </div>
    </div>
  );
};
export default NofigationChild;
