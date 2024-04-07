import Lesson from '@/pagesComponents/LessonPage/Lesson';
import React from 'react';

export default function LessonPage({
  params,
}: {
  params: { lesson_id: string };
}) {
  return <Lesson id={params.lesson_id} />;
}
