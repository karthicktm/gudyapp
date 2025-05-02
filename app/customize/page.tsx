// app/customize/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Use dynamic import to handle client-side only component
const CakeCustomizer = dynamic(() => import('@/components/CakeCustomizer'), {
  ssr: false,
});

export default function CustomizePage() {
  return <CakeCustomizer />;
}