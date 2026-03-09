import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login, loading, error } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[#0D0D0D] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 italic" style={{ fontFamily: 'Syne, sans-serif' }}>
                            VibeCinema
                        </h1>
                        <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">
                            // AUTHORIZE OPERATOR
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm text-center font-mono">
                                ERROR: {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#E50914] transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] outline-none transition-all"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#E50914] transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] outline-none transition-all"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#E50914] hover:bg-[#ff0f1f] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group relative overflow-hidden shadow-[0_0_20px_rgba(229,9,20,0.3)]"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    ENTER SYSTEM
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-zinc-500 text-sm">
                            New identity?{' '}
                            <Link to="/signup" className="text-white hover:text-[#E50914] transition-colors font-bold uppercase tracking-wider">
                                REGISTER NOW
                            </Link>
                        </p>
                    </div>
                </div>

                {/* HUD Footer Decor */}
                <div className="mt-6 flex justify-between px-2 opacity-30 pointer-events-none">
                    <span className="text-[10px] font-mono text-zinc-500">VERSION_7.3.1_DEV</span>
                    <span className="text-[10px] font-mono text-zinc-500">SYSTEM_ONLINE: YES</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
