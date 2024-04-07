'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
import { MaterialCard } from '../MaterialPage/MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';

export default function Materials({ slug }: { slug?: string }) {
  const query = searchStore((state) => state.search);
  const { data } = useMaterialsQuery({ section_filter: slug });

  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 pt-10 sm:max-w-[1024px] w-full mx-auto">
          {data
            ? data?.data.results.map((card) => (
                <MaterialCard key={card.id} card={card} />
              ))
            : skeletons}
        </div>
      )}
    </>
  );
}
