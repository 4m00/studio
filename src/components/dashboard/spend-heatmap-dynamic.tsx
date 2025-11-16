'use client';

import dynamic from 'next/dynamic';

const SpendHeatmap = dynamic(
  () => import('./spend-heatmap').then(mod => mod.SpendHeatmap),
  { ssr: false }
);

export default SpendHeatmap;