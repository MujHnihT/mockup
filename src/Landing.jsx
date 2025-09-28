import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50">
      <div className="p-10 bg-white rounded-3xl shadow space-y-6 text-center">
        <h1 className="text-2xl font-bold text-emerald-700">ePharmacy Mockup</h1>
        <p className="text-gray-600">Chọn giao diện để xem</p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
          >
            Trang Admin
          </button>
          <button
            onClick={() => navigate("/user")}
            className="px-6 py-3 rounded-2xl bg-gray-900 text-white shadow hover:bg-black transition"
          >
            Trang User
          </button>
        </div>
      </div>
    </div>
  );
}
