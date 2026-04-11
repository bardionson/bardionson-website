import React from 'react';
import primaryWorks from '@/data/primary-works.json';
import Image from 'next/image';

export default function PrimaryWorksGrid() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Other Available Primary Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {primaryWorks.map((work, index) => (
          <div key={index} className="glassmorphism rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-all border border-white/5 relative group bg-black/20">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Image Section */}
            <div className="aspect-square w-full relative bg-white/5 border-b border-white/10 flex items-center justify-center overflow-hidden">
                {(work as any).image ? (
                    <img src={(work as any).image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
                         <span className="text-4xl opacity-20 font-bold">{work.title.substring(0,2)}</span>
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
              <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">{work.market}</span>
              <h4 className="text-lg font-bold text-white mb-1 leading-tight line-clamp-2">{work.title}</h4>
              {work.series && <p className="text-white/60 mb-4 text-xs font-medium">{work.series}</p>}
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-white/50 mb-6 border-t border-white/10 pt-4 mt-auto">
                <div>
                    <span className="block uppercase tracking-widest opacity-70 mb-0.5">Year</span>
                    <span className="text-white/80">{work.date || '-'}</span>
                </div>
                <div>
                    <span className="block uppercase tracking-widest opacity-70 mb-0.5">Type</span>
                    <span className="text-white/80 line-clamp-1">{work.type || '-'}</span>
                </div>
                <div>
                    <span className="block uppercase tracking-widest opacity-70 mb-0.5">Available</span>
                    <span className="text-white/80 text-primary">{work.available ? `${work.available} of ${work.editions}` : '-'}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-2">
                <a 
                  href={work.location} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex justify-center items-center py-2 rounded-xl bg-white/5 hover:bg-primary text-white border border-white/10 hover:border-primary font-medium transition-all group/btn text-sm"
                >
                  <span>View on {work.market.split(' / ')[0]}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
