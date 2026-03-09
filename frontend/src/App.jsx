import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import SignupPage from './features/auth/ui/SignupPage.jsx';
import LoginPage from './features/auth/ui/LoginPage.jsx';
import MovieDetailsPage from './features/movies/ui/MovieDetailsPage.jsx';
import MovieRow from './features/movies/ui/MovieRow.jsx';
import SearchPage from './features/movies/ui/SearchPage.jsx';
import LibraryPage from './features/movies/ui/LibraryPage.jsx';
import ProfilePage from './features/movies/ui/ProfilePage.jsx';
import { useMovies } from './features/movies/hooks/useMovies';
import { usePersonalization } from './features/movies/hooks/usePersonalization';
import { logout } from './features/auth/state/authSlice';
import { Search as SearchIcon, User, Bookmark, History } from 'lucide-react';
import './index.css';

const Home = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { trending, popular, loading, fetchTrending, fetchPopular } = useMovies();

    useEffect(() => {
        fetchTrending();
        fetchPopular('movie');
        fetchPopular('tv');
    }, [fetchTrending, fetchPopular]);

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-x-hidden">
            {/* Technical Grid Background */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Sticky Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-xl border-b border-white/5 bg-black/20">
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-2xl font-bold italic tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
                        VIBECINEMA
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-[10px] font-mono text-zinc-400">
                        <Link to="/" className="hover:text-[#E50914] transition-colors">// TRENDING</Link>
                        <Link to="/search" className="hover:text-[#E50914] transition-colors flex items-center gap-2 group">
                           <SearchIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                           // DISCOVER
                        </Link>
                        {isAuthenticated && (
                           <Link to="/library" className="hover:text-[#E50914] transition-colors flex items-center gap-2 group">
                              <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              // MY_LIBRARY
                           </Link>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-6">
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-white/5 border border-white/10 rounded-full group-hover:bg-[#E50914]/20 group-hover:border-[#E50914] transition-all">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter group-hover:text-white transition-colors">{user?.username}</span>
                            </Link>
                            <button 
                                onClick={() => dispatch(logout())}
                                className="text-[10px] font-mono hover:text-[#E50914] transition-colors text-[#E50914]"
                            >
                                EXIT_SYS
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-[10px] font-mono hover:text-[#E50914] transition-colors tracking-widest">LOGIN</Link>
                            <Link to="/signup" className="bg-[#E50914] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,9,20,0.3)]">
                                INITIALIZE
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Conditional Hero Section */}
            {!isAuthenticated ? (
                <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-8 pt-32">
                    <div className="relative z-10 max-w-5xl space-y-10">
                        <div className="flex justify-center items-center gap-4 mb-2">
                            <span className="h-[1px] w-12 bg-[#E50914] opacity-50"></span>
                            <p className="text-[#E50914] font-mono tracking-[0.5em] text-[11px] uppercase font-black">
                                GENERATE ONCE, PUBLISH EVERYWHERE
                            </p>
                            <span className="h-[1px] w-12 bg-[#E50914] opacity-50"></span>
                        </div>
                        
                        <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter text-white italic leading-[0.8] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                            One Piece of Content.<br/>
                            <span className="text-zinc-800 font-extralight not-italic">Every Platform instantly.</span>
                        </h1>
                        
                        <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base font-mono leading-relaxed opacity-80 underline decoration-[#E50914] underline-offset-8">
                            Zero-latency neural bridging for the next generation of digital entertainment. 
                            Immersive high-speed data streams pulsing with extreme energy.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 pt-10">
                            <Link to="/signup" className="bg-[#E50914] text-white px-14 py-6 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_0_50px_rgba(229,9,20,0.4)] relative group overflow-hidden tracking-widest uppercase text-xs">
                               <span className="relative z-10">INITIALIZE ACCESS</span>
                               <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="pt-40 px-12 max-w-7xl mx-auto w-full">
                     <div className="space-y-4 mb-16 px-4">
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-12 bg-[#E50914]"></div>
                            <p className="text-[#E50914] font-mono tracking-[0.5em] text-[11px] uppercase font-black">
                                // WELCOME COMMANDER
                            </p>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white italic" style={{ fontFamily: 'Syne, sans-serif' }}>
                            Terminal Ready.<br/><span className="text-zinc-700 font-extralight not-italic">Synchronize transmissions.</span>
                        </h1>
                    </div>
                </div>
            )}

            {/* Movie Rows */}
            <div className={`space-y-4 pb-24 relative ${isAuthenticated ? 'pt-0' : ''}`}>
                <MovieRow title="Trending Now" movies={trending} loading={loading} />
                <MovieRow title="Popular Movies" movies={popular.movie} loading={loading} />
                <MovieRow title="Television Series" movies={popular.tv} loading={loading} />
            </div>

            {/* Footer */}
            <footer className="px-12 py-20 border-t border-white/5 bg-black/40 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
                    <div className="text-2xl font-bold italic tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>VIBECINEMA</div>
                    <div className="flex gap-12 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        <span>© 2026 QUANTUM_NEURAL_SYS</span>
                        <Link to="/" className="hover:text-[#E50914] transition-colors">PRIVACY_POLICY</Link>
                        <span className="flex items-center gap-2">SYSTEM_STATUS: <span className="text-[#E50914] animate-pulse">ONLINE_0.5ms</span></span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const HistoryTracker = () => {
    const location = useLocation();
    const { addToHistory } = usePersonalization();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        // Track history if viewing details
        const match = location.pathname.match(/\/details\/(movie|tv)\/(\d+)/);
        if (match && isAuthenticated) {
           const [_, type, id] = match;
           // We'll need movie data to add to history. 
           // For now, details page handles its own tracking once data is loaded.
        }
    }, [location.pathname, isAuthenticated, addToHistory]);

    return null;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <HistoryTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/details/:type/:id" element={<MovieDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
