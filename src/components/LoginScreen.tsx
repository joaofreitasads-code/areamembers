import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Sparkles, Box, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { MemberUser, STORAGE_USER_KEY } from '../types/auth';

interface LoginScreenProps {
  onLogin: (user: MemberUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setError('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setError('');
    setIsLoading(true);

    const user: MemberUser = {
      name: trimmedName,
      email: trimmedEmail,
      loginDate: new Date().toISOString(),
      vipStatus: true
    };

    if (rememberMe) {
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      } catch (err) {
        console.error('Failed to save user session', err);
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_USER_KEY);
      } catch (err) {
        console.error('Failed to clear user session', err);
      }
    }

    setTimeout(() => {
      setIsLoading(false);
      onLogin(user);
    }, 60);
  };

  const handleQuickLogin = (demoName: string, demoEmail: string) => {
    setName(demoName);
    setEmail(demoEmail);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div
          className="w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.6) 0%, rgba(0, 163, 255, 0.3) 40%, transparent 70%)'
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2 shadow-lg shadow-emerald-950/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>ÁREA DE MEMBROS VIP</span>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm shadow-md">
              <Box className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white font-sans">
              UNIVERSO 3D
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Identifique-se com seu <strong className="text-white">Nome</strong> e <strong className="text-white">E-mail</strong> para acessar o catálogo de modelos STL e o Drive oficial.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#121212] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-red-300 text-xs font-bold text-left animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Input Nome */}
            <div className="space-y-1.5">
              <label htmlFor="login-name" className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seu Nome Completo</span>
              </label>
              <div className="relative">
                <input
                  id="login-name"
                  type="text"
                  required
                  autoFocus
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Freitas"
                  className="w-full bg-[#181818] border border-[#333333] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-neutral-500 text-sm rounded-xl py-3 px-4 outline-none transition"
                />
              </div>
            </div>

            {/* Input E-mail */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seu E-mail de Acesso</span>
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-[#181818] border border-[#333333] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white placeholder-neutral-500 text-sm rounded-xl py-3 px-4 outline-none transition"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-400 hover:text-white transition">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#333333] bg-[#1a1a1a] text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <span>Lembrar meu acesso neste dispositivo</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs font-mono uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer active:scale-[0.99] mt-2"
            >
              {isLoading ? (
                <span>Acessando...</span>
              ) : (
                <>
                  <span>ENTRAR NA ÁREA DE MEMBROS</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Pre-fill Shortcut for João Freitas */}
          <div className="pt-2 border-t border-[#222222] flex items-center justify-between">
            <span className="text-[11px] text-neutral-500">Acesso rápido:</span>
            <button
              type="button"
              onClick={() => handleQuickLogin('João Freitas', 'joao.freitas.ads@gmail.com')}
              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline transition cursor-pointer"
            >
              Preencher João Freitas
            </button>
          </div>
        </div>

        {/* Feature Highlights Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono text-neutral-400 text-center">
          <div className="p-2.5 rounded-xl bg-[#101010] border border-[#202020] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Drive Liberado</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101010] border border-[#202020] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Licença Vitalícia</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101010] border border-[#202020] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>STLs Oficiais</span>
          </div>
        </div>
      </div>
    </div>
  );
};
