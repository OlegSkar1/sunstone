import Testings from '@/pagesComponents/TestingsPage/Testings';
import React from 'react';

export default function TestingsPage({
  params,
}: {
  params: { lesson_id: string };
}) {
  return <Testings lesson_id={params.lesson_id} />;
}
