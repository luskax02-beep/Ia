import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Jan', value: 850 },
  { name: 'Fev', value: 920 },
  { name: 'Mar', value: 1450 },
  { name: 'Abr', value: 1100 },
  { name: 'Mai', value: 1300 },
  { name: 'Jun', value: 980 },
  { name: 'Jul', value: 1750 },
];

const barData = [
  { name: 'Pago', value: 85 },
  { name: 'Pendente', value: 10 },
  { name: 'Atrasado', value: 5 },
];

const StatCard = ({ title, value, sub, icon: Icon, trend }: any) => (
  <GlassCard className="p-6 flex flex-col justify-between h-32 hover:border-white/30 transition-colors cursor-default">
    <div className="flex justify-between items-start">
      <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{title}</div>
      <Icon className="w-5 h-5 text-white/50" />
    </div>
    <div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      <div className={`text-xs mt-1 font-medium ${trend === 'up' ? 'text-green-400' : 'text-zinc-500'}`}>
        {sub}
      </div>
    </div>
  </GlassCard>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Receita Total" 
          value="R$ 7.250" 
          sub="+12% vs mês anterior" 
          icon={DollarSign} 
          trend="up"
        />
        <StatCard 
          title="Clientes Ativos" 
          value="14" 
          sub="+2 novos esta semana" 
          icon={Users} 
          trend="up"
        />
        <StatCard 
          title="Atrasados" 
          value="R$ 350" 
          sub="2 faturas vencidas" 
          icon={AlertCircle} 
          trend="down"
        />
        <StatCard 
          title="Taxa de Conversão" 
          value="98.2%" 
          sub="Pagamentos bem sucedidos" 
          icon={CheckCircle2} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <h3 className="text-lg font-semibold text-white mb-6">Fluxo de Caixa</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#52525b" 
                  tick={{fill: '#71717a', fontSize: 12}} 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `R$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#fff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Secondary Chart / Activity */}
        <GlassCard className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-6">Status das Faturas</h3>
          <div className="h-[200px] w-full mb-6">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={70} 
                  tick={{fill: '#a1a1aa', fontSize: 12}} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#fff" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm text-zinc-500 uppercase font-bold tracking-wider mb-3">Atividade Recente</h4>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">João D. pagou</div>
                    <div className="text-xs text-zinc-500">Há 2 horas</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-green-400">+ R$ 150</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;