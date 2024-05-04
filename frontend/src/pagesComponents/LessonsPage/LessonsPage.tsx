'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useLessonsQuery } from '@/utils/hooks/tanstack/useLessons';
import React from 'react';
import { LessonCard } from './LessonCard/LessonCard';
import { skeletons } from '@/utils/consts/skeleton.const';
import { BackButton } from '@/components/UI/BackButton';

export default function Lessons({ materialId }: { materialId: string }) {
  const query = searchStore((state) => state.search);
  const { data: lessons } = useLessonsQuery({ material_id: +materialId });

  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex flex-col gap-5 pt-10">
          <BackButton href="./" className="self-start" />
          <div className="flex gap-4 flex-wrap pt-10 sm:max-w-[782px] mx-auto max-sm:justify-center">
            {lessons
              ? lessons?.data.results.map((card) => {
                  return <LessonCard card={card} key={card.id} />;
                })
              : skeletons}
          </div>
        </div>
      )}
    </>
  );
}
