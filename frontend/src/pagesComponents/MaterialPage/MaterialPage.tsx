'use client';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
import { MaterialCard } from './MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';
import { searchStore } from '@/store/searchStore';
import SearchList from '@/components/SearchList/SearchList';

export default function Material() {
  const { data } = useMaterialsQuery();
  const query = searchStore((state) => state.search);
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div>
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
