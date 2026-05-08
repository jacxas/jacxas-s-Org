
import React, { useState, useRef } from 'react';
import { generateLandingPage, refineLandingPage } from '../services/gemini';
import { AIConfig } from '../types';
import { Wand2, Loader2, Download, Code, Smartphone, Monitor, Copy, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const PRO_PRESETS = [
  { name: 'SaaS Waitlist', niche: 'AI Productivity Tool', style: 'Dark Mode', structure: 'Standard' },
  { name: 'High-Ticket Coaching', niche: 'Business Mastery Coaching', style: 'Bold', structure: 'Long Form' },
  { name: 'Web3 Launch', niche: 'NFT Marketplace Protocol', style: 'Dark Mode', structure: 'Video' },
];

const Generator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refineQuery, setRefineQuery] = useState('');
  
  const [config, setConfig] = useState<AIConfig>({
    niche: '',
    style: 'Bold',
    colorDetails: 'Emerald and Slate 900',
    structure: 'Standard'
  });

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!config.niche) return toast.error("Tell us the niche first!");
    setLoading(true);
    try {
      const code = await generateLandingPage(config);
      setGeneratedCode(code);
      toast.success("Viral landing page ready!");
    } catch (error) {
      toast.error("Generation failed. Check API Key.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!generatedCode || !refineQuery) return;
    setRefining(true);
    try {
      const newCode = await refineLandingPage(generatedCode, refineQuery);
      setGeneratedCode(newCode);
      setRefineQuery('');
      toast.success("Optimization applied!");
    } catch (error) {
      toast.error("Refinement failed.");
    } finally {
      setRefining(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-6">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              Creator Studio
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Quick Presets</label>
              <div className="grid grid-cols-1 gap-2">
                {PRO_PRESETS.map(p => (
                  <button 
                    key={p.name}
                    onClick={() => setConfig({ ...config, niche: p.niche, style: p.style as any, structure: p.structure as any })}
                    className="text-left px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 hover:border-brand-500 hover:text-white transition-all"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Project Niche</label>
              <textarea 
                value={config.niche}
                onChange={(e) => setConfig({...config, niche: e.target.value})}
                placeholder="Ex: SaaS for dog walkers..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none resize-none h-20"
              />
            </div>

            <button 
              onClick={() => handleGenerate()}
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-900/40"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {loading ? 'Crafting Code...' : 'Generate Magic'}
            </button>
          </div>
        </div>

        {/* Refinement Panel (Only if code exists) */}
        {generatedCode && (
          <div className="bg-slate-900 border border-brand-500/20 p-5 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-400" />
              AI Refinement
            </h3>
            <div className="relative">
              <input 
                type="text"
                value={refineQuery}
                onChange={(e) => setRefineQuery(e.target.value)}
                placeholder="Change colors, add a section..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white focus:ring-1 focus:ring-brand-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
              />
              <button 
                onClick={handleRefine}
                disabled={refining}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-400 hover:text-white"
              >
                {refining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic text-center">Chat with your landing to tweak details.</p>
          </div>
        )}
      </div>

      {/* Preview Area */}
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="h-14 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
             <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button onClick={() => setViewMode('desktop')} className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-slate-800 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}>
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('mobile')} className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-slate-800 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}>
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            {generatedCode && (
               <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                 Syncing Live
               </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             {generatedCode && (
               <>
                <button onClick={copyToClipboard} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all" title="Copy HTML">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-brand-900/20">
                  <Download className="w-4 h-4" />
                  <span>Push to Repo</span>
                </button>
               </>
             )}
          </div>
        </div>

        <div className="flex-grow bg-slate-950 flex items-center justify-center p-8 overflow-hidden">
           {!generatedCode ? (
             <div className="text-center space-y-6 max-w-sm">
               <div className="w-24 h-24 bg-gradient-to-tr from-brand-600/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto border border-brand-500/10 shadow-inner">
                 {loading ? <Loader2 className="w-12 h-12 text-brand-500 animate-spin" /> : <Code className="w-12 h-12 text-slate-700" />}
               </div>
               <div>
                <h3 className="text-xl font-bold text-white mb-2">Architecting Brilliance</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Describe your vision, and we'll translate it into clean, responsive Tailwind code.
                </p>
               </div>
             </div>
           ) : (
             <div className={`transition-all duration-700 ease-out shadow-[0_0_100px_rgba(139,92,246,0.1)] ${
                 viewMode === 'mobile' ? 'w-[375px] h-[667px] rounded-[3rem] border-[12px] border-slate-800 overflow-hidden' : 'w-full h-full rounded-lg'
               }`}>
               <iframe 
                 srcDoc={generatedCode}
                 title="Preview"
                 className="w-full h-full bg-white"
               />
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
