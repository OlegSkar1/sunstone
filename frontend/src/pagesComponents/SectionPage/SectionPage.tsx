'use client';
import React from 'react';
import { SectionCard } from '../SectionsPage/SectionCard/SectionCard';
import { useSectionQuery } from '@/utils/hooks/tanstack/useSection';
import { usePathname } from 'next/navigation';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';

export default function Section() {
  const lastSegment = usePathname().split('/').at(-1) ?? '';

  const { data: materials } = useMaterialsQuery({
    section_filter: lastSegment,
  });
  console.log(lastSegment);
  return <div>test</div>;
}
