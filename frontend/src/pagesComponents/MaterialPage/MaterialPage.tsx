'use client';
import { useSlugMaterialsQuery } from '@/utils/hooks/tanstack/useMaterials';
import React from 'react';
import { searchStore } from '@/store/searchStore';
import SearchList from '@/components/SearchList/SearchList';
import { MaterialInfo } from './MaterialInfo/MaterialInfo';
import Link from 'next/link';

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
          <h3 className="text-xl text-center font-semibold">
            Ознакомиться с лекциями по теме можно по{' '}
            <Link
              href={`${materials_id}/lessons`}
              className="text-secondary hover:underline"
            >
              ссылке
            </Link>
          </h3>
        </div>
      )}
    </>
  );
}
