import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMovies } from '../hooks/useMovies';
import { usePersonalization } from '../hooks/usePersonalization';
import MovieCard from './MovieCard';
import { Play, Plus, Clock, Star, Calendar, ArrowLeft, Loader2, X, Share2, Info, Heart, Check } from 'lucide-react';

const MovieDetailsPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { getDetails } = useMovies();
  const { addToHistory, addToFavorites, removeFromFavorites, favorites, fetchFavorites } = usePersonalization();
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [activeServer, setActiveServer] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const data = await getDetails(type, id);
      if (data) {
        setMovie(data.content);
        // Track History
        if (isAuthenticated) {
            addToHistory({
                movie_id: data.content.id,
                movie_type: type,
                title: data.content.title || data.content.name,
                poster_path: data.content.poster_path
            });
            fetchFavorites();
        }
      }
      setLoading(false);
    };
    fetchMovie();
    window.scrollTo(0, 0);
  }, [type, id, getDetails, isAuthenticated]); // addToHistory and fetchFavorites are from hook, should be memoized or handled carefully

  useEffect(() => {
    if (movie && favorites) {
        setIsFavorite(favorites.some(f => f.movie_id === movie.id));
    }
  }, [movie, favorites]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) return navigate('/login');
    if (isFavorite) {
        await removeFromFavorites(movie.id);
    } else {
        await addToFavorites({
            movie_id: movie.id,
            movie_type: type,
            title: movie.title || movie.name,
            poster_path: movie.poster_path
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E50914] animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="text-xl font-mono">ERROR_NO_DATA_FOUND_SYSTEM_HALT</p>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  
  // Immersive UI Variables
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      
      {/* Immersive Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
        <img 
          src={backdropUrl} 
          alt={movie.title || movie.name}
          className="w-full h-full object-cover opacity-20 scale-105"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 pt-12 pb-24">
        
        {/* Top Header Controls */}
        <div className="flex justify-between items-center mb-12">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 text-zinc-400 hover:text-[#E50914] transition-all group px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-mono tracking-widest uppercase">BACK_TO_GRID</span>
            </button>

            <div className="flex gap-4">
               <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#E50914] transition-all">
                  <Share2 className="w-4 h-4" />
               </button>
               {isAuthenticated && (
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`p-3 border rounded-full transition-all group ${isFavorite ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-white/5 border-white/10 text-white hover:bg-[#E50914]/20 hover:border-[#E50914]'}`}
                  >
                    {isFavorite ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  </button>
               )}
            </div>
        </div>

        {/* Primary Movie Information Section */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-24 mb-32 items-end">
          
          {/* Vertical Poster & Tech Data Box */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
             <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`} 
                    alt={movie.title || movie.name}
                    className="w-full aspect-[2/3] object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button 
                       onClick={() => setShowTrailer(true)}
                       className="bg-[#E50914] text-white p-6 rounded-full hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229,9,20,0.6)]"
                    >
                        <Play className="w-10 h-10 fill-white" />
                    </button>
                </div>
             </div>
             
             {/* Dynamic Tech Data Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">NETWORK_STREAM</p>
                    <p className="font-bold text-[#E50914] font-mono">4K_ULTRA_HD</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">LATENCY_SYNC</p>
                    <p className="font-bold font-mono text-zinc-300">STABLE_15ms</p>
                </div>
             </div>
          </div>

          {/* Cinematic Metadata Details */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="space-y-6">
                <div className="space-y-3">
                    <p className="text-[#E50914] font-mono tracking-[0.5em] text-xs uppercase font-black italic">
                        // CORE_IDENTIFIER: {movie.imdb_id || movie.id}
                    </p>
                    <h1 className="text-6xl lg:text-[7rem] font-bold italic tracking-tigh leading-[0.85]" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {movie.title || movie.name}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-white font-black text-lg">{movie.vote_average?.toFixed(1)}</span>
                        <span className="opacity-40">/ 10</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="uppercase tracking-widest">YEAR_{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
                    </div>
                    {movie.runtime && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="uppercase tracking-widest">{movie.runtime} MINUTES_STREAMS</span>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-2xl leading-relaxed text-zinc-300 max-w-4xl font-light opacity-90 border-l-2 border-[#E50914] pl-8">
                {movie.overview}
            </p>

            {/* Action Matrix */}
            <div className="flex flex-wrap gap-6 pt-6">
                <button 
                   onClick={() => setShowTrailer(true)}
                   className="bg-[#E50914] text-white px-14 py-6 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(229,9,20,0.5)] flex items-center gap-4 text-sm tracking-widest"
                >
                    <Play className="fill-white" />
                    INITIALIZE STREAM
                </button>
                <button 
                    onClick={handleFavoriteToggle}
                    className={`px-10 py-6 rounded-2xl font-black backdrop-blur-md transition-all flex items-center gap-4 text-xs tracking-widest group border ${isFavorite ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                    {isFavorite ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />}
                    {isFavorite ? 'IN_LIBRARY' : 'ADD_TO_QUEUE'}
                </button>
            </div>

            {/* Classification Tags */}
            <div className="space-y-4">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-bold italic">GENRE_CLASSIFICATION_LAYER</p>
                <div className="flex flex-wrap gap-3">
                    {movie.genres?.map((genre) => (
                        <span key={genre.id} className="bg-white/5 hover:bg-[#E50914]/20 hover:border-[#E50914] transition-all border border-white/10 px-8 py-3 rounded-full text-[10px] font-mono uppercase font-bold tracking-widest cursor-pointer group">
                           <span className="text-[#E50914] group-hover:text-white mr-2">//</span> {genre.name}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Global Horizontal Scroll Layers (Cast & Recommendations) */}
        <div className="space-y-32">
            
            {/* 1. Cast Scroll Layer */}
            <section className="space-y-10">
                <div className="flex items-end gap-6 mb-8">
                    <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
                        The Main Operators.
                    </h3>
                    <div className="h-[2px] flex-1 bg-white/5 mb-2 relative">
                        <div className="absolute left-0 top-0 h-full w-24 bg-[#E50914]"></div>
                    </div>
                </div>
                
                <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x">
                    {movie.credits?.cast?.slice(0, 15).map((actor) => (
                        <div key={actor.id} className="flex-shrink-0 w-48 snap-start group cursor-pointer">
                            <div className="aspect-square rounded-full overflow-hidden border-2 border-white/10 mb-6 group-hover:border-[#E50914] transition-all grayscale group-hover:grayscale-0 scale-95 group-hover:scale-105 duration-500">
                                <img 
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x185?text=NO_PROFILE'} 
                                    className="w-full h-full object-cover" 
                                    alt={actor.name}
                                />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="font-bold text-sm tracking-tight">{actor.name}</p>
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest line-clamp-1">{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Recommendations Scroll Layer */}
            <section className="space-y-10">
                <div className="flex items-end gap-6 mb-8">
                    <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
                       Neural Matches.
                    </h3>
                    <div className="h-[2px] flex-1 bg-white/5 mb-2 relative">
                        <div className="absolute left-0 top-0 h-full w-48 bg-[#E50914]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {movie.similar?.results?.slice(0, 5).map((sim) => (
                        <MovieCard key={sim.id} movie={{...sim, media_type: type}} />
                    ))}
                </div>
            </section>
        </div>

      </div>

      {/* Modern Player Modal (Overlay) */}
      {showTrailer && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6 lg:p-24">
            <div className="relative w-full max-w-7xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(229,9,20,0.3)] border border-white/10">
                
                {/* Control Bar */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
                   <div className="flex items-center gap-6">
                      <h4 className="font-mono text-[10px] tracking-[0.5em] text-[#E50914] uppercase font-bold italic">TRAILER_STREAM_ACTIVE</h4>
                      <div className="flex gap-2">
                         {[1, 2, 3, 4].map((s) => (
                            <button 
                               key={s}
                               onClick={() => setActiveServer(s)}
                               className={`px-3 py-1 rounded-md text-[8px] font-mono border ${activeServer === s ? 'bg-[#E50914] border-[#E50914] text-white' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}
                            >
                               SERVER_0{s}
                            </button>
                         ))}
                      </div>
                   </div>
                   <button 
                      onClick={() => setShowTrailer(false)}
                      className="p-3 bg-white/10 rounded-full hover:bg-[#E50914] transition-all"
                   >
                     <X className="w-5 h-5" />
                   </button>
                </div>

                {/* The Player */}
                {trailer ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                      className="w-full h-full"
                      allowFullScreen
                      title="Trailer"
                    ></iframe>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                        <Info className="w-12 h-12 text-[#E50914]" />
                        <p className="font-mono text-zinc-500 uppercase tracking-widest">ERROR_CODE_TRAILER_NOT_FOUND_FOR_STREAM</p>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
