import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { REVENUE_DATA, PENDING_TEMPLATES, MOCK_TEMPLATES } from '../constants';
import { DollarSign, TrendingUp, Package, Users, Settings, LogOut, Bell, Shield, CheckCircle, XCircle, AlertTriangle, Download, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TemplateCard from '../components/TemplateCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-400">Please log in via the Navbar controls.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-brand-500 p-1 mb-3">
                <img src={user.avatar} alt="User" className="w-full h-full rounded-full bg-slate-800" />
              </div>
              <h3 className="font-bold text-white text-lg">{user.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                  user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                  user.role === 'seller' ? 'bg-brand-500/20 text-brand-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
            
            <div className="space-y-1 border-t border-slate-800 pt-4">
               <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600/10 border border-brand-600/20">
                <Settings className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6">
             <p className="text-slate-400 text-xs font-medium uppercase mb-1">Current Balance</p>
             <h2 className="text-3xl font-bold text-white mb-4">${user.balance.toLocaleString()}</h2>
             {user.role === 'seller' && (
               <button className="w-full py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">
                 Withdraw Funds
               </button>
             )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
           {user.role === 'admin' && <AdminView />}
           {user.role === 'seller' && <SellerView />}
           {user.role === 'buyer' && <BuyerView />}
        </div>
      </div>
    </div>
  );
};

// --- SUB VIEWS ---

const AdminView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Total Revenue" value="$1.2M" change="+8%" icon={DollarSign} color="text-green-500" />
        <StatsCard title="Active Users" value="45.2k" change="+120 today" icon={Users} color="text-blue-500" />
        <StatsCard title="Pending Reviews" value={PENDING_TEMPLATES.length.toString()} change="High Priority" icon={AlertTriangle} color="text-amber-500" />
      </div>

      {/* Pending Approvals */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-400" />
            Pending Approvals
          </h3>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">{PENDING_TEMPLATES.length} items</span>
        </div>
        <div className="divide-y divide-slate-800">
          {PENDING_TEMPLATES.map((template) => (
            <div key={template.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
              <img src={template.image} alt="" className="w-16 h-12 object-cover rounded-md bg-slate-800" />
              <div className="flex-grow">
                <h4 className="font-bold text-white text-sm">{template.title}</h4>
                <p className="text-xs text-slate-400">by {template.author} • {template.category} • ${template.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-slate-500">
                  <XCircle className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-green-500/20 hover:text-green-400 rounded-lg transition-colors text-slate-500">
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
         <h3 className="text-lg font-bold text-white mb-6">System Activity</h3>
         <div className="h-64 w-full bg-slate-950/50 rounded-lg flex items-center justify-center border border-slate-800 border-dashed">
             <p className="text-slate-500">Audit Log Visualization Placeholder</p>
         </div>
      </div>
    </div>
  );
};

const SellerView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="Net Revenue" value="$12,450" change="+12%" icon={DollarSign} color="text-green-500" />
        <StatsCard title="Total Sales" value="1,240" change="+5 today" icon={Package} color="text-brand-500" />
        <StatsCard title="Template Views" value="85.2k" change="+2.1%" icon={Users} color="text-blue-500" />
      </div>

      {/* Chart */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-6">Performance</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#475569" tick={{fontSize: 12}} />
              <YAxis stroke="#475569" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <h3 className="text-xl font-bold text-white">My Templates</h3>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-lg transition-colors">
          + Upload New
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {MOCK_TEMPLATES.slice(0, 4).map((t) => (
          <div key={t.id} className="flex gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-brand-500/30 transition-colors group">
            <img src={t.image} alt="" className="w-24 h-20 object-cover rounded-lg" />
            <div className="flex-grow">
               <h4 className="font-bold text-white truncate">{t.title}</h4>
               <p className="text-xs text-slate-400 mb-2">{t.sales} Sales • ${t.price}</p>
               <div className="flex gap-2 text-xs">
                 <button className="text-brand-400 hover:text-brand-300 font-medium">Edit</button>
                 <button className="text-slate-500 hover:text-slate-300">Analytics</button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BuyerView: React.FC = () => {
  const purchases = MOCK_TEMPLATES.slice(2, 5); // Mock purchases

  return (
    <div className="space-y-8">
      
      {/* Section: Purchased */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Package className="w-5 h-5 text-brand-400" />
          My Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {purchases.map((t) => (
             <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
               <div className="aspect-video bg-slate-800 relative">
                 <img src={t.image} alt="" className="w-full h-full object-cover opacity-75" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
                    <button className="px-4 py-2 bg-white text-black rounded-lg font-bold text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download ZIP
                    </button>
                 </div>
               </div>
               <div className="p-4">
                 <h3 className="font-bold text-white text-sm mb-1">{t.title}</h3>
                 <p className="text-xs text-slate-400">Purchased on Mar 12, 2024</p>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Section: Wishlist */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Wishlist
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
           <p className="text-slate-400">Your wishlist is empty.</p>
           <button className="mt-4 px-4 py-2 border border-slate-700 rounded-lg text-sm hover:bg-slate-800 text-slate-300">
             Browse Marketplace
           </button>
        </div>
      </div>

    </div>
  );
};

const StatsCard: React.FC<{ title: string; value: string; change: string; icon: any; color: string }> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <span className="text-xs text-slate-500">{change}</span>
  </div>
);

export default Dashboard;