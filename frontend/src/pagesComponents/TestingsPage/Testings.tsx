'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useTestingsQuery } from '@/utils/hooks/tanstack/useTestings';
import React from 'react';
import { TestingsCard } from './TestingsCard/TestingsCard';

export default function Testings({ lesson_id }: { lesson_id: string }) {
  const query = searchStore((state) => state.search);
  const { data: testings } = useTestingsQuery({ lesson_id });
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] mx-auto max-sm:justify-center">
          {testings?.data.results.map((test) => (
            <TestingsCard test={test} key={test.id} />
          ))}
        </div>
      )}
    </>
  );
}
