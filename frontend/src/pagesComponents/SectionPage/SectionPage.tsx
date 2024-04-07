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
    <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] mx-auto max-sm:justify-center">
      {materials
        ? materials.data.results.map((card) => (
            <MaterialCard key={card.id} card={card} />
          ))
        : skeletons}
    </div>
  );
}
