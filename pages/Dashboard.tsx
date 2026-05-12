
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, ComposedChart, Line } from 'recharts';
import { REVENUE_DATA, PENDING_TEMPLATES, MOCK_TEMPLATES } from '../constants';
import { DollarSign, TrendingUp, Package, Users, Settings, LogOut, Shield, CheckCircle, XCircle, AlertTriangle, Download, Heart, Activity, User as UserIcon, Camera, X, LayoutDashboard, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-purple-600 p-1 mb-4 shadow-lg overflow-hidden">
                  <img src={user.avatar} alt="User" className="w-full h-full rounded-full bg-slate-800 object-cover" />
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </button>
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
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span>Edit Profile</span>
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

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  updateProfile({
                    name: formData.get('name') as string,
                    avatar: formData.get('avatar') as string,
                  });
                  setIsEditModalOpen(false);
                }}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Display Name</label>
                  <input 
                    name="name"
                    type="text" 
                    defaultValue={user.name}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Avatar URL</label>
                  <input 
                    name="avatar"
                    type="url" 
                    defaultValue={user.avatar}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors"
                    required
                  />
                  <p className="text-[10px] text-slate-500 mt-2 italic">Pro-tip: Try changing the 'seed' parameter in the dicebear URL.</p>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-3 border border-slate-800 text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-brand-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/40"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pending'>('overview');
  const [pendingList, setPendingList] = useState(PENDING_TEMPLATES);

  const handleApprove = (id: string) => {
    const template = pendingList.find(t => t.id === id);
    if (template) {
      setPendingList(pendingList.filter(t => t.id !== id));
      toast.success(`${template.title} approved and moved to marketplace!`);
    }
  };

  const handleReject = (id: string) => {
    const template = pendingList.find(t => t.id === id);
    if (template) {
      setPendingList(pendingList.filter(t => t.id !== id));
      toast.error(`${template.title} rejected. Seller has been notified.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-4 border-b border-slate-800 pb-px">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'overview' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Overview
          {activeTab === 'overview' && (
            <motion.div layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'pending' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          Pending Approvals
          {pendingList.length > 0 && (
            <span className="bg-brand-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
              {pendingList.length}
            </span>
          )}
          {activeTab === 'pending' && (
            <motion.div layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsWidget title="Platform Revenue" value="$4.82M" change="+12.4%" icon={DollarSign} color="text-green-500" />
              <StatsWidget title="Node Operations" value="99.9%" change="Optimal" icon={Activity} color="text-brand-500" />
              <StatsWidget title="Pending QC" value={pendingList.length.toString()} change="Urgent" icon={AlertTriangle} color="text-amber-500" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-brand-400" />
                  Real-time Platform vitals
                </h3>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-brand-500 animate-pulse" />
                </div>
                <h4 className="text-white font-bold mb-1">System Health: Optimal</h4>
                <p className="text-slate-500 text-xs">All secondary nodes are performing within expected latency parameters.</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="pending"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-400" />
                Quality Control Queue
              </h3>
            </div>
            <div className="divide-y divide-slate-800">
              {pendingList.length > 0 ? (
                pendingList.map((t) => (
                  <div key={t.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-5 hover:bg-slate-800/20 transition-all">
                    <img src={t.image} alt="" className="w-24 sm:w-28 h-18 object-cover rounded-xl border border-slate-800 shadow-lg" />
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white text-sm">{t.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md uppercase font-bold tracking-tighter">Pending Approval</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Submission by <span className="text-brand-400">{t.author}</span> • Submitted on {t.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReject(t.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all text-slate-500 border border-transparent hover:border-red-500/30 text-xs font-bold uppercase tracking-widest"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(t.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 bg-brand-600/10 hover:bg-green-500/20 hover:text-green-400 rounded-xl transition-all text-brand-400 border border-brand-500/20 hover:border-green-500/30 text-xs font-bold uppercase tracking-widest"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                    <CheckCircle className="w-8 h-8 text-slate-600" />
                  </div>
                  <h4 className="text-white font-bold mb-1">Queue Empty</h4>
                  <p className="text-slate-500 text-xs">No pending templates require review at this time.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings'>('overview');
  
  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-4 border-b border-slate-800 pb-px">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'overview' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          Market Data
          {activeTab === 'overview' && (
            <motion.div layoutId="seller-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('listings')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'listings' ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings
          {activeTab === 'listings' && (
            <motion.div layoutId="seller-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsWidget title="EBITDA" value="$18,240" change="+22%" icon={DollarSign} color="text-green-500" />
              <StatsWidget title="Conversion Rate" value="4.8%" change="+0.4%" icon={TrendingUp} color="text-brand-500" />
              <StatsWidget title="Market Reach" value="124k" change="+5k" icon={Users} color="text-blue-500" />
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-400" />
                  Performance Analytics
                </h3>
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
          </motion.div>
        ) : (
          <motion.div 
            key="listings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-400" />
                Active Inventory
              </h3>
              <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg">
                Create Asset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_TEMPLATES.slice(0, 3).map((t) => (
                <div key={t.id} className="flex gap-5 p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-brand-500/40 transition-all group shadow-lg">
                  <img src={t.image} alt="" className="w-24 h-20 object-cover rounded-xl" />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{t.title}</h4>
                        <span className="text-[8px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30 uppercase font-black">Live</span>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{t.sales} Sales • ${t.price} MSRP</p>
                    </div>
                    <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-brand-400">
                      <span className="cursor-pointer hover:text-white transition-colors">Edit Code</span>
                      <span className="cursor-pointer hover:text-white transition-colors">Insights</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Mock Pending Item */}
              <div className="flex gap-5 p-5 bg-slate-900 border border-slate-800 border-dashed rounded-2xl hover:border-amber-500/40 transition-all group shadow-lg">
                 <div className="w-24 h-20 bg-slate-950 flex items-center justify-center rounded-xl border border-slate-800 overflow-hidden relative">
                   <Clock className="w-6 h-6 text-slate-700 animate-pulse" />
                   <div className="absolute inset-x-0 bottom-0 py-1 bg-amber-500/10 text-amber-500 text-[8px] font-black text-center uppercase tracking-tighter">Under Review</div>
                 </div>
                 <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-400 text-sm">Crypto SaaS Landing...</h4>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Pricing Policy: High Velocity</p>
                    </div>
                    <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-600 italic">
                      Pending quality assurance check by network nodes.
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
