import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { Invoice, InvoiceStatus } from '../types';
import { Plus, Search, Filter, MoreVertical, Check, AlertCircle, Clock } from 'lucide-react';

const mockInvoices: Invoice[] = [
  { id: 'INV-001', clientName: 'TechSolutions Inc.', amount: 450.00, status: InvoiceStatus.PAID, dueDate: '2023-10-15', email: 'fin@techsol.com' },
  { id: 'INV-002', clientName: 'Agência Vibe', amount: 125.00, status: InvoiceStatus.OVERDUE, dueDate: '2023-10-20', email: 'contato@vibe.com' },
  { id: 'INV-003', clientName: 'Roberto Silva', amount: 80.00, status: InvoiceStatus.PENDING, dueDate: '2023-10-28', email: 'beto@gmail.com' },
  { id: 'INV-004', clientName: 'Monica Geller', amount: 320.00, status: InvoiceStatus.PENDING, dueDate: '2023-10-30', email: 'chef@monica.com' },
  { id: 'INV-005', clientName: 'Barney Stinson', amount: 1500.00, status: InvoiceStatus.PAID, dueDate: '2023-10-10', email: 'awesome@barney.com' },
];

const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const styles = {
    [InvoiceStatus.PAID]: 'bg-zinc-800 text-white border-zinc-600',
    [InvoiceStatus.PENDING]: 'bg-zinc-900/50 text-zinc-400 border-zinc-800',
    [InvoiceStatus.OVERDUE]: 'bg-white text-black border-white font-bold',
  };

  const icons = {
    [InvoiceStatus.PAID]: <Check className="w-3 h-3 mr-1" />,
    [InvoiceStatus.PENDING]: <Clock className="w-3 h-3 mr-1" />,
    [InvoiceStatus.OVERDUE]: <AlertCircle className="w-3 h-3 mr-1" />,
  };

  return (
    <span className={`flex items-center px-2.5 py-1 rounded-full text-xs border ${styles[status]}`}>
      {icons[status]}
      {status === InvoiceStatus.OVERDUE ? 'Atrasado' : status === InvoiceStatus.PAID ? 'Pago' : 'Pendente'}
    </span>
  );
};

const Invoices: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Faturas & Cobranças</h2>
          <p className="text-zinc-400">Gerencie seus links de pagamento e status.</p>
        </div>
        <button className="bg-white hover:bg-zinc-200 text-black px-4 py-2.5 rounded-lg font-bold flex items-center justify-center transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Novo Link de Pagamento
        </button>
      </div>

      <GlassCard className="p-0">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou ID..." 
              className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <button className="px-3 py-2 border border-white/10 rounded-lg text-zinc-400 hover:bg-white/5 flex items-center justify-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-zinc-500 bg-white/5 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-4">Fatura</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-mono text-zinc-400">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{inv.clientName}</td>
                  <td className="px-6 py-4 text-white">R$ {inv.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-zinc-400">{new Date(inv.dueDate).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <span>Mostrando 5 de 128 faturas</span>
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5">Próximo</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Invoices;