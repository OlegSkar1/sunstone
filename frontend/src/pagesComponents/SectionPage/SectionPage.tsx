'use client';
import React from 'react';
import { SectionCard } from '../SectionsPage/SectionCard/SectionCard';
import { useSectionQuery } from '@/utils/hooks/tanstack/useSection';
import { usePathname } from 'next/navigation';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import { MaterialCard } from '../MaterialPage/MaterialCard/MaterialCard';
import { Skeleton } from '@nextui-org/react';

const skeletons = [...Array(9)].map((_, i) => (
  <Skeleton key={i} className="rounded-lg w-[250px] max-sm:w-full">
    <div className="h-72 bg-default-300" />
  </Skeleton>
));

export default function Section() {
  const lastSegment = usePathname().split('/').at(-1) ?? '';

  const { data: materials } = useMaterialsQuery({
    section_filter: lastSegment,
  });

  return (
    <div className="flex gap-4 flex-wrap pt-10 max-w-[782px] mx-auto">
      {materials
        ? materials.data.results.map((card) => (
            <MaterialCard key={card.id} card={card} />
          ))
        : skeletons}
    </div>
  );
}
