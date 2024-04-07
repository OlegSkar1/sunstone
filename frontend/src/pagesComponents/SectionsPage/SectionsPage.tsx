'use client';
import { useSectionsQuery } from '@/utils/hooks/tanstack/useSections';
import React from 'react';
import { SectionCard } from './SectionCard/SectionCard';
import Link from 'next/link';

export default function Sections() {
  const { data: sections } = useSectionsQuery();
  return (
    <div className="flex flex-wrap gap-6 pt-10">
      {sections?.data.results.map((card) => (
        <Link href={`/sections/${card.slug}`} key={card.slug}>
          <SectionCard card={card} />
        </Link>
      ))}
    </div>
  );
}
