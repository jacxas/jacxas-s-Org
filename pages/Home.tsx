import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Code, Globe, ShieldCheck } from 'lucide-react';
import { MOCK_TEMPLATES } from '../constants';
import TemplateCard from '../components/TemplateCard';

const Home: React.FC = () => {
  const featuredTemplates = MOCK_TEMPLATES.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-3 py-1 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">v2.0 Enterprise is Live</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            The Marketplace for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-500">
              Viral Landing Pages
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Buy, sell, and generate high-converting landing pages in seconds.
            Powered by Gemini AI. Deployed instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              to="/marketplace" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-600/20"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/generate" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all flex items-center justify-center space-x-2 border border-slate-700"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Generate with AI</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: 'Clean Code',
              desc: 'Export to HTML, React, or Webflow. Pure CSS, no bloat, SEO optimized out of the box.',
            },
            {
              icon: Zap,
              title: 'AI Automation',
              desc: 'Describe your niche and get a fully functional landing page generated in under 30 seconds.',
            },
            {
              icon: ShieldCheck,
              title: 'Enterprise Secure',
              desc: 'Signed ZIPs, anti-leak protection, and secure payments via Stripe Connect.',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 transition-colors">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Templates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Trending Now</h2>
          <Link to="/marketplace" className="text-brand-400 hover:text-brand-300 font-medium flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-3xl p-8 md:p-16 text-center border border-brand-700/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-500/20 blur-3xl rounded-full pointer-events-none"></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Monetizing Your Skills</h2>
             <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Join 5,000+ creators selling viral templates. Zero fees for the first $1,000 in sales.</p>
             <Link to="/dashboard" className="inline-flex items-center px-8 py-4 bg-white text-brand-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">
               Become a Seller
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
