
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, ComposedChart, Line } from 'recharts';
import { REVENUE_DATA, PENDING_TEMPLATES, MOCK_TEMPLATES } from '../constants';
import { DollarSign, TrendingUp, Package, Users, Settings, LogOut, Shield, CheckCircle, XCircle, AlertTriangle, Download, Heart, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Activity className="w-12 h-12 text-slate-700" />
        <p className="text-slate-400">Please authenticate to access your enterprise dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Profile Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-purple-600 p-1 mb-4 shadow-lg">
                  <img src={user.avatar} alt="User" className="w-full h-full rounded-full bg-slate-800 object-cover" />
                </div>
                <div className="absolute bottom-4 right-1 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full"></div>
              </div>
              <h3 className="font-bold text-white text-xl">{user.name}</h3>
              <span className={`mt-2 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest ${
                user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                user.role === 'seller' ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {user.role} Account
              </span>
            </div>
            
            <nav className="space-y-1 pt-6 border-t border-slate-800">
               <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-brand-400 bg-brand-500/10 border border-brand-500/20">
                <Activity className="w-4 h-4" />
                <span>Live Analytics</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                <Settings className="w-4 h-4" />
                <span>Security Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-4">
                <LogOut className="w-4 h-4" />
                <span>Terminate Session</span>
              </button>
            </nav>
          </div>

          <div className="bg-gradient-to-br from-brand-900/40 to-slate-900 border border-brand-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <DollarSign className="w-12 h-12 text-brand-400" />
             </div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Vault Balance</p>
             <h2 className="text-3xl font-black text-white mb-6 tracking-tight">${user.balance.toLocaleString()}</h2>
             <button className="w-full py-3 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shadow-lg">
                Liquidate Funds
             </button>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex-grow space-y-6">
           {user.role === 'admin' && <AdminDashboard />}
           {user.role === 'seller' && <SellerDashboard />}
           {user.role === 'buyer' && <BuyerDashboard />}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsWidget title="Platform Revenue" value="$4.82M" change="+12.4%" icon={DollarSign} color="text-green-500" />
      <StatsWidget title="Node Operations" value="99.9%" change="Optimal" icon={Activity} color="text-brand-500" />
      <StatsWidget title="Pending QC" value={PENDING_TEMPLATES.length.toString()} change="Urgent" icon={AlertTriangle} color="text-amber-500" />
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-400" />
          Quality Control Queue
        </h3>
      </div>
      <div className="divide-y divide-slate-800">
        {PENDING_TEMPLATES.map((t) => (
          <div key={t.id} className="p-5 flex items-center gap-5 hover:bg-slate-800/20 transition-all">
            <img src={t.image} alt="" className="w-20 h-14 object-cover rounded-xl border border-slate-800 shadow-lg" />
            <div className="flex-grow">
              <h4 className="font-bold text-white text-sm">{t.title}</h4>
              <p className="text-xs text-slate-500 mt-1">Submission by <span className="text-brand-400">{t.author}</span> • High Tier Market</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all text-slate-500 border border-transparent hover:border-red-500/30">
                <XCircle className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-brand-600/10 hover:bg-green-500/20 hover:text-green-400 rounded-xl transition-all text-brand-400 border border-brand-500/20 hover:border-green-500/30">
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SellerDashboard: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsWidget title="EBITDA" value="$18,240" change="+22%" icon={DollarSign} color="text-green-500" />
      <StatsWidget title="Conversion Rate" value="4.8%" change="+0.4%" icon={TrendingUp} color="text-brand-500" />
      <StatsWidget title="Market Reach" value="124k" change="+5k" icon={Users} color="text-blue-500" />
    </div>

    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-400" />
          Market Performance (LTM)
        </h3>
        <select className="bg-slate-950 border border-slate-800 rounded-lg text-xs px-3 py-1.5 text-slate-400 outline-none">
          <option>Last 12 Months</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={REVENUE_DATA}>
            <XAxis dataKey="name" stroke="#475569" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} dy={10} />
            <YAxis stroke="#475569" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600}} dx={-10} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', fontSize: '12px' }} />
            <Area type="monotone" dataKey="value" fill="#8b5cf6" fillOpacity={0.05} stroke="none" />
            <Bar dataKey="value" barSize={20} fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.3} />
            <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#0f172a' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="flex justify-between items-center pt-4">
      <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Portfolio</h3>
      <button className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-brand-900/30">
        Mint New Template
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {MOCK_TEMPLATES.slice(0, 4).map((t) => (
        <div key={t.id} className="flex gap-5 p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-brand-500/40 transition-all group cursor-pointer shadow-lg">
          <div className="relative">
            <img src={t.image} alt="" className="w-24 h-20 object-cover rounded-xl" />
            <div className="absolute top-1 left-1 bg-brand-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">PRO</div>
          </div>
          <div className="flex-grow flex flex-col justify-between">
             <div>
               <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{t.title}</h4>
               <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{t.sales} Unit Sales • ${t.price} MSRP</p>
             </div>
             <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span className="hover:text-white transition-colors">Edit Code</span>
               <span className="hover:text-white transition-colors">Insights</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BuyerDashboard: React.FC = () => {
  const purchases = MOCK_TEMPLATES.slice(1, 4);
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-2">
          <Package className="w-6 h-6 text-brand-400" />
          Digital Assets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {purchases.map((t) => (
             <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group shadow-2xl">
               <div className="aspect-video bg-slate-800 relative overflow-hidden">
                 <img src={t.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-slate-950/80 backdrop-blur-sm">
                    <button className="px-6 py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <Download className="w-4 h-4" /> Final ZIP
                    </button>
                 </div>
               </div>
               <div className="p-5">
                 <h3 className="font-bold text-white text-sm mb-1">{t.title}</h3>
                 <div className="flex justify-between items-center mt-4">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">v4.2.1 Latest</span>
                    <span className="text-[9px] text-green-400 font-bold px-2 py-0.5 bg-green-500/10 rounded-md">Verified</span>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const StatsWidget: React.FC<{ title: string; value: string; change: string; icon: any; color: string }> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl relative overflow-hidden">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</h3>
      <div className={`${color} bg-current/10 p-2 rounded-lg`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-3xl font-black text-white tracking-tight">{value}</p>
    <div className="flex items-center gap-1.5 mt-2">
      <div className="h-1 w-1 rounded-full bg-green-500"></div>
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{change}</span>
    </div>
  </div>
);

export default Dashboard;
