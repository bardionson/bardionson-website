import React from 'react';
import primaryWorks from '@/data/primary-works.json';

export default function PrimaryWorksGrid() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Other Available Primary Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {primaryWorks.map((work, index) => (
          <div key={index} className="glassmorphism rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all border border-white/5 relative group bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{work.market}</span>
              <h4 className="text-xl font-bold text-white mb-1 leading-tight">{work.title}</h4>
              {work.series && <p className="text-white/60 mb-4 text-sm font-medium">{work.series}</p>}
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-white/50 mb-6 border-t border-white/10 pt-4 mt-2">
                <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-0.5">Year</span>
                    <span className="text-white/80">{work.date || '-'}</span>
                </div>
                <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-0.5">Type</span>
                    <span className="text-white/80">{work.type || '-'}</span>
                </div>
                <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-0.5">Available</span>
                    <span className="text-white/80">{work.available ? `${work.available} of ${work.editions}` : '-'}</span>
                </div>
                {work.chain && (
                <div>
                    <span className="block text-xs uppercase tracking-widest opacity-70 mb-0.5">Chain</span>
                    <span className="text-white/80">{work.chain}</span>
                </div>
                )}
              </div>
            </div>
            
            <div className="relative z-10 mt-auto pt-4 border-t border-white/10">
              <a 
                href={work.location} 
                target="_blank" 
                rel="noreferrer"
                className="w-full inline-flex justify-center items-center py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary font-medium transition-all group/btn"
              >
                <span>View on {work.market.split(' / ')[0]}</span>
                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
