import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePersonalization } from '../hooks/usePersonalization';
import MovieCard from './MovieCard';
import { Plus, X, Trash2, Heart, History, Loader2, ArrowLeft } from 'lucide-react';

const LibraryPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { favorites, history, loading: personalizationLoading, fetchFavorites, fetchHistory, removeFromFavorites, deleteFromHistory } = usePersonalization();
    const [activeTab, setActiveTab] = useState('favorites'); // favorites, history

    useEffect(() => {
        if (!isAuthenticated) return navigate('/login');
        fetchFavorites();
        fetchHistory();
    }, [isAuthenticated, fetchFavorites, fetchHistory, navigate]);

    if (personalizationLoading && (favorites.length === 0 && history.length === 0)) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#E50914] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Background Grid */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header with Back Button */}
                <div className="flex items-center gap-8 mb-16 px-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#E50914] transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[#E50914] font-mono tracking-[0.5em] text-[10px] uppercase">// PERSONAL_DATA_MODULE</p>
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tigh leading-[0.85]" style={{ fontFamily: 'Syne, sans-serif' }}>Operator Library</h1>
                    </div>
                </div>

                {/* Tab Switcher HUD */}
                <div className="flex gap-4 mb-16 px-4">
                    {[
                        { id: 'favorites', label: 'FAVORITES_COLLECTION', icon: Heart },
                        { id: 'history', label: 'WATCH_CHRONICLE', icon: History }
                    ].map((tab) => (
                        <button 
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className={`flex items-center gap-4 px-10 py-5 rounded-2xl text-[10px] font-mono tracking-widest uppercase transition-all border ${activeTab === tab.id ? 'bg-[#E50914] border-[#E50914] text-white shadow-[0_0_30px_rgba(229,9,20,0.3)]' : 'bg-white/5 border-white/10 text-zinc-500 hover:text-white'}`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'fill-white' : ''}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {activeTab === 'favorites' ? (
                        favorites && favorites.length > 0 ? (
                            favorites.map((fav) => (
                                <div key={fav.id} className="relative group">
                                    <MovieCard movie={{...fav, id: fav.movie_id, media_type: fav.movie_type}} />
                                    <button 
                                       onClick={() => removeFromFavorites(fav.movie_id)}
                                       className="absolute top-4 right-4 p-3 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-[#E50914] transition-all"
                                    >
                                       <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center space-y-4 opacity-30">
                                <Heart className="w-16 h-16 mx-auto mb-6" />
                                <div className="text-xl font-mono uppercase tracking-[0.5em]">LIBRARY_EMPTY</div>
                            </div>
                        )
                    ) : (
                        history && history.length > 0 ? (
                            history.map((h) => (
                                <div key={h.id} className="relative group">
                                    <MovieCard movie={{...h, id: h.movie_id, media_type: h.movie_type}} />
                                    <button 
                                       onClick={() => deleteFromHistory(h.id)}
                                       className="absolute top-4 right-4 p-3 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-[#E50914] transition-all"
                                    >
                                       <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center space-y-4 opacity-30">
                                <History className="w-16 h-16 mx-auto mb-6" />
                                <div className="text-xl font-mono uppercase tracking-[0.5em]">CHRONICLE_EMPTY</div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
