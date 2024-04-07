'use client';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
import { MaterialCard } from './MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';

export default function MaterialPage() {
  const { data } = useMaterialsQuery();
  return (
    <div>
      {data
        ? data?.data.results.map((card) => (
            <MaterialCard key={card.id} card={card} />
          ))
        : skeletons}
    </div>
  );
}
