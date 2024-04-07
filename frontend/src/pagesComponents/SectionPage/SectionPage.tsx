'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import { MaterialCard } from '../MaterialPage/MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';

export default function Section() {
  const lastSegment = usePathname().split('/').at(-1) ?? '';

  const { data: materials } = useMaterialsQuery({
    section_filter: lastSegment,
  });

  return (
    <div className="grid sm:grid-cols-2 gap-6 pt-10 sm:max-w-[1024px] w-full mx-auto">
      {materials
        ? materials.data.results.map((card) => (
            <MaterialCard key={card.id} card={card} />
          ))
        : skeletons}
    </div>
  );
}
