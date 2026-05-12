
import React, { useState, useRef } from 'react';
import { generateLandingPage, refineLandingPage } from '../services/gemini';
import { AIConfig } from '../types';
import { Wand2, Loader2, Download, Code, Smartphone, Monitor, Copy, MessageSquare, Sparkles, Palette, Type, Maximize2, Move, ShoppingCart, Tag, DollarSign as DollarIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateCategory } from '../types';

const PRO_PRESETS = [
  { name: 'AI SaaS Utility', niche: 'Generative AI platform with API credit management and real-time model training logs', style: 'Dark Mode', structure: 'Bento Dashboard' },
  { name: 'Cyber Sentinel', niche: 'Real-time threat visualization map with automated SOC compliance reporting', style: 'Futuristic', structure: 'Bento Dashboard' },
  { name: 'E-Comm Growth', niche: 'Predictive analytics for Shopify with ROAS charts and retention metrics', style: 'Minimal', structure: 'Bento Dashboard' },
  { name: 'Marketing Pulse', niche: 'Ad performance dashboard for Facebook/Google with unified ROI tracking', style: 'Bold', structure: 'Standard' },
];

interface DesignTweaks {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
  spacingFactor: number;
  glassmorphism: boolean;
}

const Generator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refineQuery, setRefineQuery] = useState('');
  const [showTweaker, setShowTweaker] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [history, setHistory] = useState<{ niche: string, date: string, code: string }[]>(() => {
    const saved = localStorage.getItem('generator_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tweaks, setTweaks] = useState<DesignTweaks>({
    primaryColor: '#8b5cf6',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    borderRadius: '12',
    fontFamily: 'Inter',
    spacingFactor: 1,
    glassmorphism: true,
  });

  const [submitForm, setSubmitForm] = useState({
    title: '',
    category: TemplateCategory.ADMIN_SAAS,
    price: '49',
    description: ''
  });

  const [config, setConfig] = useState<AIConfig>({
    niche: '',
    style: 'Bold',
    colorDetails: 'Emerald and Slate 900',
    structure: 'Standard'
  });

  // Inject tweaks into the HTML code
  const finalCode = React.useMemo(() => {
    if (!generatedCode) return null;
    
    const tweakStyles = `
      <style id="viral-launch-tweaks">
        :root {
          --primary-color: ${tweaks.primaryColor};
          --bg-color: ${tweaks.backgroundColor};
          --text-color: ${tweaks.textColor};
          --radius: ${tweaks.borderRadius}px;
        }
        body { 
          background-color: var(--bg-color) !important;
          color: var(--text-color) !important;
          font-family: '${tweaks.fontFamily}', sans-serif !important;
        }
        /* Common Tailwind Overrides */
        .bg-brand-500, .bg-brand-600, .bg-blue-600, .bg-emerald-600, .bg-indigo-600 {
          background-color: var(--primary-color) !important;
        }
        .text-brand-500, .text-brand-600, .text-blue-600, .text-emerald-600, .text-indigo-600 {
          color: var(--primary-color) !important;
        }
        .border-brand-500, .border-brand-600, .border-blue-600, .border-emerald-600 {
          border-color: var(--primary-color) !important;
        }
        .rounded-xl, .rounded-2xl, .rounded-3xl, .rounded-lg {
          border-radius: var(--radius) !important;
        }
        /* Spacing injection */
        section, div[class*="py-"], div[class*="px-"] {
          padding-top: calc(inherit * ${tweaks.spacingFactor});
          padding-bottom: calc(inherit * ${tweaks.spacingFactor});
        }
        ${tweaks.glassmorphism ? `
        .glass, [class*="bg-white/"], [class*="bg-slate-900/"] {
          backdrop-filter: blur(12px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
          background-color: rgba(255, 255, 255, 0.7) !important;
          border: 1px solid rgba(209, 213, 219, 0.3) !important;
        }
        [class*="bg-slate-900/"] {
          background-color: rgba(15, 23, 42, 0.7) !important;
        }
        ` : ''}
      </style>
      <link href="https://fonts.googleapis.com/css2?family=${tweaks.fontFamily.replace(/ /g, '+')}:wght@400;700&display=swap" rel="stylesheet">
    `;

    if (generatedCode.includes('</head>')) {
      return generatedCode.replace('</head>', `${tweakStyles}</head>`);
    }
    return tweakStyles + generatedCode;
  }, [generatedCode, tweaks]);

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!config.niche) return toast.error("Tell us the niche first!");
    setLoading(true);
    try {
      const code = await generateLandingPage(config);
      setGeneratedCode(code);
      
      const newHistory = [
        { niche: config.niche, date: new Date().toLocaleTimeString(), code },
        ...history.slice(0, 4)
      ];
      setHistory(newHistory);
      localStorage.setItem('generator_history', JSON.stringify(newHistory));
      
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
    if (!finalCode) return;
    navigator.clipboard.writeText(finalCode);
    toast.success("Code copied to clipboard!");
  };

  const downloadHTML = () => {
    if (!finalCode) return;
    const blob = new Blob([finalCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded!");
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or Firestore
    toast.success(`"${submitForm.title}" submitted for approval! View status in Dashboard.`);
    setIsSubmitModalOpen(false);
    setSubmitForm({
      title: '',
      category: TemplateCategory.ADMIN_SAAS,
      price: '49',
      description: ''
    });
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
            <div className="border-t border-slate-800 pt-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Project Niche</label>
              <textarea 
                value={config.niche}
                onChange={(e) => setConfig({...config, niche: e.target.value})}
                placeholder="Ex: SaaS for dog walkers..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none resize-none h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Style</label>
                <select 
                  value={config.style}
                  onChange={(e) => setConfig({...config, style: e.target.value as any})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-brand-500"
                >
                  <option value="Minimal">Minimal</option>
                  <option value="Bold">Bold</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Playful">Playful</option>
                  <option value="Dark Mode">Dark Mode</option>
                  <option value="Futuristic">Futuristic</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Structure</label>
                <select 
                  value={config.structure}
                  onChange={(e) => setConfig({...config, structure: e.target.value as any})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-brand-500"
                >
                  <option value="Standard">Standard</option>
                  <option value="Long Form">Long Form</option>
                  <option value="Video Centric">Video</option>
                  <option value="Bento Dashboard">Bento Grid</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Pro Prompt Presets</label>
                <div className="grid grid-cols-1 gap-2">
                  {PRO_PRESETS.map(p => (
                    <button 
                      key={p.name}
                      onClick={() => {
                        setConfig({ ...config, niche: p.niche, style: p.style as any, structure: p.structure as any });
                        toast.success(`Preset "${p.name}" applied!`);
                      }}
                      className="text-left px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 hover:border-brand-500 hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span>{p.name}</span>
                      <Sparkles className="w-3 h-3 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 2026 Pro Features Note */}
              <div className="p-4 bg-brand-500/5 border border-brand-500/10 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-brand-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">2026 Standard Protocol</span>
                </div>
                <ul className="text-[9px] text-slate-500 space-y-1.5 list-disc pl-3">
                  <li>Bento KPI Cards w/ Sparklines</li>
                  <li>Actionable Tables w/ Status Badges</li>
                  <li>Smooth Bezier Area Charts</li>
                  <li>Smart Time-Range Selectors</li>
                  <li>Glassmorphism "Frost" UI</li>
                </ul>
              </div>

              {/* Marketing Winning Structure Tip */}
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Winning Structure Tip</span>
                </div>
                <div className="space-y-2 overflow-hidden">
                  <p className="text-[9px] text-slate-500 leading-relaxed font-bold">
                    For high sales: Aspirational Title + Technical Description.
                  </p>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[8px] text-slate-400 italic">
                    "Nexus AI – Ultimate Admin Dashboard & Landing Page System (React, Next.js & Tailwind)"
                  </div>
                </div>
              </div>

              {/* History Panel */}
              {history.length > 0 && (
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Recent Drafts</span>
                    <button 
                      onClick={() => {
                        setHistory([]);
                        localStorage.removeItem('generator_history');
                      }}
                      className="text-[8px] text-slate-600 hover:text-red-400 uppercase font-black"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2">
                    {history.map((h, i) => (
                      <button 
                        key={i}
                        onClick={() => setGeneratedCode(h.code)}
                        className="w-full p-2 bg-slate-900 border border-slate-800 hover:border-brand-500/50 rounded-lg text-left transition-all group"
                      >
                        <p className="text-[10px] text-white font-bold truncate">{h.niche}</p>
                        <p className="text-[8px] text-slate-600">{h.date}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                <button 
                  onClick={() => setShowTweaker(!showTweaker)} 
                  className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${showTweaker ? 'bg-brand-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                  title="Design Tweaker"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Styles</span>
                </button>
                <button 
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-brand-400 hover:text-brand-300 text-xs font-bold rounded-xl transition-all border border-slate-700"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sell Template</span>
                </button>
                <button 
                  onClick={() => setIsCodeModalOpen(true)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all" 
                  title="View Source"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button onClick={copyToClipboard} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all" title="Copy HTML">
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={downloadHTML}
                  className="flex items-center gap-2 px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-brand-900/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
               </>
             )}
          </div>
        </div>

        <div className="flex-grow bg-slate-950 flex flex-col overflow-hidden relative">
           {!generatedCode ? (
             <div className="flex-grow flex items-center justify-center p-8">
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
             </div>
           ) : (
             <>
               <div className="flex-grow flex items-center justify-center p-8 overflow-hidden">
                <div className={`transition-all duration-700 ease-out shadow-[0_0_100px_rgba(139,92,246,0.1)] ${
                    viewMode === 'mobile' ? 'w-[375px] h-[667px] rounded-[3rem] border-[12px] border-slate-800 overflow-hidden' : 'w-full h-full rounded-lg'
                  }`}>
                  <iframe 
                    srcDoc={finalCode || ''}
                    title="Preview"
                    className="w-full h-full bg-white"
                  />
                </div>
               </div>

               {/* Design Tweaker Panel */}
               <AnimatePresence>
                 {showTweaker && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="bg-slate-900 border-t border-slate-800 overflow-hidden"
                   >
                     <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            <Palette className="w-3 h-3 text-brand-500" /> Primary
                          </label>
                          <input 
                            type="color" 
                            value={tweaks.primaryColor}
                            onChange={(e) => setTweaks({...tweaks, primaryColor: e.target.value})}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg p-1 cursor-pointer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            Background
                          </label>
                          <input 
                            type="color" 
                            value={tweaks.backgroundColor}
                            onChange={(e) => setTweaks({...tweaks, backgroundColor: e.target.value})}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg p-1 cursor-pointer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            Text
                          </label>
                          <input 
                            type="color" 
                            value={tweaks.textColor}
                            onChange={(e) => setTweaks({...tweaks, textColor: e.target.value})}
                            className="w-full h-10 bg-slate-950 border border-slate-800 rounded-lg p-1 cursor-pointer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            <Maximize2 className="w-3 h-3" /> Corners
                          </label>
                          <input 
                            type="range" 
                            min="0" 
                            max="40" 
                            value={tweaks.borderRadius}
                            onChange={(e) => setTweaks({...tweaks, borderRadius: e.target.value})}
                            className="w-full accent-brand-500"
                          />
                          <div className="text-[10px] text-slate-500 text-right">{tweaks.borderRadius}px</div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            <Move className="w-3 h-3" /> Spacing
                          </label>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="2" 
                            step="0.1"
                            value={tweaks.spacingFactor}
                            onChange={(e) => setTweaks({...tweaks, spacingFactor: Number(e.target.value)})}
                            className="w-full accent-brand-500"
                          />
                          <div className="text-[10px] text-slate-500 text-right">{tweaks.spacingFactor}x</div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                            <Type className="w-3 h-3" /> Font
                          </label>
                          <select 
                            value={tweaks.fontFamily}
                            onChange={(e) => setTweaks({...tweaks, fontFamily: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-brand-500"
                          >
                            <option value="Inter">Inter (Default)</option>
                            <option value="Outfit">Outfit (Tech)</option>
                            <option value="Playfair Display">Playfair (Elegant)</option>
                            <option value="Space Grotesk">Space (Modern)</option>
                            <option value="JetBrains Mono">JetBrains (Code)</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                             <Sparkles className="w-3 h-3 text-brand-500" /> Glass UI
                           </label>
                           <button 
                             onClick={() => setTweaks({...tweaks, glassmorphism: !tweaks.glassmorphism})}
                             className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                               tweaks.glassmorphism 
                                 ? 'bg-brand-600/10 border-brand-500 text-brand-400' 
                                 : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                             }`}
                           >
                             {tweaks.glassmorphism ? 'Enabled' : 'Disabled'}
                           </button>
                        </div>
                        <div className="flex items-end gap-2">
                           <button 
                             onClick={() => setTweaks({
                               ...tweaks,
                               backgroundColor: '#0f172a',
                               textColor: '#f8fafc',
                               primaryColor: tweaks.primaryColor,
                             })}
                             className="flex-1 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 text-[8px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-slate-800"
                           >
                             Force Dark
                           </button>
                           <button 
                             onClick={() => setTweaks({
                               primaryColor: '#8b5cf6',
                               backgroundColor: '#ffffff',
                               textColor: '#0f172a',
                               borderRadius: '12',
                               fontFamily: 'Inter',
                               spacingFactor: 1,
                               glassmorphism: true,
                             })}
                             className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 text-[8px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-slate-700"
                           >
                             Reset
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </>
           )}
        </div>

        {/* Bottom Refinement Area */}
        {generatedCode && (
          <div className="p-6 bg-slate-900/50 backdrop-blur-md border-t border-slate-800">
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3 text-brand-500" />
                  Refinement Console
                </h3>
                <div className="flex gap-2">
                  {['Add Testimonials', 'Add FAQ', 'Dark Theme'].map(suggestion => (
                    <button 
                      key={suggestion}
                      onClick={() => setRefineQuery(suggestion)}
                      className="text-[10px] px-2 py-1 bg-slate-950 border border-slate-800 rounded-md text-slate-500 hover:text-brand-400 hover:border-brand-500 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-grow relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text"
                    value={refineQuery}
                    onChange={(e) => setRefineQuery(e.target.value)}
                    placeholder="Enter instructions to refine content or structure (e.g., 'Add a pricing table with 3 tiers')..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-4 text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-600"
                    onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                    id="refine-input-bottom"
                  />
                </div>
                <button 
                  onClick={handleRefine}
                  disabled={refining}
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 text-white text-sm font-bold rounded-2xl transition-all shadow-lg shadow-brand-900/40 flex items-center gap-2 min-w-[200px] justify-center"
                  id="refine-button-bottom"
                >
                  {refining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  <span>{refining ? 'Executing...' : 'Apply Refinements'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-500/10 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sell Template</h3>
                </div>
                <button 
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSellSubmit} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Template Title</label>
                    <input 
                      type="text" 
                      value={submitForm.title}
                      onChange={(e) => setSubmitForm({...submitForm, title: e.target.value})}
                      placeholder="e.g. Modern SaaS Waitlist Pro"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Category</label>
                      <select 
                        value={submitForm.category}
                        onChange={(e) => setSubmitForm({...submitForm, category: e.target.value as any})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors"
                      >
                        {Object.values(TemplateCategory).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Listing Price ($)</label>
                      <div className="relative">
                        <DollarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          type="number" 
                          min="0"
                          value={submitForm.price}
                          onChange={(e) => setSubmitForm({...submitForm, price: e.target.value})}
                          placeholder="49"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-brand-500 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Description</label>
                    <textarea 
                      value={submitForm.description}
                      onChange={(e) => setSubmitForm({...submitForm, description: e.target.value})}
                      placeholder="What makes this template unique?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-500 transition-colors h-24 resize-none"
                      required
                    />
                  </div>

                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3 h-3 text-brand-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metadata Sync</span>
                    </div>
                    <p className="text-[10px] text-slate-500">We'll automatically bundle your custom UI tweaks (colors, fonts, etc.) into the listing package.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="flex-1 py-4 border border-slate-800 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-brand-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/40"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Code Viewer Modal */}
      <AnimatePresence>
        {isCodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCodeModalOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-brand-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Source Explorer</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyToClipboard} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all flex items-center gap-2">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button onClick={() => setIsCodeModalOpen(false)} className="p-1.5 text-slate-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-grow p-4 overflow-hidden">
                <textarea 
                  value={finalCode || ''}
                  readOnly
                  className="w-full h-full bg-slate-950 text-emerald-500 font-mono text-xs p-6 rounded-xl border border-slate-800 outline-none resize-none focus:ring-1 focus:ring-brand-500/50 custom-scrollbar"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Generator;
