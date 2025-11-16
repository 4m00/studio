export type Kpi = {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  status: 'success' | 'warning' | 'destructive' | 'neutral';
};

export type MonthlyCost = {
  month: string;
  fact: number;
  plan: number;
};

export type CostStructure = {
  name: string;
  value: number;
};

export type BudgetDeviation = {
  department: string;
  plan: number;
  fact: number;
  deviation: number;
};

export type RequestStatus = {
  label: string;
  count: number;
};

export type Anomaly = {
  id: string;
  description: string;
  date: string;
  status: 'critical' | 'warning';
};

export type RecentRequest = {
  id: string;
  date: string;
  initiator: string;
  avatar: string;
  department: string;
  amount: number;
  status: 'Утверждено' | 'На согласовании' | 'Отклонено';
};
