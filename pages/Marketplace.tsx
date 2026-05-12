import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Star, X, ChevronDown, Check } from 'lucide-react';
import { MOCK_TEMPLATES, CATEGORY_DATA } from '../constants';
import { TemplateCategory } from '../types';
import TemplateCard from '../components/TemplateCard';
import EmptyState from '../components/EmptyState';
import { motion, AnimatePresence } from 'motion/react';

const Marketplace: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // New Filters
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(5);
  const [highDemandOnly, setHighDemandOnly] = useState(false);

  const filteredTemplates = useMemo(() => {
    return MOCK_TEMPLATES.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                            t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesPrice = t.price >= minPrice && t.price <= maxPrice;
      const matchesRating = t.rating >= minRating && t.rating <= maxRating;
      
      const highDemandCategories = [
        TemplateCategory.ECOM_DASHBOARD,
        TemplateCategory.CRYPTO_DASHBOARD,
        TemplateCategory.ADMIN_SAAS,
        TemplateCategory.MARKETING_DASHBOARD
      ];
      const matchesHighDemand = !highDemandOnly || highDemandCategories.includes(t.category);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesHighDemand;
    });
  }, [search, selectedCategory, minPrice, maxPrice, minRating, maxRating, highDemandOnly]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
    setMaxRating(5);
    setHighDemandOnly(false);
  };

  const categories = ['All', ...Object.values(TemplateCategory)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Marketplace</h1>
          <p className="text-slate-400 font-medium">Discover {MOCK_TEMPLATES.length}+ premium landing page templates</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 border rounded-xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${
              showFilters 
                ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-900/40' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Enhanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Price Filter */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                    <Check className="w-3 h-3 text-brand-500" />
                    Price Range ($)
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 mb-1 block font-bold uppercase">Min</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">$</span>
                        <input 
                          type="number" 
                          value={minPrice} 
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-6 pr-3 py-2 text-sm text-white outline-none focus:border-brand-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 mb-1 block font-bold uppercase">Max</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">$</span>
                        <input 
                          type="number" 
                          value={maxPrice} 
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-6 pr-3 py-2 text-sm text-white outline-none focus:border-brand-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Presets */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Free', min: 0, max: 0 },
                      { label: '< $30', min: 0, max: 30 },
                      { label: '$30 - $60', min: 30, max: 60 },
                      { label: '$60+', min: 60, max: 1000 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setMinPrice(preset.min);
                          setMaxPrice(preset.max);
                        }}
                        className={`text-[9px] px-2 py-1 rounded-md border font-bold uppercase tracking-tighter transition-all ${
                          minPrice === preset.min && maxPrice === preset.max
                            ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                            : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                    <Check className="w-3 h-3 text-brand-500" />
                    Avg Rating
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 mb-1 block font-bold uppercase">Min Stars</label>
                      <select 
                        value={minRating} 
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-brand-500 appearance-none transition-all cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}+ Stars</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-slate-500 mb-1 block font-bold uppercase">Max Stars</label>
                      <select 
                        value={maxRating} 
                        onChange={(e) => setMaxRating(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-brand-500 appearance-none transition-all cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Rating Presets */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '4★ & Above', min: 4, max: 5 },
                      { label: '3★ & Above', min: 3, max: 5 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setMinRating(preset.min);
                          setMaxRating(preset.max);
                        }}
                        className={`text-[9px] px-2 py-1 rounded-md border font-bold uppercase tracking-tighter transition-all ${
                          minRating === preset.min && maxRating === preset.max
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                            : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Demand Toggle */}
                <div className="flex flex-col justify-end">
                  <button 
                    onClick={() => setHighDemandOnly(!highDemandOnly)}
                    className={`w-full py-3 mb-3 border rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                      highDemandOnly 
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Zap className={`w-3 h-3 ${highDemandOnly ? 'fill-current' : ''}`} />
                    {highDemandOnly ? 'High Demand Active' : 'Show High Demand Only'}
                  </button>
                  <button 
                    onClick={resetFilters}
                    className="w-full py-3 border border-slate-800 text-slate-400 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-800 hover:text-white transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 pb-6 mb-6 scrollbar-hide no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCategory === cat 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/40' 
                : 'bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-slate-300 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No templates found"
          description={`We couldn't find any templates matching your current criteria. Try refining your search terms or adjusting the filters.`}
          onReset={resetFilters}
        />
      )}
    </div>
  );
};

export default Marketplace;
