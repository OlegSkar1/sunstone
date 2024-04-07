import Section from '@/pagesComponents/SectionPage/SectionPage';
import React from 'react';

export default function SectionPage({ params }: { params: { slug: string } }) {
  return <Section slug={params.slug} />;
}
