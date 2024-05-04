import Lessons from '@/pagesComponents/LessonsPage/LessonsPage';
import React from 'react';

export default function LessonsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Lessons materialId={id} />;
}
