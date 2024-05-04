'use client';
import React from 'react';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import { MaterialCard } from '../MaterialPage/MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';
import { searchStore } from '@/store/searchStore';
import SearchList from '@/components/SearchList/SearchList';
import { BackButton } from '@/components/UI/BackButton';

export default function Section({ slug }: { slug: string }) {
  const { data: materials } = useMaterialsQuery({
    section_filter: slug,
  });

  const query = searchStore((state) => state.search);

  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex flex-col gap-5 pt-10">
          <BackButton href="./" className="self-start" />
          <div className="grid sm:grid-cols-2 gap-6 pt-10 sm:max-w-[1024px] w-full mx-auto">
            {materials
              ? materials.data.results.map((card) => (
                  <MaterialCard key={card.id} card={card} />
                ))
              : skeletons}
          </div>
        </div>
      )}
    </>
  );
}
