'use client';
import { useSlugMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
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
  const { data: material } = useSlugMaterialsQuery(materials_id);
  const query = searchStore((state) => state.search);
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div>
          <MaterialInfo
            material={material?.data}
            section_slug={section_slug}
            materials_id={materials_id}
          />
        </div>
      )}
    </>
  );
}
