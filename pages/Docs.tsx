import React from 'react';
import { Database, Server, Globe, Smartphone, Shield, Layers } from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">System Architecture</h1>
        <p className="text-slate-400">Detailed overview of the ViralLaunch Enterprise Stack.</p>
      </div>

      {/* Architecture Diagram Visualization */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Layers className="w-6 h-6 text-brand-400" />
          Infrastructure Overview
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-x-auto">
          <div className="min-w-[800px] flex justify-between items-center relative">
            {/* Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>

            {/* Client */}
            <div className="flex flex-col items-center space-y-4 bg-slate-900 p-4 z-10">
              <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-xl">
                <Globe className="w-10 h-10 text-blue-400" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Client SPA</p>
                <p className="text-xs text-slate-500">React + Tailwind</p>
              </div>
            </div>

             {/* API Gateway */}
             <div className="flex flex-col items-center space-y-4 bg-slate-900 p-4 z-10">
              <div className="w-20 h-20 bg-brand-900/50 rounded-xl flex items-center justify-center border border-brand-500/50 shadow-xl shadow-brand-500/20">
                <Server className="w-10 h-10 text-brand-400" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white">API Gateway</p>
                <p className="text-xs text-slate-500">Node.js / Express</p>
              </div>
            </div>

             {/* AI Engine */}
             <div className="flex flex-col items-center space-y-4 bg-slate-900 p-4 z-10">
              <div className="w-20 h-20 bg-amber-900/30 rounded-xl flex items-center justify-center border border-amber-500/50 shadow-xl">
                <Smartphone className="w-10 h-10 text-amber-400" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Gemini AI</p>
                <p className="text-xs text-slate-500">Generative Model</p>
              </div>
            </div>

             {/* Database */}
             <div className="flex flex-col items-center space-y-4 bg-slate-900 p-4 z-10">
              <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-xl">
                <Database className="w-10 h-10 text-green-400" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white">PostgreSQL</p>
                <p className="text-xs text-slate-500">Supabase / Prisma</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DB Schema */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <Database className="w-6 h-6 text-green-400" />
          Database Schema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'users',
              cols: ['id (uuid)', 'email (varchar)', 'role (enum)', 'balance (float)', 'created_at (timestamp)']
            },
            {
              name: 'templates',
              cols: ['id (uuid)', 'author_id (fk)', 'price (int)', 'category (varchar)', 'html_content (text)']
            },
             {
              name: 'orders',
              cols: ['id (uuid)', 'user_id (fk)', 'template_id (fk)', 'amount (float)', 'status (enum)']
            },
            {
              name: 'ai_generations',
              cols: ['id (uuid)', 'user_id (fk)', 'prompt (text)', 'result_html (text)', 'tokens_used (int)']
            }
          ].map((table) => (
            <div key={table.name} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-brand-300 mb-4 border-b border-slate-800 pb-2">{table.name}</h3>
              <ul className="space-y-2">
                {table.cols.map((col, i) => (
                  <li key={i} className="text-sm text-slate-400 flex items-center">
                    <span className="w-2 h-2 bg-slate-700 rounded-full mr-2"></span>
                    {col}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Docs;
