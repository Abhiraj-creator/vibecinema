import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import { Search, X, Loader2, ArrowLeft, Filter } from 'lucide-react';

const SearchPage = () => {
    const navigate = useNavigate();
    const { fetchSearch, loading } = useMovies();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [activeType, setActiveType] = useState('movie'); // movie, tv, person

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;
        const data = await fetchSearch(activeType, query);
        setResults(data);
    };

    useEffect(() => {
        if (query.trim()) {
            const delay = setTimeout(() => {
                handleSearch();
            }, 800);
            return () => clearTimeout(delay);
        } else {
            setResults([]);
        }
    }, [query, activeType]);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Background Grid */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header with Back Button */}
                <div className="flex items-center gap-8 mb-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#E50914] transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[#E50914] font-mono tracking-[0.5em] text-[10px] uppercase">// SYNC_SEARCH_MODULE</p>
                        <h1 className="text-4xl font-bold tracking-tighter italic" style={{ fontFamily: 'Syne, sans-serif' }}>Unified Neural Discovery</h1>
                    </div>
                </div>

                {/* Search Input HUD */}
                <div className="max-w-4xl mx-auto space-y-8 mb-20">
                    <div className="relative group">
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10 group-focus-within:bg-[#E50914] transition-all"></div>
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#E50914] transition-all w-6 h-6" />
                        <input 
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="SEARCH_FOR_TRANSMISSIONS..."
                            className="w-full bg-transparent border-none py-6 pl-12 text-2xl md:text-4xl font-light focus:ring-0 placeholder-zinc-800"
                            autoFocus
                        />
                        {query && (
                            <button 
                                onClick={() => setQuery('')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        {['movie', 'tv', 'person'].map((type) => (
                            <button 
                                key={type}
                                onClick={() => setActiveType(type)}
                                className={`px-10 py-3 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all border ${activeType === type ? 'bg-[#E50914] border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.4)]' : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/20 hover:text-white'}`}
                            >
                                {type}_CLASSIFICATION
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <Loader2 className="w-12 h-12 text-[#E50914] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                        {results.map((item) => (
                            <MovieCard key={item.id} movie={{...item, media_type: activeType}} />
                        ))}
                    </div>
                )}

                {!loading && query && results.length === 0 && (
                    <div className="text-center py-32 space-y-4">
                        <div className="text-[#E50914] font-mono text-xl uppercase tracking-widest">ZERO_MATCHES_DETECTED</div>
                        <p className="text-zinc-600 font-mono text-[10px]">VERIFY_SEARCH_PARAMETERS_AND_RETRY</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
