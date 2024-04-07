import Materials from '@/pagesComponents/MaterialsPage/MaterialsPage';
import React from 'react';

export default function MaterialsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <Materials slug={params.slug} />;
}
