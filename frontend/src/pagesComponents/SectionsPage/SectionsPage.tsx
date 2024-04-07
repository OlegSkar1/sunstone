'use client';
import { useSectionsQuery } from '@/utils/hooks/tanstack/useSections';
import React from 'react';
import { SectionCard } from './SectionCard/SectionCard';
import Link from 'next/link';
import { skeletons } from '@/utils/consts/skeleton.const';

export default function Sections() {
  const { data: sections } = useSectionsQuery();
  return (
    <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] mx-auto max-sm:justify-center">
      {sections
        ? sections?.data.results.map((card) => {
            return <SectionCard card={card} key={card.slug} />;
          })
        : skeletons}
    </div>
  );
}
