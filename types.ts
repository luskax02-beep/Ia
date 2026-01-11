export enum InvoiceStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  email: string;
}

export enum ToneType {
  FRIENDLY = 'Friendly',
  PROFESSIONAL = 'Professional',
  DIRECT = 'Direct',
}

export interface ChartData {
  name: string;
  value: number;
}