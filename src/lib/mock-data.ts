import type { Kpi, MonthlyCost, CostStructure, BudgetDeviation, RequestStatus, Anomaly, RecentRequest } from '@/lib/types';

export const kpiData: Kpi[] = [
  {
    title: 'Операционные затраты',
    value: '2.4 млрд ₽',
    change: -5.2,
    changeType: 'decrease',
    status: 'destructive',
  },
  {
    title: 'Заявок на согласовании',
    value: '127 шт',
    change: 23,
    changeType: 'increase',
    status: 'warning',
  },
  {
    title: 'Превышение бюджета',
    value: '8 подразделений',
    change: 0,
    changeType: 'increase',
    status: 'destructive',
  },
  {
    title: 'Экономия от инициатив',
    value: '142 млн ₽ YTD',
    change: 15,
    changeType: 'increase',
    status: 'success',
  },
];

export const costDynamicsData: MonthlyCost[] = [
  { month: 'Янв', fact: 2.1, plan: 2.2 },
  { month: 'Фев', fact: 2.0, plan: 2.1 },
  { month: 'Мар', fact: 2.3, plan: 2.3 },
  { month: 'Апр', fact: 2.2, plan: 2.4 },
  { month: 'Май', fact: 2.4, plan: 2.5 },
  { month: 'Июн', fact: 2.5, plan: 2.5 },
  { month: 'Июл', fact: 2.6, plan: 2.6 },
  { month: 'Авг', fact: 2.5, plan: 2.7 },
  { month: 'Сен', fact: 2.7, plan: 2.8 },
  { month: 'Окт', fact: 2.6, plan: 2.7 },
  { month: 'Ноя', fact: 2.4, plan: 2.6 },
  { month: 'Дек', fact: 0, plan: 2.9 },
];

export const costStructureData: CostStructure[] = [
  { name: 'Сырье', value: 35 },
  { name: 'Персонал', value: 28 },
  { name: 'Энергия', value: 18 },
  { name: 'Ремонты', value: 12 },
  { name: 'Прочее', value: 7 },
];

export const budgetDeviationsData: BudgetDeviation[] = [
  { department: 'Перерабатывающий завод №1', plan: 500, fact: 580, deviation: 16 },
  { department: 'Служба логистики', plan: 120, fact: 135, deviation: 12.5 },
  { department: 'Добывающее предприятие №2', plan: 800, fact: 880, deviation: 10 },
  { department: 'ИТ-департамент', plan: 80, fact: 75, deviation: -6.25 },
  { department: 'Центральный офис', plan: 200, fact: 180, deviation: -10 },
];

export const requestStatusData: RequestStatus[] = [
  { label: 'Создано', count: 234 },
  { label: 'На согласовании', count: 127 },
  { label: 'Утверждено', count: 198 },
  { label: 'Отклонено', count: 15 },
];

export const anomaliesData: Anomaly[] = [
  { id: 'ANOM-001', description: 'Резкий рост затрат на ГСМ в ДП №1', date: '15.11.2025', status: 'critical' },
  { id: 'ANOM-002', description: 'Нетипичный поставщик услуг для ЦО', date: '14.11.2025', status: 'warning' },
  { id: 'ANOM-003', description: 'Закупка канцтоваров на 250% выше средней', date: '14.11.2025', status: 'warning' },
  { id: 'ANOM-004', description: 'Авансовый платеж без договора (ПЗ №2)', date: '13.11.2025', status: 'critical' },
  { id: 'ANOM-005', description: 'Завышенная цена на запчасти в заявке REQ-0873', date: '12.11.2025', status: 'warning' },
  { id: 'ANOM-006', description: 'Повторный счет-фактура от ООО "ТехСервис"', date: '11.11.2025', status: 'critical' },
];

export const recentRequestsData: RecentRequest[] = [
  { id: 'REQ-2025-0812', date: '16.11.2025', initiator: 'Петров В.С.', avatar: '1', department: 'ДП №1 / Рудник №3', amount: 2450000, status: 'На согласовании' },
  { id: 'REQ-2025-0811', date: '16.11.2025', initiator: 'Сидорова А.И.', avatar: '2', department: 'Центральный офис', amount: 320000, status: 'Утверждено' },
  { id: 'REQ-2025-0810', date: '15.11.2025', initiator: 'Козлов Д.Н.', avatar: '3', department: 'Перерабатывающий завод №2', amount: 870000, status: 'Утверждено' },
  { id: 'REQ-2025-0809', date: '15.11.2025', initiator: 'Иванова Е.П.', avatar: '4', department: 'ДП №2 / Цех обогащения', amount: 1200000, status: 'Отклонено' },
  { id: 'REQ-2025-0808', date: '14.11.2025', initiator: 'Смирнов О.В.', avatar: '5', department: 'Служба логистики', amount: 540000, status: 'На согласовании' },
  { id: 'REQ-2025-0807', date: '14.11.2025', initiator: 'Васильев Г.Р.', avatar: '6', department: 'ДП №1 / Рудник №2', amount: 980000, status: 'Утверждено' },
  { id: 'REQ-2025-0806', date: '13.11.2025', initiator: 'Михайлов М.М.', avatar: '7', department: 'Служба безопасности', amount: 210000, status: 'На согласовании' },
  { id: 'REQ-2025-0805', date: '13.11.2025', initiator: 'Федорова Л.К.', avatar: '8', department: 'Перерабатывающий завод №1', amount: 3100000, status: 'Утверждено' },
];
