import React, { useMemo, useState } from "react";
import { LayoutGrid, Package, BarChart3, Users, MessageSquareWarning, Settings, Activity, Search, Plus, Edit3, Trash2, Filter, Eye, Download, CheckCircle2, XCircle, Shield, Store, PhoneCall, Calendar, TrendingUp } from "lucide-react";

// Tiny UI helpers (swap to shadcn/ui in real app)
const Button = ({ className = "", ...props }) => (
  <button className={`px-3 py-2 rounded-2xl shadow text-sm ${className}`} {...props} />
);
const Input = ({ className = "", ...props }) => (
  <input className={`rounded-xl border p-2 outline-none text-sm ${className}`} {...props} />
);
const Select = ({ className = "", children, ...props }) => (
  <select className={`rounded-xl border p-2 text-sm ${className}`} {...props}>{children}</select>
);
const Card = ({ className = "", ...props }) => (
  <div className={`rounded-2xl shadow bg-white ${className}`} {...props} />
);
const Badge = ({ children, className = "" }) => (
  <span className={`text-xs px-2 py-1 rounded-full ${className}`}>{children}</span>
);


const productsSeed = [
  { id: "p1", name: "Enzymax Kids", price: 360000, rating: 4.6, tag: "Dinh dưỡng", img: "https://placehold.co/240x240" },
  { id: "p2", name: "PregnaVie", price: 600000, rating: 4.7, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240" },
  { id: "p3", name: "UTImax", price: 500000, rating: 4.8, tag: "Sức khỏe Phụ nữ", img: "https://placehold.co/240x240" },
  { id: "p4", name: "Enzymax Duo Biotics", price: 500000, rating: 4.5, tag: "Tiêu hóa", img: "https://placehold.co/240x240" },
  { id: "p5", name: "Enzymax Forte", price: 600000, rating: 4.4, tag: "Dinh dưỡng", img: "https://placehold.co/240x240" },
  { id: "p6", name: "Enzymax 1st Strike", price: 300000, rating: 4.4, tag: "Tiêu hóa", img: "https://placehold.co/240x240"},
];



// // Fake data
// const productsSeed = [
//   { id: "P001", name: "Enzymax", price: 189000, stock: 120, status: "Active", category: "Tiêu hóa" },
//   { id: "P002", name: "PregnaVie", price: 259000, stock: 54, status: "Active", category: "Dinh dưỡng" },
//   { id: "P003", name: "UTImax", price: 299000, stock: 0, status: "Draft", category: "Sức khỏe Phụ nữ" },
//   { id: "P001", name: "Enzymax", price: 189000, stock: 120, status: "Active", category: "Tiêu hóa" },
//   { id: "P002", name: "PregnaVie", price: 259000, stock: 54, status: "Active", category: "Dinh dưỡng" },
//   { id: "P003", name: "UTImax", price: 299000, stock: 0, status: "Draft", category: "Sức khỏe Phụ nữ" },
// ];

// Interest metrics per product (mock last 7 days)
const interestSeed = [
  { id: "P001", views: 1820, wishlist: 240, chats: 64, reminders: 112, nearClicks: 331, trend: 12 },
  { id: "P002", views: 1422, wishlist: 198, chats: 41, reminders: 77, nearClicks: 210, trend: -3 },
  { id: "P003", views: 980, wishlist: 126, chats: 22, reminders: 39, nearClicks: 95, trend: 5 },
];

const feedbackSeed = [
  { id: "F001", type: "Góp ý", product: "Enzymax", user: "Phạm D", createdAt: "2025-09-17 08:11", status: "Open" },
  { id: "F002", type: "Khiếu nại", product: "PregnaVie", user: "Đỗ E", createdAt: "2025-09-18 12:45", status: "In Progress" },
];

const pharmaciesSeed = [
  { id: "NT001", name: "Nhà thuốc Minh Thủy 1", city: "Hà Nội", phone: "0123 456 789", status: "Active" },
  { id: "NT002", name: "Nhà thuốc Minh Thủy 2", city: "Hà Nội", phone: "0123 456 789", status: "Active" },
  { id: "NT003", name: "Nhà thuốc Nhị Trưng 1", city: "TP.HCM", phone: "0987 654 321", status: "Active" },
  { id: "NT004", name: "Nhà thuốc Hữu Nghị", city: "TP.HCM", phone: "0987 654 321", status: "Inactive" },
  { id: "NT005", name: "Nhà thuốc Phước Thiện 1", city: "Đà Nẵng", phone: "0987 654 321", status: "Active" },
  { id: "NT006", name: "Nhà thuốc Nhân Hòa 1", city: "Đà Lạt", phone: "0987 654 321", status: "Active" },
  { id: "NT007", name: "Nhà thuốc Nhân Hòa 2", city: "Đà Lạt", phone: "0987 654 321", status: "Active" },
];

// Layout
const Sidebar = ({ tab, setTab }) => (
  <div className="h-screen w-64 bg-white border-r p-3 flex flex-col gap-2">
    <div className="flex items-center gap-2 px-2 py-3 text-emerald-700 font-semibold"><LayoutGrid/> ePharmacy Admin</div>
    {[
      { k: "dashboard", label: "Dashboard", Icon: Activity },
      { k: "products", label: "Products", Icon: Package },
      { k: "interest", label: "Product Interest", Icon: BarChart3 },
      { k: "pharmacies", label: "Linked Pharmacies", Icon: Store },
      { k: "feedback", label: "Feedback & Complaints", Icon: MessageSquareWarning },
      { k: "users", label: "Users & Pharmacists", Icon: Users },
      { k: "settings", label: "Settings", Icon: Settings },
    ].map(({ k, label, Icon }) => (
      <button key={k} onClick={()=>setTab(k)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left ${tab===k?"bg-emerald-50 text-emerald-700":"hover:bg-gray-50 text-gray-700"}`}>
        <Icon size={18}/> {label}
      </button>
    ))}
    <div className="mt-auto text-xs text-gray-400 px-2">Phase 1 • mock</div>
  </div>
);

const Header = () => (
  <div className="h-16 bg-white border-b px-4 flex items-center gap-2 sticky top-0 z-10">
    <Input className="w-96" placeholder="Search…" />
    <Button className="bg-gray-900 text-white flex items-center gap-2"><Search size={16}/> Search</Button>
    <div className="ml-auto flex items-center gap-2">
      <Badge className="bg-emerald-50 text-emerald-700">Phase 1</Badge>
      <Badge className="bg-gray-100">Mock</Badge>
    </div>
  </div>
);

// Reusable table
const Table = ({ cols, rows, rowKey, renderActions }) => (
  <div className="overflow-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500">
          {cols.map((c,i)=>(<th key={i} className="px-3 py-2 font-medium">{c}</th>))}
          {renderActions && <th className="px-3 py-2"/>}
        </tr>
      </thead>
      <tbody>
        {rows.map((r)=> (
          <tr key={r[rowKey]} className="border-t hover:bg-gray-50">
            {Object.values(r).map((v,i)=>(<td key={i} className="px-3 py-2 align-top">{v}</td>))}
            {renderActions && <td className="px-3 py-2">{renderActions(r)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Simple bar metric component
const Bar = ({ value, max }) => (
  <div className="w-40 h-2 bg-gray-100 rounded-full overflow-hidden">
    <div className="h-2 bg-emerald-500" style={{ width: `${Math.min(100, (value/max)*100)}%` }} />
  </div>
);

// DASHBOARD
const Dashboard = () => {
  const totals = interestSeed.reduce((acc, r) => {
    acc.views += r.views; acc.wishlist += r.wishlist; acc.chats += r.chats; acc.reminders += r.reminders; acc.nearClicks += r.nearClicks; return acc;
  }, { views:0,wishlist:0,chats:0,reminders:0,nearClicks:0 });
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-4 flex items-center gap-3"><TrendingUp className="text-emerald-600"/> <div><div className="text-xs text-gray-500">Views (7d)</div><div className="text-lg font-semibold">{totals.views.toLocaleString()}</div></div></Card>
        <Card className="p-4 flex items-center gap-3"><Activity className="text-emerald-600"/> <div><div className="text-xs text-gray-500">Wishlists (7d)</div><div className="text-lg font-semibold">{totals.wishlist.toLocaleString()}</div></div></Card>
        <Card className="p-4 flex items-center gap-3"><MessageSquareWarning className="text-emerald-600"/> <div><div className="text-xs text-gray-500">Chat Inquiries (7d)</div><div className="text-lg font-semibold">{totals.chats.toLocaleString()}</div></div></Card>
        <Card className="p-4 flex items-center gap-3"><Calendar className="text-emerald-600"/> <div><div className="text-xs text-gray-500">Reminders Set (7d)</div><div className="text-lg font-semibold">{totals.reminders.toLocaleString()}</div></div></Card>
        <Card className="p-4 flex items-center gap-3"><Store className="text-emerald-600"/> <div><div className="text-xs text-gray-500">Nearest Clicks (7d)</div><div className="text-lg font-semibold">{totals.nearClicks.toLocaleString()}</div></div></Card>
      </div>

      <Card className="p-4">
        <div className="font-semibold mb-2">Top Products by Interest</div>
        <Table
          cols={["ID","Name","Views","Wishlists","Chats","Reminders","Near Clicks","Trend"]}
          rows={interestSeed
            .map(m => ({
              ID: m.id,
              Name: productsSeed.find(p=>p.id===m.id)?.name || m.id,
              Views: <div className="flex items-center gap-2">{m.views.toLocaleString()} <Bar value={m.views} max={2000}/></div>,
              Wishlists: m.wishlist,
              Chats: m.chats,
              Reminders: m.reminders,
              NearClicks: m.nearClicks,
              Trend: <Badge className={`${m.trend>=0? 'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>{m.trend>=0? '+':''}{m.trend}%</Badge>
            }))
            .sort((a,b)=> (b.Views.props.children[0]-a.Views.props.children[0]))}
          rowKey="ID"
          renderActions={(r)=> <Button className="bg-white border flex items-center gap-1"><Eye size={14}/> Detail</Button>}
        />
      </Card>
    </div>
  );
};

// PRODUCTS
const Products = () => {
  const [rows, setRows] = useState(productsSeed);
  const [q, setQ] = useState("");
  const filtered = useMemo(()=> rows.filter(r => r.name.toLowerCase().includes(q.toLowerCase())), [rows, q]);
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input placeholder="Search products…" value={q} onChange={e=>setQ(e.target.value)} />
        <Select>
          <option>All categories</option>
          <option>Tiêu hóa</option>
          <option>Dinh dưỡng</option>
          <option>Sức khỏe Phụ nữ</option>
        </Select>
        <Select>
          <option>All status</option>
          <option>Active</option>
          <option>Draft</option>
        </Select>
        <Button className="bg-emerald-600 text-white flex items-center gap-1 ml-auto"><Plus size={16}/> New Product</Button>
      </Card>

      <Card className="p-0">
        <Table
          cols={["ID","Name","Price","Stock","Status","Category"]}
          rows={filtered.map(p=> ({ ID:p.id, Name:p.name, Price:`₫ ${p.price.toLocaleString()}`, Stock:p.stock, Status: <Badge className={`${p.status==='Active'?'bg-emerald-50 text-emerald-700':'bg-gray-100'}`}>{p.status}</Badge>, Category:p.category }))}
          rowKey="ID"
          renderActions={(r)=> (
            <div className="flex gap-2">
              <Button className="bg-white border"><Edit3 size={14}/></Button>
              <Button className="bg-white border"><Trash2 size={14}/></Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

// INTEREST (replacing Orders)
const Interest = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(()=> interestSeed.filter(m => m.id.toLowerCase().includes(q.toLowerCase()) || (productsSeed.find(p=>p.id===m.id)?.name.toLowerCase()||"").includes(q.toLowerCase())), [q]);
  const maxViews = Math.max(...interestSeed.map(i=>i.views));
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input placeholder="Search product or ID…" value={q} onChange={e=>setQ(e.target.value)} />
        <Select>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Custom…</option>
        </Select>
        <Button className="bg-white border flex items-center gap-1"><Filter size={16}/> Filter</Button>
        <Button className="bg-gray-900 text-white flex items-center gap-1 ml-auto"><Download size={16}/> Export CSV</Button>
      </Card>

      <Card className="p-0">
        <Table
          cols={["ID","Name","Views","Wishlist","Chats","Reminders","Nearest Clicks","Trend"]}
          rows={filtered.map(m=> ({
            ID: m.id,
            Name: productsSeed.find(p=>p.id===m.id)?.name || m.id,
            Views: <div className="flex items-center gap-2">{m.views.toLocaleString()} <Bar value={m.views} max={maxViews}/></div>,
            Wishlist: m.wishlist,
            Chats: m.chats,
            Reminders: m.reminders,
            NearClicks: m.nearClicks,
            Trend: <Badge className={`${m.trend>=0? 'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>{m.trend>=0? '+':''}{m.trend}%</Badge>
          }))}
          rowKey="ID"
          renderActions={(r)=> (
            <div className="flex gap-2">
              <Button className="bg-white border"><Eye size={14}/> </Button>
              <Button className="bg-white border"><CheckCircle2 size={14}/> Set goal</Button>
              <Button className="bg-white border"><XCircle size={14}/> Mute</Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

// PHARMACIES (linked partners)
const Pharmacies = () => {
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input placeholder="Search pharmacy…" />
        <Select>
          <option>All status</option>
          <option>Active</option>
          <option>Inactive</option>
        </Select>
        <Button className="bg-emerald-600 text-white flex items-center gap-1 ml-auto"><Plus size={16}/> Add Pharmacy</Button>
      </Card>

      <Card className="p-0">
        <Table
          cols={["ID","Name","City","Phone","Status"]}
          rows={pharmaciesSeed.map(p=> ({ ID:p.id, Name:p.name, City:p.city, Phone:p.phone, Status: <Badge className={`${p.status==='Active'?'bg-emerald-50 text-emerald-700':'bg-gray-100'}`}>{p.status}</Badge> }))}
          rowKey="ID"
          renderActions={(r)=> (
            <div className="flex gap-2">
              <Button className="bg-white border"><PhoneCall size={14}/></Button>
              <Button className="bg-white border"><Edit3 size={14}/></Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

// USERS (customers & pharmacists)
const UsersView = () => {
  const seed = [
    { id: "U001", name: "Dược sĩ Lan", role: "Pharmacist", phone: "0901 234 567", status: "Online" },
    { id: "U002", name: "Nguyễn Văn H", role: "Customer", phone: "0933 222 111", status: "Offline" },
  ];
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input placeholder="Search user…" />
        <Select>
          <option>All roles</option>
          <option>Customer</option>
          <option>Pharmacist</option>
          <option>Admin</option>
        </Select>
      </Card>

      <Card className="p-0">
        <Table
          cols={["ID","Name","Role","Phone","Status"]}
          rows={seed.map(u=> ({ ID:u.id, Name:u.name, Role:u.role, Phone:u.phone, Status:u.status }))}
          rowKey="ID"
          renderActions={(r)=> (
            <div className="flex gap-2">
              <Button className="bg-white border"><Edit3 size={14}/></Button>
              <Button className="bg-white border"><Trash2 size={14}/></Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

// FEEDBACK
const Feedback = () => {
  const [q, setQ] = useState("");
  const filtered = useMemo(()=> feedbackSeed.filter(f => f.id.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="p-4 space-y-4">
      <Card className="p-4 flex items-center gap-2">
        <Input placeholder="Search ticket ID…" value={q} onChange={e=>setQ(e.target.value)}/>
        <Select>
          <option>All types</option>
          <option>Góp ý</option>
          <option>Khiếu nại</option>
        </Select>
        <Select>
          <option>All status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </Select>
        <Button className="bg-white border flex items-center gap-1"><Filter size={16}/> Filter</Button>
      </Card>

      <Card className="p-0">
        <Table
          cols={["ID","Type","Product","User","Created","Status"]}
          rows={filtered.map(f=> ({ ID:f.id, Type:f.type, Product:f.product, User:f.user, Created:f.createdAt, Status: <Badge className={`${f.status==='Resolved'?'bg-emerald-50 text-emerald-700': f.status==='In Progress'?'bg-amber-50 text-amber-700':'bg-gray-100'}`}>{f.status}</Badge> }))}
          rowKey="ID"
          renderActions={(r)=> (
            <div className="flex gap-2">
              <Button className="bg-white border"><Eye size={14}/></Button>
              <Button className="bg-white border"><CheckCircle2 size={14}/> Resolve</Button>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

// SETTINGS
const SettingsView = () => (
  <div className="p-4 space-y-4">
  

    <Card className="p-4">
      <div className="font-semibold mb-3">Operational</div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Business Hours</div>
          <Input placeholder="08:00-17:30" />
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">SLA (Feedback)</div>
          <Input placeholder="24h first response" />
        </div>
    
      </div>
    </Card>
  </div>
);

export default function AdminApp() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        <Sidebar tab={tab} setTab={setTab} />
        <div className="flex-1">
          <Header />
          {tab === "dashboard" && <Dashboard />}
          {tab === "products" && <Products />}
          {tab === "interest" && <Interest />}
          {tab === "pharmacies" && <Pharmacies />}
          {tab === "feedback" && <Feedback />}
          {tab === "users" && <UsersView />}
          {tab === "settings" && <SettingsView />}
        </div>
      </div>
    </div>
  );
}
