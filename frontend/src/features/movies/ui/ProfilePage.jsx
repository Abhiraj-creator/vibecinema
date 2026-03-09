import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../auth/state/authSlice';
import { ArrowLeft, User, Shield, Terminal, LogOut, Loader2, Sparkles } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) return navigate('/login');

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Background Neural Grid */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
                {/* Header with Back Button */}
                <div className="flex items-center gap-8 mb-20">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#E50914] transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[#E50914] font-mono tracking-[0.5em] text-[10px] uppercase">// PROFILE_ACCESS_MODULE</p>
                        <h1 className="text-5xl font-black italic tracking-tigh" style={{ fontFamily: 'Syne, sans-serif' }}>Operator Profile.</h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-[250px_1fr] gap-12 items-start">
                    {/* Left: Avatar Layer */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div className="aspect-square rounded-3xl overflow-hidden border-2 border-white/10 relative group p-1 bg-gradient-to-tr from-[#E50914] to-transparent">
                            <div className="bg-[#0D0D0D] w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden">
                                <User className="w-24 h-24 text-zinc-800" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                    <div className="px-4 py-1.5 bg-[#E50914] rounded-full text-[8px] font-mono font-bold tracking-[0.3em] uppercase animate-pulse">
                                       OPERATOR_ACTIVE
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Clearance_level</p>
                                <p className="font-bold text-[#E50914]">LEVEL_05_ELITE</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Session_id</p>
                                <p className="font-bold text-zinc-300 font-mono text-xs">{user?.id || 'AUTH_TOKEN'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info Matrix */}
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
                        <div className="grid gap-8">
                             <div className="group space-y-2">
                                <label className="text-[10px] font-mono text-[#E50914] uppercase tracking-[0.5em] font-black italic ml-2">Operator_name_sync</label>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-light hover:border-[#E50914] transition-all focus-within:border-[#E50914]">
                                    {user?.username}
                                </div>
                             </div>
                             
                             <div className="group space-y-2">
                                <label className="text-[10px] font-mono text-[#E50914] uppercase tracking-[0.5em] font-black italic ml-2">Comm_link_address</label>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-light hover:border-[#E50914] transition-all focus-within:border-[#E50914]">
                                    {user?.email}
                                </div>
                             </div>
                        </div>

                        {/* Profile Customization Options HUD */}
                        <div className="grid grid-cols-2 gap-4">
                             <button className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <Sparkles className="w-5 h-5 text-[#E50914]" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest">Visual_Customs</span>
                                </div>
                                <Terminal className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                             </button>
                             <button className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <Shield className="w-5 h-5 text-[#E50914]" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest">Secure_Protocol</span>
                                </div>
                                <Terminal className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                             </button>
                        </div>

                        {/* Logout Command */}
                        <div className="pt-12 border-t border-white/5">
                            <button 
                               onClick={() => {
                                   dispatch(logout());
                                   navigate('/');
                               }}
                               className="w-full flex items-center justify-center gap-4 py-8 bg-[#E50914]/10 border border-[#E50914]/30 rounded-3xl text-[#E50914] font-black tracking-[1em] uppercase hover:bg-[#E50914] hover:text-white transition-all group shadow-[0_0_50px_rgba(229,9,20,0.1)]"
                            >
                                <LogOut className="group-hover:-translate-x-2 transition-transform" />
                                TERMINATE_SYS_SESSION
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
