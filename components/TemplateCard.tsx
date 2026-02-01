import React from 'react';
import { Template } from '../types';
import { Star, Download, Eye } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
        <img 
          src={template.image} 
          alt={template.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <button className="p-2 bg-white text-black rounded-full hover:bg-brand-400 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-md border border-slate-700 text-slate-300">
          {template.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white truncate pr-2">{template.title}</h3>
          <span className="text-brand-400 font-bold">${template.price}</span>
        </div>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800 mt-auto">
          <div className="flex items-center space-x-1">
            <span className="text-slate-300">{template.author}</span>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-current mr-1" />
              <span>{template.rating}</span>
            </div>
            <span>{template.sales} sales</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
