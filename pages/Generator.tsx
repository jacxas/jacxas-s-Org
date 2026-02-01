import React, { useState } from 'react';
import { generateLandingPage } from '../services/gemini';
import { AIConfig } from '../types';
import { Wand2, Loader2, Download, Code, Smartphone, Monitor, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const Generator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const [config, setConfig] = useState<AIConfig>({
    niche: '',
    style: 'Bold',
    colorDetails: 'Dark mode, Neon Purple and Black',
    structure: 'Standard'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.niche) {
      toast.error("Please enter a niche");
      return;
    }
    setLoading(true);
    try {
      const code = await generateLandingPage(config);
      setGeneratedCode(code);
      toast.success("Landing page generated!");
    } catch (error) {
      toast.error("Failed to generate. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-${config.niche.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded HTML file");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6">
      
      {/* Left Panel: Controls */}
      <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-6 overflow-y-auto pb-10">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-brand-400" />
            AI Generator
          </h2>
          <p className="text-sm text-slate-400 mb-6">Describe your dream landing page.</p>
          
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Project Niche / Topic</label>
              <input 
                type="text" 
                value={config.niche}
                onChange={(e) => setConfig({...config, niche: e.target.value})}
                placeholder="e.g. Crypto Wallet, Yoga Studio..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Visual Style</label>
              <select 
                 value={config.style}
                 onChange={(e) => setConfig({...config, style: e.target.value as any})}
                 className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none"
              >
                <option value="Minimal">Minimalist</option>
                <option value="Bold">Bold & Viral</option>
                <option value="Corporate">Corporate SaaS</option>
                <option value="Dark Mode">Dark Future</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Color Theme</label>
              <input 
                type="text" 
                value={config.colorDetails}
                onChange={(e) => setConfig({...config, colorDetails: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Structure</label>
              <div className="grid grid-cols-3 gap-2">
                {['Standard', 'Long Form', 'Video'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setConfig({...config, structure: s as any})}
                    className={`px-2 py-2 text-xs rounded-md border ${
                      config.structure === s 
                      ? 'bg-brand-600 border-brand-500 text-white' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 disabled:text-slate-500 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {loading ? 'Generating...' : 'Generate Landing'}
            </button>
          </form>
        </div>

        {/* History Mockup */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex-grow">
           <h3 className="text-sm font-bold text-white mb-3">Recent Generations</h3>
           <div className="space-y-2">
             <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300">SaaS Dark Mode</span>
                <span className="text-[10px] text-slate-500">2h ago</span>
             </div>
             <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300">Yoga Retreat</span>
                <span className="text-[10px] text-slate-500">5h ago</span>
             </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col relative">
        {/* Toolbar */}
        <div className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
               onClick={() => setViewMode('mobile')}
               className={`p-1.5 rounded-md transition-colors ${viewMode === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
             {generatedCode && (
               <>
                <button onClick={handleDownload} className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-lg transition-colors">
                  <Download className="w-3 h-3" />
                  <span>Export HTML</span>
                </button>
               </>
             )}
          </div>
        </div>

        {/* Iframe Container */}
        <div className="flex-grow bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
           {!generatedCode ? (
             <div className="text-center space-y-4 max-w-md">
               <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto border border-slate-800">
                 {loading ? <Loader2 className="w-10 h-10 text-brand-500 animate-spin" /> : <Code className="w-10 h-10 text-slate-700" />}
               </div>
               <h3 className="text-lg font-medium text-slate-300">
                 {loading ? 'AI is coding your page...' : 'Ready to build'}
               </h3>
               <p className="text-slate-500 text-sm">
                 {loading ? 'This usually takes about 10-20 seconds. We are writing HTML, CSS (Tailwind), and responsive logic.' : 'Enter your requirements on the left and hit Generate.'}
               </p>
             </div>
           ) : (
             <iframe 
               srcDoc={generatedCode}
               title="Preview"
               className={`bg-white transition-all duration-500 shadow-2xl ${
                 viewMode === 'mobile' ? 'w-[375px] h-[667px] rounded-3xl border-8 border-slate-800' : 'w-full h-full rounded-none'
               }`}
             />
           )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
