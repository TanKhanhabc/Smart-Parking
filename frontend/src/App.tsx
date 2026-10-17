import { useEffect, useState } from 'react'
import { Activity, ArrowDownRight, ArrowUpRight, Bell, CarFront, ChartNoAxesCombined, ChevronDown, CircleParking, Clock3, LayoutDashboard, MapPin, Search, Settings2, ShieldCheck, Sparkles, TrendingUp, Truck, Zap } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const occupancy = [
  { time: '06:00', value: 18 }, { time: '08:00', value: 42 }, { time: '10:00', value: 68 },
  { time: '12:00', value: 57 }, { time: '14:00', value: 79 }, { time: '16:00', value: 86 },
  { time: '18:00', value: 71 }, { time: '20:00', value: 38 },
]
const slots = Array.from({ length: 36 }, (_, i) => ({
  id: `A-${String(i + 1).padStart(2, '0')}`,
  status: [1, 4, 5, 8, 11, 14, 15, 18, 20, 24, 26, 29, 31, 34].includes(i) ? 'occupied' : [7, 22].includes(i) ? 'reserved' : 'free',
}))
const events = [
  { plate: '51H · 482.16', type: 'Ô tô', action: 'Vào bãi', time: '14:32:08', color: 'blue' },
  { plate: '59X3 · 217.84', type: 'Xe máy', action: 'Ra bãi', time: '14:29:41', color: 'violet' },
  { plate: '51K · 903.21', type: 'Ô tô', action: 'Vào bãi', time: '14:25:19', color: 'blue' },
  { plate: '50F · 118.62', type: 'Xe máy', action: 'Vào bãi', time: '14:18:03', color: 'violet' },
]
const nav = [
  { label: 'Tổng quan', icon: LayoutDashboard },
  { label: 'Bãi đỗ xe', icon: CircleParking },
  { label: 'Nhận diện xe', icon: CarFront },
  { label: 'Dự đoán AI', icon: ChartNoAxesCombined },
  { label: 'Báo cáo', icon: Activity },
]
export default function App() {
  const [active, setActive] = useState('Tổng quan')
  const [now, setNow] = useState(new Date())
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer) }, [])
  const free = slots.filter(s => s.status === 'free').length
  const occupied = slots.filter(s => s.status === 'occupied').length
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-icon"><CircleParking size={24}/></div><div><strong>parkwise<span>.</span></strong><small>SMART MOBILITY PLATFORM</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="site-select"><div className="site-dot"/><div><b>SGU Campus Parking</b><small>Ho Chi Minh City, VN</small></div><ChevronDown size={16}/></div>
      <div className="nav-label">MENU CHÍNH</div>
      <nav>{nav.map(item => <button key={item.label} onClick={() => setActive(item.label)} className={`nav-item ${active === item.label ? 'active' : ''}`}><item.icon size={18}/><span>{item.label}</span>{item.label === 'Dự đoán AI' && <span className="new-tag">AI</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="status-card"><div className="status-top"><span className="pulse-dot"/> HỆ THỐNG HOẠT ĐỘNG</div><p>Tất cả dịch vụ đang vận hành bình thường.</p><div className="status-line"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div><button className="nav-item"><Settings2 size={18}/><span>Cài đặt</span></button><div className="profile"><div className="avatar">SP</div><div><b>Parking Admin</b><small>Quản trị viên</small></div><ChevronDown size={15}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div><div className="top-actions"><div className="live-clock"><span className="pulse-dot"/><span>LIVE</span><b>{now.toLocaleTimeString('vi-VN')}</b></div><button className="icon-button" aria-label="Tìm kiếm"><Search size={18}/></button><button className="icon-button notification" aria-label="Thông báo"><Bell size={18}/><i/></button><div className="top-avatar">SP</div></div></header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> SMART PARKING INTELLIGENCE</div><h1>{active === 'Tổng quan' ? 'Bãi đỗ xe, trong tầm kiểm soát.' : active}</h1><p>Theo dõi vận hành và khai thác sức mạnh AI theo thời gian thực.</p></div><button className="date-button"><Clock3 size={16}/> Hôm nay, {now.toLocaleDateString('vi-VN')} <ChevronDown size={15}/></button></section>
        <section className="hero-banner"><div className="hero-copy"><div className="hero-pill"><Zap size={13}/> AI-POWERED PARKING</div><h2>Không gian thông minh.<br/><span>Di chuyển dễ dàng.</span></h2><p>Hệ thống đang giám sát <b>36 vị trí đỗ xe</b> với phân tích AI và cập nhật trạng thái trực quan.</p><button className="hero-button" onClick={() => setActive('Bãi đỗ xe')}>Khám phá bãi đỗ <span>↗</span></button></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-glow"/><div className="parking-sign"><CircleParking size={70} strokeWidth={1.3}/><span>SMART<br/>PARKING</span></div><div className="floating-chip chip-one"><span className="chip-icon"><CarFront size={17}/></span><div><small>ĐANG ĐỖ</small><b>22 xe</b></div></div><div className="floating-chip chip-two"><span className="chip-icon green"><ShieldCheck size={17}/></span><div><small>ĐỘ CHÍNH XÁC AI</small><b>98.4%</b></div></div></div><div className="hero-grid"/></section>
        <div className="section-heading"><div><h2>Tổng quan vận hành</h2><p>Các chỉ số chính của bãi đỗ xe</p></div><span className="updated"><span className="pulse-dot"/> Cập nhật trực tiếp</span></div>
        <section className="stats-grid">
          <Stat title="Tổng vị trí đỗ" value="36" note="Toàn bộ khu vực" icon={<CircleParking/>} tone="cyan" trend="Bãi đỗ hiện tại"/>
          <Stat title="Vị trí còn trống" value={String(free).padStart(2,'0')} note="Có thể sử dụng ngay" icon={<MapPin/>} tone="green" trend="Sẵn sàng"/>
          <Stat title="Đang sử dụng" value={String(occupied).padStart(2,'0')} note={`${Math.round(occupied / slots.length * 100)}% công suất`} icon={<CarFront/>} tone="violet" trend="Đang hoạt động"/>
          <Stat title="Lượt xe hôm nay" value="248" note="+12.8% so với hôm qua" icon={<TrendingUp/>} tone="orange" trend="↑ 12.8%"/>
        </section>
        <section className="dashboard-grid">
          <div className="panel occupancy-panel"><div className="panel-heading"><div><h3>Tỷ lệ lấp đầy bãi đỗ</h3><p>Biến động công suất theo thời gian</p></div><button className="select-small">Hôm nay <ChevronDown size={14}/></button></div><div className="chart-summary"><strong>68.4<span>%</span></strong><span className="trend-up"><ArrowUpRight size={15}/> 8.2%</span><small>so với ngày hôm qua</small></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={occupancy} margin={{ top: 10, right: 6, left: -22, bottom: 0 }}><defs><linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity={0.25}/><stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#243249" strokeDasharray="4 5" vertical={false}/><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8493a9', fontSize: 11 }} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8493a9', fontSize: 11 }} unit="%" domain={[0,100]}/><Tooltip contentStyle={{ background: '#111c2f', border: '1px solid #2b3b53', borderRadius: 10, color: '#e5edf7' }} formatter={(v) => [`${v}%`, 'Lấp đầy']}/><Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2.5} fill="url(#occupancyGradient)" activeDot={{ r: 5, fill: '#38bdf8', stroke: '#0b1220', strokeWidth: 3 }}/></AreaChart></ResponsiveContainer></div><div className="chart-footer"><span><i className="legend-dot cyan-dot"/> Tỷ lệ lấp đầy</span><span>Đỉnh điểm: <b>16:00 – 86%</b></span></div></div>
          <div className="panel distribution-panel"><div className="panel-heading"><div><h3>Tình trạng chỗ đỗ</h3><p>Phân bổ theo trạng thái hiện tại</p></div><button className="more-button">•••</button></div><div className="donut-wrap"><div className="donut"><div className="donut-center"><strong>{slots.length}</strong><span>TỔNG CHỖ</span></div></div></div><div className="legend-list"><Legend color="free" label="Còn trống" value={free}/><Legend color="occupied" label="Đang sử dụng" value={occupied}/><Legend color="reserved" label="Đã đặt trước" value={2}/></div><div className="distribution-note"><Activity size={15}/><span>Dữ liệu demo minh họa giao diện</span></div></div>
        </section>
        <section className="panel parking-panel"><div className="panel-heading"><div><h3>Sơ đồ bãi đỗ xe</h3><p>Khu vực A · Tầng trệt · 36 vị trí</p></div><button className="outline-button" onClick={() => setActive('Bãi đỗ xe')}>Xem toàn bộ <ArrowUpRight size={15}/></button></div><div className="slot-legend"><span><i className="slot-key free-key"/> Còn trống</span><span><i className="slot-key occupied-key"/> Đã có xe</span><span><i className="slot-key reserved-key"/> Đã đặt</span></div><div className="parking-map"><div className="lane-label">LỐI DI CHUYỂN</div><div className="slot-grid">{slots.map(s => <div key={s.id} className={`slot ${s.status}`} title={`${s.id}: ${s.status}`}><CarFront size={17}/><small>{s.id}</small></div>)}</div><div className="lane-bottom"><span>← LỐI VÀO</span><span>LỐI RA →</span></div></div></section>
        <section className="panel events-panel"><div className="panel-heading"><div><h3>Hoạt động gần đây</h3><p>Lịch sử phương tiện ra vào bãi</p></div><button className="text-button" onClick={() => setActive('Nhận diện xe')}>Xem lịch sử <ArrowUpRight size={15}/></button></div><div className="table-scroll"><table><thead><tr><th>BIỂN SỐ</th><th>LOẠI XE</th><th>HOẠT ĐỘNG</th><th>THỜI GIAN</th><th>TRẠNG THÁI</th></tr></thead><tbody>{events.map(e => <tr key={e.plate}><td><div className="plate-cell"><div className={`vehicle-icon ${e.color}`}><CarFront size={17}/></div><b>{e.plate}</b></div></td><td>{e.type}</td><td>{e.action}</td><td className="muted">{e.time}</td><td><span className="event-status"><i/> Thành công</span></td></tr>)}</tbody></table></div><div className="table-foot">Đang hiển thị dữ liệu mẫu <span>● Demo mode</span></div></section>
        <footer><span>© 2026 Parkwise · Smart Parking Intelligence</span><span>Made for smarter cities <span className="footer-heart">✦</span></span></footer>
      </div>
    </main>
  </div>
}
function Stat({ title, value, note, icon, tone, trend }: { title:string; value:string; note:string; icon:React.ReactNode; tone:string; trend:string }) {
  return <div className="stat-card"><div className="stat-top"><span className={`stat-icon ${tone}`}>{icon}</span><span className="stat-trend">{trend}</span></div><p>{title}</p><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>
}
function Legend({ color, label, value }: {color:string; label:string; value:number}) {
  return <div className="legend-row"><span><i className={`legend-dot ${color}-dot`}/>{label}</span><b>{value}</b></div>
}
