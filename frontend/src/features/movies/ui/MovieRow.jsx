import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const MovieRow = ({ title, movies, loading }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth * 0.8;
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-20 px-4 md:px-12 relative z-10 group/row">
      <div className="flex items-end justify-between mb-8 px-2">
        <div className="space-y-1">
          <p className="text-[#E50914] font-mono tracking-[0.5em] text-[10px] uppercase">
            // DISCOVER THE SOURCE
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white italic" style={{ fontFamily: 'Syne, sans-serif' }}>
            {title}
          </h2>
        </div>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group/btn">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">View Archive</span>
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="relative">
        {/* Left Control */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-[#E50914] text-white p-4 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all -translate-x-6 hover:scale-110 shadow-2xl hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-10 overflow-x-auto overflow-y-visible pb-12 scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {loading ? (
              [...Array(6)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-48 md:w-56 aspect-[2/3] animate-pulse bg-white/5 rounded-2xl border border-white/10" />
              ))
          ) : (
              movies && movies.filter(m => m && m.id).map((movie) => (
                  <div key={movie.id} className="snap-start first:pl-2">
                      <MovieCard movie={movie} />
                  </div>
              ))
          )}
        </div>

        {/* Right Control */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-[#E50914] text-white p-4 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover/row:opacity-100 transition-all translate-x-6 hover:scale-110 shadow-2xl hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
