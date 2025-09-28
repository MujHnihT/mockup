import React, { useMemo, useState } from "react";
import { Search, ShoppingCart, MessageSquare, Bell, Home, HeartPulse, Pill, Phone, User, Star, Clock, ArrowLeft, CheckCircle2, CalendarClock, Send } from "lucide-react";

// Simple shadcn/ui stand-ins (use shadcn if available in your environment)
const Button = ({ className = "", ...props }) => (
  <button className={`px-4 py-2 rounded-2xl shadow ${className}`} {...props} />
);
const Card = ({ className = "", ...props }) => (
  <div className={`rounded-2xl shadow p-4 bg-white ${className}`} {...props} />
);
const Input = ({ className = "", ...props }) => (
  <input className={`w-full rounded-xl border p-3 outline-none ${className}`} {...props} />
);
const Chip = ({ children }) => (
  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{children}</span>
);

// Palette & layout helpers
const Screen = ({ title, onBack, right, children }) => (
  <div className="max-w-sm mx-auto h-[92vh] bg-gray-50 rounded-3xl overflow-hidden border">
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="flex items-center gap-3 p-3">
        {onBack ? (
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div className="w-8" />
        )}
        <div className="font-semibold text-lg">{title}</div>
        <div className="ml-auto">{right}</div>
      </div>
    </div>
    <div className="p-4 space-y-3 overflow-y-auto h-[calc(92vh-56px)]">{children}</div>
  </div>
);

const BottomNav = ({ tab, setTab }) => (
  <div className="max-w-sm mx-auto bg-white border-t rounded-t-3xl sticky bottom-0">
    <div className="grid grid-cols-4 text-xs">
      {[
        { k: "home", label: "Trang chủ", Icon: Home },
        { k: "catalog", label: "Danh mục", Icon: Pill },
        { k: "reminders", label: "Nhắc lịch", Icon: Bell },
        { k: "profile", label: "Tài khoản", Icon: User },
      ].map(({ k, label, Icon }) => (
        <button
          key={k}
          onClick={() => setTab(k)}
          className={`flex flex-col items-center py-3 ${tab === k ? "text-emerald-600" : "text-gray-500"}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  </div>
);

// Data mocks
// const PRODUCTS = [
//   { id: "p1", name: "Enzymax", price: 189000, rating: 4.6, tag: "Tiêu hóa", img: "https://placehold.co/120x120" },
//   { id: "p2", name: "PregnaVie", price: 259000, rating: 4.7, tag: "Dinh dưỡng", img: "https://placehold.co/120x120" },
//   { id: "p3", name: "UTImax", price: 299000, rating: 4.8, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/120x120" },
// ];


const PRODUCTS = [
  { id: "p1", name: "Enzymax Kids", price: 360000, rating: 4.6, tag: "Dinh dưỡng", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Minh Thủy 1", distance: 1.2, address: "12 P. Xã Đàn, Hà Nội" } },
  { id: "p2", name: "PregnaVie", price: 600000, rating: 4.7, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Nhị Trưng 1", distance: 2.5, address: "45 Nguyễn Trãi, TP.HCM" } },
  { id: "p3", name: "UTImax", price: 500000, rating: 4.8, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Phước Thiện 1", distance: 3.1, address: "89 Lê Lợi, Đà Nẵng" } },
  { id: "p4", name: "Enzymax Duo Biotics", price: 500000, rating: 4.5, tag: "Tiêu hóa", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Nhân Hòa 1", distance: 1.9, address: "22 Kim Mã, Đà Lạt" } },
  { id: "p5", name: "Enzymax Forte", price: 600000, rating: 4.4, tag: "Dinh dưỡng", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Nhân Hòa 1", distance: 2.4, address: "5 Cầu Giấy, Đà Lạt" } },
  { id: "p6", name: "Enzymax 1st Strike", price: 300000, rating: 4.4, tag: "Tiêu hóa", img: "https://placehold.co/240x240", nearest: { name: "Nhà thuốc Nhân Hòa 1", distance: 2.4, address: "5 Cầu Giấy, Đà Lạt" } },
];

// Screens
const Onboarding = ({ onContinue }) => {
  const [goal, setGoal] = useState("Tiêu hóa");
  return (
    <Screen title="Chọn mục tiêu sức khỏe">
      <Card>
        <div className="text-sm text-gray-600 mb-2">Cá nhân hoá danh mục theo mục tiêu của bạn</div>
        <div className="grid grid-cols-3 gap-2">
          {[{k:"Tiêu hóa", Icon: HeartPulse},{k:"Dinh dưỡng", Icon: Pill},{k:"Sức khỏe Phụ nữ", Icon: User}].map(({k, Icon}) => (
            <button key={k} onClick={() => setGoal(k)} className={`p-3 rounded-2xl border flex flex-col items-center gap-2 ${goal===k?"border-emerald-500 bg-emerald-50":""}`}>
              <Icon />
              <span className="text-sm text-center">{k}</span>
            </button>
          ))}
        </div>
        <Button className="w-full mt-4 bg-emerald-600 text-white" onClick={() => onContinue(goal)}>Tiếp tục</Button>
      </Card>
      <Card>
        <div className="font-semibold">Hoặc nhập nhu cầu của bạn</div>
        <div className="mt-2 flex gap-2">
          <Input placeholder="Ví dụ: đau dạ dày, bổ sung sắt" />
          <Button className="bg-gray-900 text-white"><Search size={18}/></Button>
        </div>
      </Card>
    </Screen>
  );
};

const HomeScreen = ({ openChat, openCatalog, openFeedback }) => (
  <Screen title="ePharmacy">
    <Card className="bg-emerald-50">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-white rounded-2xl"><HeartPulse /></div>
        <div>
          <div className="font-semibold">Xin chào 👋</div>
          <div className="text-gray-600 text-sm">Bạn cần tư vấn hôm nay?</div>
        </div>
        <div className="ml-auto">
          <Button onClick={openChat} className="bg-emerald-600 text-white flex items-center gap-2"><MessageSquare size={18}/> Chat</Button>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-2 gap-3">
      <Card className="hover:shadow-md cursor-pointer" onClick={openCatalog}>
        <div className="font-semibold mb-1">Danh mục sản phẩm</div>
        <div className="text-sm text-gray-600">Xem gợi ý theo mục tiêu</div>
      </Card>
      <Card className="hover:shadow-md cursor-pointer" onClick={openFeedback}>
        <div className="font-semibold mb-1">Gửi góp ý / khiếu nại</div>
        <div className="text-sm text-gray-600">Giúp chúng tôi cải thiện</div>
      </Card>
    </div>

    <Card>
      <div className="flex items-center justify-between">
        <div className="font-semibold">Nhắc lịch hôm nay</div>
        <Chip>3 lịch</Chip>
      </div>
      <div className="mt-2 space-y-2">
        {["08:00 - Enzymax Kids", "12:00 - Enzymax Duo Biotics", "20:30 - Enzymax Forte"].map((t,i)=>(
          <div key={i} className="flex items-center gap-3">
            <Clock size={18} />
            <div className="flex-1">{t}</div>
            <CheckCircle2 className="text-gray-300" />
          </div>
        ))}
      </div>
    </Card>
  </Screen>
);

const CatalogScreen = ({ openDetail }) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <Screen title="Danh mục">
      <div className="flex gap-2">
        <Input placeholder="Tìm sản phẩm" value={q} onChange={e=>setQ(e.target.value)} />
        <Button className="bg-gray-900 text-white"><Search size={18}/></Button>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(p=> (
          <Card key={p.id} className="flex gap-3 items-center hover:shadow-md cursor-pointer" onClick={()=>openDetail(p)}>
            <img src={p.img} alt="" className="w-20 h-20 rounded-xl object-cover"/>
            <div className="flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.tag}</div>
              <div className="flex items-center gap-1 text-amber-500 text-sm"><Star size={16}/> {p.rating}</div>
            </div>
            <div className="font-semibold">{p.price.toLocaleString()}₫</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
};

const ProductDetail = ({ product, onBack, addToCart }) => (
  <Screen title={product?.name || "Chi tiết"} onBack={onBack} right={<ShoppingCart /> }>
    <Card>
      <img src={product.img} alt="" className="w-full h-40 object-cover rounded-xl"/>
      <div className="mt-3 flex items-center gap-2">
        <Chip>{product.tag}</Chip>
        <div className="flex items-center gap-1 text-amber-500 text-sm"><Star size={16}/> {product.rating}</div>
      </div>
      <div className="mt-2 text-emerald-700 font-semibold text-xl">{product.price.toLocaleString()}₫</div>
      <div className="mt-3 text-sm text-gray-700 leading-relaxed">
        Hướng dẫn sử dụng: Uống sau ăn 30 phút. Không dùng cho người mẫn cảm với thành phần.
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button className="bg-white border" onClick={onBack}>Quay lại</Button>
        <Button className="bg-emerald-600 text-white" onClick={()=>addToCart(product)}>Thêm vào giỏ</Button>
      </div>
    </Card>
  </Screen>
);

const ChatScreen = ({ onBack }) => (
  <Screen title="Tư vấn" onBack={onBack} right={<Chip>AI 24/7</Chip>}>
    <Card>
      <div className="text-sm text-gray-600 mb-2">Mô phỏng hội thoại</div>
      <div className="space-y-2">
        <div className="bg-gray-100 p-3 rounded-2xl w-4/5">Xin chào, tôi cần tư vấn về tiêu hoá.</div>
        <div className="bg-emerald-100 p-3 rounded-2xl w-4/5 ml-auto">Tôi là dược sĩ AI, bạn mô tả triệu chứng giúp mình nhé.</div>
      </div>
      <div className="mt-3 flex gap-2">
        <Input placeholder="Nhập tin nhắn" />
        <Button className="bg-emerald-600 text-white"><Send size={18}/></Button>
      </div>
      <div className="mt-4">
        <Button className="bg-white border flex items-center gap-2 w-full justify-center"><Phone size={18}/> Đặt lịch videocall</Button>
      </div>
    </Card>
  </Screen>
);

const RemindersScreen = () => (
  <Screen title="Nhắc lịch">
    <Card>
      <div className="font-semibold mb-2">Tạo nhắc lịch</div>
      <div className="grid grid-cols-1 gap-2">
        <Input placeholder="Tên thuốc / sản phẩm" />
        <div className="grid grid-cols-2 gap-2">
          <Input type="time" defaultValue="08:00" />
          <Input type="number" placeholder="Số lần/ngày" defaultValue={2} />
        </div>
        <Button className="bg-emerald-600 text-white flex items-center gap-2 justify-center"><CalendarClock size={18}/> Lưu nhắc lịch</Button>
      </div>
    </Card>

    <Card>
      <div className="font-semibold mb-2">Lịch đã tạo</div>
      {[{t:"08:00", n:"Enzymax Kids"},{t:"20:30", n:"Dinh dưỡng+"}].map((r,i)=> (
        <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="flex items-center gap-3"><Clock size={18}/> {r.t} - {r.n}</div>
          <Button className="bg-white border">Sửa</Button>
        </div>
      ))}
    </Card>
  </Screen>
);

const FeedbackScreen = ({ onBack }) => (
  <Screen title="Góp ý / Khiếu nại" onBack={onBack}>
    <Card>
      <div className="grid grid-cols-1 gap-2">
        <label className="text-sm">Loại phản hồi</label>
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-white border">Góp ý</Button>
          <Button className="bg-white border">Khiếu nại</Button>
        </div>
        <label className="text-sm mt-2">Sản phẩm</label>
        <Input placeholder="Chọn / nhập tên sản phẩm" />
        <label className="text-sm mt-2">Nội dung</label>
        <textarea className="w-full rounded-xl border p-3 min-h-[120px]" placeholder="Mô tả vấn đề hoặc góp ý của bạn" />
        <Button className="bg-emerald-600 text-white w-full">Gửi phản hồi</Button>
      </div>
    </Card>
  </Screen>
);

const ProfileScreen = () => (
  <Screen title="Tài khoản">
    <Card>
      <div className="font-semibold mb-2">Lịch sử sử dụng & đánh giá</div>
      {[{n:"Enzymax Kids", d:"07/09 - 21/09"},{n:"Enzymax Kids", d:"01/08 - 31/08"}].map((h,i)=>(
        <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div>
            <div className="font-medium">{h.n}</div>
            <div className="text-xs text-gray-500">{h.d}</div>
          </div>
          <Button className="bg-white border">Đánh giá</Button>
        </div>
      ))}
    </Card>

    <Card>
      <div className="font-semibold mb-2">Hỗ trợ</div>
      <div className="grid grid-cols-2 gap-2">
        <Button className="bg-white border">Câu hỏi thường gặp</Button>
        <Button className="bg-white border">Chính sách</Button>
      </div>
    </Card>
  </Screen>
);

export default function App() {
  const [tab, setTab] = useState("home");
  const [page, setPage] = useState("onboarding");
  const [detail, setDetail] = useState(null);

  const gotoHome = () => setPage("home");

  return (
    <div className="min-h-screen bg-neutral-100 py-4">
      {page === "onboarding" && <Onboarding onContinue={() => setPage("home")} />}
      {page === "home" && (
        <>
          <HomeScreen
            openChat={() => setPage("chat")}
            openCatalog={() => { setTab("catalog"); setPage("tabs"); }}
            openFeedback={() => setPage("feedback")} />
          <BottomNav tab={"home"} setTab={(k)=> { setTab(k); setPage("tabs"); }} />
        </>
      )}
      {page === "tabs" && (
        <>
          {tab === "home" && <HomeScreen openChat={() => setPage("chat")} openCatalog={() => { setTab("catalog"); }} openFeedback={() => setPage("feedback")} />}
          {tab === "catalog" && <CatalogScreen openDetail={(p)=> { setDetail(p); setPage("detail"); }} />}
          {tab === "reminders" && <RemindersScreen />}
          {tab === "profile" && <ProfileScreen />}
          <BottomNav tab={tab} setTab={setTab} />
        </>
      )}
      {page === "detail" && detail && (
        <ProductDetail product={detail} onBack={() => setPage("tabs")} addToCart={() => alert("Đã thêm vào giỏ")}/>
      )}
      {page === "chat" && <ChatScreen onBack={gotoHome} />}
      {page === "feedback" && <FeedbackScreen onBack={gotoHome} />}
    </div>
  );
}
