'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Slideshow from './SlideShow';
import { RxCross1 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';

// Dynamically import WebGPU Redraw canvas to prevent SSR errors
const RedrawHeroCanvas = dynamic(() => import('./RedrawHeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#07070A]" />
});

const Hero = () => {
  const [close, setClose] = useState(true);
  const router = useRouter();
  
  return (
    <div id="home" className='relative min-h-[85vh] flex items-center overflow-hidden bg-obsidian py-12 lg:py-20'>
      {/* Interactive WebGPU background canvas */}
      <RedrawHeroCanvas />

      <div className='container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
        
        {/* Left Editorial Copy */}
        <div className='lg:col-span-6 space-y-6 lg:space-y-8 text-left'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider animate-pulse'>
            <span>✨ Technical Preview Powered by WebGPU</span>
          </div>
          
          <h1 className='text-5xl sm:text-6xl xl:text-7xl font-serif text-white tracking-wide leading-[1.1] font-bold'>
            Reveal Your <br />
            <span className='bg-gradient-to-r from-accent via-[#BC34B9] to-accent-teal bg-clip-text text-transparent glow-text-magenta'>
              Cosmic Glow
            </span>
          </h1>
          
          <p className='text-gray-400 text-base sm:text-lg max-w-lg font-light leading-relaxed'>
            Experience premium, high-performance skincare and cosmetics crafted for the modern age. Witness real-time GPU-accelerated backdrop blending.
          </p>

          <div className='flex flex-wrap gap-4 pt-2'>
            <button 
              onClick={() => router.push('#shop')} 
              className='group flex items-center gap-3 bg-gradient-to-r from-accent to-[#BC34B9] hover:from-accent-teal hover:to-accent-teal/90 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-[1.03] cursor-pointer'
            >
              Shop Collection <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => router.push('/blog/0')} 
              className='glass-card hover:bg-white/5 border border-white/10 text-gray-300 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-lg transition-all duration-300 hover:scale-[1.03]'
            >
              Read Editorial
            </button>
          </div>
        </div>

        {/* Right Slideshow Display Card */}
        <div className='lg:col-span-6 w-full flex justify-center'>
          <div className='relative w-full max-w-[600px] glass-card rounded-3xl p-4 border border-white/10 overflow-hidden shadow-2xl shadow-black/80 hover:border-white/20 transition-all duration-500'>
            {/* Ambient decorative glowing border overlay inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-teal/5 pointer-events-none" />
            
            <Slideshow />
            
            {/* Small floating offer tag */}
            {close && (
              <div className='absolute bottom-6 left-6 right-6 z-20 glass-card p-5 rounded-2xl border border-white/10 flex justify-between items-center shadow-lg shadow-black/50 animate-fade-in'>
                <div className='space-y-1 pr-6'>
                  <h3 className='text-sm font-serif font-semibold text-white'>Charlotte Tilbury Special</h3>
                  <p className='text-xs text-gray-400'>Get 20% off on all Charlotte Tilbury lipsticks.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => router.push('/details/1')} 
                    className='bg-white text-black font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg hover:bg-accent hover:text-white transition-colors duration-300 shadow-md cursor-pointer'
                  >
                    Get Offer
                  </button>
                  <button 
                    onClick={() => setClose(false)} 
                    className='text-gray-400 hover:text-white text-lg p-1 transition-colors duration-200'
                  >
                    <RxCross1 />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero