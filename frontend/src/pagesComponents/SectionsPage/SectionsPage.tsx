'use client';
import { useSectionsQuery } from '@/utils/hooks/tanstack/useSections';
import React from 'react';
import { SectionCard } from './SectionCard/SectionCard';
import { skeletons } from '@/utils/consts/skeleton.const';
import { searchStore } from '@/store/searchStore';
import SearchList from '@/components/SearchList/SearchList';
import { BackButton } from '@/components/UI/BackButton';

export default function Sections() {
  const { data: sections } = useSectionsQuery();
  const query = searchStore((state) => state.search);
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex flex-col gap-5 pt-10">
          <BackButton href="./" className="self-start" />
          <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] w-full mx-auto max-sm:justify-center">
            {sections
              ? sections?.data.results.map((card) => {
                  return <SectionCard card={card} key={card.slug} />;
                })
              : skeletons}
          </div>
        </div>
      )}
    </>
  );
}
