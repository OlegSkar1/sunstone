'use client';
import { useMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
import { MaterialCard } from './MaterialCard/MaterialCard';
import { skeletons } from '@/utils/consts/skeleton.const';
import { searchStore } from '@/store/searchStore';
import SearchList from '@/components/SearchList/SearchList';
import { MaterialInfo } from './MaterialInfo/MaterialInfo';

interface IMaterialProps {
  section_slug: string;
  materials_id: string;
}

export default function Material({
  section_slug,
  materials_id,
}: IMaterialProps) {
  const { data } = useMaterialsQuery();
  const query = searchStore((state) => state.search);
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div>
          <MaterialInfo />
        </div>
      )}
    </>
  );
}
