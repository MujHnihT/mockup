import React, { useMemo, useState } from "react";
import { Search, MessageSquare, Bell, HeartPulse, Pill, Phone, User, Star, Clock, MapPin, Navigation, Send, Store, X, ChevronRight } from "lucide-react";

// === Primitive UI (replace with shadcn/ui in real app) ===
const Button = ({ className = "", ...props }) => (
  <button className={`px-3 py-2 rounded-xl shadow text-sm ${className}`} {...props} />
);
const Input = ({ className = "", ...props }) => (
  <input className={`rounded-xl border px-3 py-2 outline-none text-sm ${className}`} {...props} />
);
const Card = ({ className = "", ...props }) => (
  <div className={`rounded-2xl shadow bg-white ${className}`} {...props} />
);
const Chip = ({ children }) => (
  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{children}</span>
);

// === Mock data ===
const PRODUCTS = [
  { id: "p1", name: "Enzymax Kids", price: 189000, rating: 4.6, tag: "Dinh dưỡng", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Minh An", distance: 1.2, address: "12 P. Xã Đàn, Hà Nội" } },
  { id: "p2", name: "PregnaVie", price: 259000, rating: 4.7, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Sài Gòn", distance: 2.5, address: "45 Nguyễn Trãi, TP.HCM" } },
  { id: "p3", name: "UTImax", price: 299000, rating: 4.8, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Hoà Bình", distance: 3.1, address: "89 Lê Lợi, Đà Nẵng" } },
  { id: "p4", name: "Enzymax Duo Biotics", price: 239000, rating: 4.5, tag: "Tiêu hóa", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Thành Công", distance: 1.9, address: "22 Kim Mã, Hà Nội" } },
  { id: "p5", name: "Enzymax Forte", price: 199000, rating: 4.4, tag: "Dinh dưỡng", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Gia An", distance: 2.4, address: "5 Cầu Giấy, Hà Nội" } },
  { id: "p6", name: "Enzymax 1st Strike", price: 199000, rating: 4.4, tag: "Tiêu hóa", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Gia An", distance: 2.4, address: "5 Cầu Giấy, Hà Nội" } },
];

const NEARBY = [
  { id: "nt1", name: "Nhà thuốc Minh An", distance: 1.2, address: "12 P. Xã Đàn, Hà Nội" },
  { id: "nt2", name: "Nhà thuốc Thành Công", distance: 1.9, address: "22 Kim Mã, Hà Nội" },
  { id: "nt3", name: "Nhà thuốc Gia An", distance: 2.4, address: "5 Cầu Giấy, Hà Nội" },
  { id: "nt4", name: "Nhà thuốc Hòa Bình", distance: 3.1, address: "89 Lê Lợi, Đà Nẵng" },
];

// === Layout Shell ===
const Sidebar = ({ section, setSection }) => (
  <div className="w-64 bg-white border-r h-screen sticky top-0 p-4 space-y-2">
    <div className="flex items-center gap-2 text-emerald-700 font-semibold"><HeartPulse/> ePharmacy</div>
    {[
      { k: "home", label: "Trang chủ" },
      { k: "catalog", label: "Danh mục" },
      { k: "reminders", label: "Nhắc lịch" },
      { k: "feedback", label: "Góp ý/Khiếu nại" },
      { k: "nearby", label: "Nhà thuốc gần bạn" },
    ].map(it => (
      <button key={it.k} onClick={()=>setSection(it.k)} className={`w-full text-left px-3 py-2 rounded-xl text-sm ${section===it.k? 'bg-emerald-50 text-emerald-700':'hover:bg-gray-50 text-gray-700'}`}>{it.label}</button>
    ))}

    <div className="mt-6">
      <div className="text-xs text-gray-500 mb-2">Mục tiêu sức khỏe</div>
      <div className="grid grid-cols-2 gap-2">
        {["Tiêu hóa","Dinh dưỡng","Phụ nữ","Giấc ngủ"].map(g => (
          <Button key={g} className="bg-white border">{g}</Button>
        ))}
      </div>
    </div>
  </div>
);

const Topbar = ({ onOpenChat }) => (
  <div className="h-16 bg-white border-b px-4 flex items-center gap-3 sticky top-0 z-10">
    <div className="w-80 flex items-center gap-2">
      <Input className="w-full" placeholder="Tìm sản phẩm, triệu chứng…" />
      <Button className="bg-gray-900 text-white"><Search size={16}/></Button>
    </div>
    <div className="ml-auto flex items-center gap-2">
      <Button className="bg-emerald-600 text-white flex items-center gap-2" onClick={onOpenChat}><MessageSquare size={16}/> Chat tư vấn</Button>
      <Button className="bg-white border flex items-center gap-2"><Bell size={16}/> Nhắc lịch</Button>
    </div>
  </div>
);

// === Feature Blocks ===
const CatalogGrid = ({ openDetail }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input className="w-80" placeholder="Lọc theo tên" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="p-3 hover:shadow-lg transition cursor-pointer" onClick={()=>openDetail(p)}>
            <img src={p.img} alt="" className="w-full aspect-square object-cover rounded-xl" />
            <div className="mt-2 font-semibold">{p.name}</div>
            <div className="text-xs text-gray-600">{p.tag}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-amber-500 text-sm"><Star size={16}/> {p.rating}</div>
              <div className="text-emerald-700 font-semibold">{p.price.toLocaleString()}₫</div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700"><MapPin size={14}/> {p.nearest.name} • {p.nearest.distance} km</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProductDrawer = ({ product, onClose, openNearby }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex">
      <div className="ml-auto w-full max-w-xl h-full bg-white shadow-2xl p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3">
          <Button className="bg-white border" onClick={onClose}><X size={16}/></Button>
          <div className="font-semibold text-lg">{product.name}</div>
          <div className="ml-auto text-emerald-700 font-semibold">{product.price.toLocaleString()}₫</div>
        </div>
        <img src={product.img} alt="" className="w-full h-64 object-cover rounded-xl" />
        <div className="mt-3 flex items-center gap-2">
          <Chip>{product.tag}</Chip>
          <div className="flex items-center gap-1 text-amber-500 text-sm"><Star size={16}/> {product.rating}</div>
        </div>
        <div className="mt-3 text-sm text-gray-700 leading-relaxed">
          Hướng dẫn sử dụng: Uống sau ăn 30 phút. Không dùng cho người mẫn cảm với thành phần.
        </div>
        <Card className="p-3 mt-4">
          <div className="font-semibold mb-1">Nhà thuốc gần nhất</div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-50"><Store className="text-emerald-700"/></div>
            <div className="flex-1 text-sm">
              <div className="font-medium">{product.nearest.name} • {product.nearest.distance} km</div>
              <div className="text-gray-600">{product.nearest.address}</div>
            </div>
            <div className="grid gap-2">
              <Button className="bg-white border text-xs flex items-center gap-1"><Navigation size={14}/> Chỉ đường</Button>
              <Button className="bg-emerald-600 text-white text-xs">Gọi đặt mua</Button>
            </div>
          </div>
          <Button className="mt-3 bg-white border w-full" onClick={openNearby}>Xem nhà thuốc khác</Button>
        </Card>
      </div>
    </div>
  );
};

const RemindersPanel = () => (
  <Card className="p-4">
    <div className="font-semibold mb-2">Nhắc lịch hôm nay</div>
    {["08:00 - Enzymax Kids", "12:00 - Omega", "20:30 - Dinh dưỡng+"].map((t,i)=>(
      <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0">
        <Clock size={18} />
        <div className="flex-1 text-sm">{t}</div>
      </div>
    ))}
  </Card>
);

const NearbyList = () => (
  <Card className="p-4">
    <div className="font-semibold mb-2">Nhà thuốc gần bạn</div>
    <div className="space-y-2">
      {NEARBY.map(p => (
        <div key={p.id} className="p-3 rounded-xl border flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-50"><MapPin className="text-emerald-700"/></div>
          <div className="flex-1 text-sm">
            <div className="font-medium">{p.name}</div>
            <div className="text-gray-600">{p.address}</div>
            <div className="text-emerald-700 mt-1">{p.distance} km</div>
          </div>
          <div className="grid gap-2">
            <Button className="bg-white border text-xs flex items-center gap-1"><Navigation size={14}/> Chỉ đường</Button>
            <Button className="bg-emerald-600 text-white text-xs">Gọi đặt mua</Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const FeedbackForm = () => (
  <Card className="p-4">
    <div className="font-semibold mb-2">Góp ý / Khiếu nại</div>
    <div className="grid grid-cols-2 gap-3">
      <select className="rounded-xl border px-3 py-2 text-sm">
        <option>Góp ý</option>
        <option>Khiếu nại</option>
      </select>
      <Input placeholder="Sản phẩm" />
      <textarea className="col-span-2 rounded-xl border p-3 min-h-[120px] text-sm" placeholder="Mô tả vấn đề hoặc góp ý của bạn" />
      <Button className="col-span-2 bg-emerald-600 text-white">Gửi phản hồi</Button>
    </div>
  </Card>
);

const ChatWidget = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden z-50">
      <div className="h-10 bg-emerald-600 text-white flex items-center justify-between px-3">
        <div className="text-sm font-medium">Tư vấn AI 24/7</div>
        <button onClick={onClose}><X size={16}/></button>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-auto text-sm">
        <div className="bg-gray-100 p-2 rounded-xl w-4/5">Xin chào, tôi cần tư vấn về tiêu hoá.</div>
        <div className="bg-emerald-100 p-2 rounded-xl w-4/5 ml-auto">Tôi là dược sĩ AI, bạn mô tả triệu chứng giúp mình nhé.</div>
      </div>
      <div className="p-3 flex items-center gap-2 border-t">
        <Input className="flex-1" placeholder="Nhập tin nhắn" />
        <Button className="bg-emerald-600 text-white"><Send size={16}/></Button>
      </div>
    </div>
  );
};

export default function WebUserApp() {
  const [section, setSection] = useState("home");
  const [detail, setDetail] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <Sidebar section={section} setSection={setSection} />
        <div className="flex-1">
          <Topbar onOpenChat={()=>setChatOpen(true)} />
          <div className="p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              {section === "home" && (
                <>
                  <Card className="p-6 bg-emerald-50">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white rounded-2xl"><HeartPulse/></div>
                      <div>
                        <div className="font-semibold text-lg">Xin chào 👋</div>
                        <div className="text-gray-600 text-sm">Bạn cần tư vấn hay tìm sản phẩm phù hợp hôm nay?</div>
                      </div>
                    </div>
                  </Card>
                  <CatalogGrid openDetail={setDetail} />
                </>
              )}
              {section === "catalog" && <CatalogGrid openDetail={setDetail} />}
              {section === "feedback" && <FeedbackForm />}
              {section === "nearby" && <NearbyList />}
              {section === "reminders" && <RemindersPanel />}
            </div>
            <div className="space-y-6">
              <RemindersPanel />
              <NearbyList />
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>

      <ProductDrawer product={detail} onClose={()=>setDetail(null)} openNearby={()=>setSection('nearby')} />
      <ChatWidget open={chatOpen} onClose={()=>setChatOpen(false)} />

      <button onClick={()=>setChatOpen(true)} className="fixed bottom-4 right-4 p-3 rounded-full shadow-xl bg-emerald-600 text-white flex items-center gap-2">
        <MessageSquare size={18}/> Chat
      </button>
    </div>
  );
}
