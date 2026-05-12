
import React from 'react';
import { Template } from '../types';
import { Star, Download, Eye, Zap, TrendingUp } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  // Mocking "Enterprise" metrics for the marketplace feel
  const viralScore = Math.floor(Math.random() * 20) + 80;
  const conversionRate = (Math.random() * (6.5 - 2.1) + 2.1).toFixed(1);

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <img 
          src={template.image} 
          alt={template.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-4">
          <button className="p-3 bg-white text-slate-950 rounded-xl hover:bg-brand-400 transition-all transform hover:scale-110">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-3 bg-brand-600 text-white rounded-xl hover:bg-brand-500 transition-all transform hover:scale-110 shadow-xl shadow-brand-900/40">
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-slate-950/90 backdrop-blur text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-slate-700 text-slate-300">
            {template.category}
          </div>
          {(template.category === 'E-Commerce Dashboard' || 
            template.category === 'Crypto & Investment' || 
            template.category === 'SaaS Admin' || 
            template.category === 'Marketing & Ads') && (
            <div className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              High Demand
            </div>
          )}
          {template.sales > 4000 && (
            <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Interactive Proof
            </div>
          )}
          {template.sales > 1000 && (
             <div className="bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-lg">
               Best Seller
             </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors truncate pr-2">{template.title}</h3>
          <span className="text-xl font-black text-white">${template.price}</span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-grow leading-relaxed">
          {template.description}
        </p>

        {/* Enterprise Metrics Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-800">
           <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
               <Zap className="w-3 h-3 text-amber-500" /> Viral Score
             </span>
             <span className="text-sm font-bold text-white">{viralScore}/100</span>
           </div>
           <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
               <TrendingUp className="w-3 h-3 text-green-500" /> Avg. Conv
             </span>
             <span className="text-sm font-bold text-white">{conversionRate}%</span>
           </div>
        </div>
        
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-800 mt-auto">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-black uppercase">
              {template.author.substring(0, 2)}
            </div>
            <span className="text-slate-300 font-bold">{template.author}</span>
          </div>
          <div className="flex items-center space-x-3 font-bold">
             <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current mr-1" />
              <span>{template.rating}</span>
            </div>
            <span className="uppercase tracking-widest text-[9px]">{template.sales} sold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
