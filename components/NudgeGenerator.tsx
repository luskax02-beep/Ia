import React, { useState } from 'react';
import { generateNudgeMessage } from '../services/geminiService';
import { ToneType } from '../types';
import { GlassCard } from './ui/GlassCard';
import { Sparkles, Copy, Send, Loader2 } from 'lucide-react';

const NudgeGenerator: React.FC = () => {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [daysOverdue, setDaysOverdue] = useState('');
  const [tone, setTone] = useState<ToneType>(ToneType.PROFESSIONAL);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!clientName || !amount) return;
    setLoading(true);
    const result = await generateNudgeMessage(clientName, amount, daysOverdue || '0', tone);
    setGeneratedMessage(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-full bg-white/10 border border-white/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Régua de Nudges IA</h2>
          <p className="text-zinc-400">Gere cobranças personalizadas em segundos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <GlassCard className="h-full">
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">Configurar Cobrança</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Nome do Cliente</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: Agência Criativa Ltda"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Valor (R$)</label>
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1.500,00"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Dias em Atraso</label>
                <input 
                  type="number" 
                  value={daysOverdue}
                  onChange={(e) => setDaysOverdue(e.target.value)}
                  placeholder="3"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Tom de Voz</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(ToneType).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      tone === t 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
                    }`}
                  >
                    {t === ToneType.FRIENDLY && 'Amigável'}
                    {t === ToneType.PROFESSIONAL && 'Profissional'}
                    {t === ToneType.DIRECT && 'Direto'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !clientName}
              className="w-full mt-4 bg-white text-black hover:bg-zinc-200 font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Gerar Mensagem com IA</span>
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Output Section */}
        <GlassCard className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-200">Pré-visualização</h3>
            {generatedMessage && (
               <div className="flex gap-2">
                 <button className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Copiar">
                    <Copy className="w-4 h-4 text-zinc-400" />
                 </button>
               </div>
            )}
          </div>
          
          <div className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 relative overflow-hidden group">
            {!generatedMessage ? (
              <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm italic">
                A mensagem gerada aparecerá aqui...
              </div>
            ) : (
              <div className="text-zinc-100 whitespace-pre-wrap leading-relaxed animate-fade-in">
                {generatedMessage}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg border border-white/10 text-zinc-300 hover:bg-white/5 text-sm font-medium transition-colors">
              Editar
            </button>
            <button className="px-4 py-2 rounded-lg bg-green-600/20 text-green-400 border border-green-500/20 hover:bg-green-600/30 text-sm font-bold transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar WhatsApp
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default NudgeGenerator;