import React from 'react';
import { motion } from 'motion/react';
import { SearchX, RefreshCcw, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onReset?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      id="empty-state-container"
    >
      {/* Stylized CSS Illustration */}
      <div className="relative mb-8" id="illustration-wrapper">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full scale-150"
        />
        
        <div className="relative bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50" />
          
          <div className="relative">
            <SearchX className="w-16 h-16 text-brand-400 mb-2 mx-auto relative z-10" />
            
            {/* Decorative elements */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-2 -right-2 text-brand-300"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            
            <motion.div 
              animate={{ 
                x: [-10, 10, -10],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-1 -left-3 text-slate-600"
            >
              <div className="w-12 h-1 bg-current rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-white mb-3"
      >
        {title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 max-w-md mb-8"
      >
        {description}
      </motion.p>

      {onReset && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-brand-500/20"
          id="reset-filter-button"
        >
          <RefreshCcw className="w-4 h-4" />
          Clear all filters
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
