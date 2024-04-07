import { sectionService } from '@/services/section.service';
import React from 'react';

interface IMetadataProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const sections = await sectionService.getSections({ page: '1', size: '10' });
  return sections?.data.results.map((section) => ({
    slug: section.slug,
  }));
}

export default async function SectionPage({
  params: { slug },
}: IMetadataProps) {
  const section = await sectionService.getSection(+slug);
  return <div>SectionPage {slug}</div>;
}
