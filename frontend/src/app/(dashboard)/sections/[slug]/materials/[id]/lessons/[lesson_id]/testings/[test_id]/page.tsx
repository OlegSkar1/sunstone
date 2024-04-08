import Test from '@/pagesComponents/TestPage/Test';
import React from 'react';

export default function TestPage({ params }: { params: { test_id: string } }) {
  return <Test id={params.test_id} />;
}
