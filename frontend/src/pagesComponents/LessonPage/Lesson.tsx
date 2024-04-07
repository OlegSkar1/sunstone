'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useSlugLessonsQuery } from '@/utils/hooks/tanstack/useLessons';
import React from 'react';
import { LessonInfo } from './LessonInfo/LessonInfo';

export default function Lesson({ id }: { id: string }) {
  const query = searchStore((state) => state.search);
  const { data: lesson } = useSlugLessonsQuery(id);
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div>
          <LessonInfo lesson={lesson?.data} />
        </div>
      )}
    </>
  );
}
