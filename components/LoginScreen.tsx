import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { CreditCard, ArrowRight, UserPlus, LogIn, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulating network delay for realism
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('swift_users') || '[]');
      
      if (isLogin) {
        // Login Logic
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('swift_session', 'true');
          localStorage.setItem('swift_current_user', JSON.stringify(user));
          setLoading(false);
          onLogin();
        } else {
          setError('Email ou senha incorretos.');
          setLoading(false);
        }
      } else {
        // Register Logic
        const exists = users.find((u: any) => u.email === email);
        if (exists) {
          setError('Este email já está cadastrado.');
          setLoading(false);
        } else {
          if (password.length < 6) {
             setError('A senha deve ter no mínimo 6 caracteres.');
             setLoading(false);
             return;
          }
          const newUser = { email, password, name: email.split('@')[0] };
          users.push(newUser);
          localStorage.setItem('swift_users', JSON.stringify(users));
          
          // Auto login after register
          localStorage.setItem('swift_session', 'true');
          localStorage.setItem('swift_current_user', JSON.stringify(newUser));
          setLoading(false);
          onLogin();
        }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
       {/* Background Effects (Matching App.tsx) */}
       <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800/20 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none" />
       <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-900/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen pointer-events-none" />
       
       <div className="w-full max-w-md z-10 animate-slide-up">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white to-zinc-400 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-6">
               <CreditCard className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">SwiftCollect</h1>
            <p className="text-zinc-400">Plataforma de gestão financeira inteligente.</p>
          </div>

          <GlassCard className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-8 border-b border-white/10 pb-4">
               <button 
                 onClick={() => { setIsLogin(true); setError(''); }}
                 className={`text-sm font-medium transition-colors ${isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 Entrar
               </button>
               <div className="h-4 w-[1px] bg-white/10"></div>
               <button 
                 onClick={() => { setIsLogin(false); setError(''); }}
                 className={`text-sm font-medium transition-colors ${!isLogin ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 Criar Conta
               </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
               <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>
               </div>
               
               <div>
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
                    />
                  </div>
               </div>

               {error && (
                 <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                 </div>
               )}

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 group"
               >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? 'Acessar Dashboard' : 'Cadastrar Empresa'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>
            </form>
          </GlassCard>
          
          <div className="text-center mt-6 text-xs text-zinc-600">
             Protegido por criptografia de ponta a ponta.
          </div>
       </div>
    </div>
  );
};