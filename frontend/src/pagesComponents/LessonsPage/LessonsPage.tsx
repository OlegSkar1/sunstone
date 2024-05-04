'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useLessonsQuery } from '@/utils/hooks/tanstack/useLessons';
import React from 'react';
import { LessonCard } from './LessonCard/LessonCard';
import { skeletons } from '@/utils/consts/skeleton.const';

export default function Lessons({ materialId }: { materialId: string }) {
  const query = searchStore((state) => state.search);
  const { data: lessons } = useLessonsQuery({ material_id: +materialId });

  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] w-full mx-auto max-sm:justify-center">
          {lessons
            ? lessons?.data.results.map((card) => {
                return <LessonCard card={card} key={card.id} />;
              })
            : skeletons}
        </div>
      )}
    </>
  );
}
