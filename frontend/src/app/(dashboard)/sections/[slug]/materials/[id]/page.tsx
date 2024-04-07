import Material from '@/pagesComponents/MaterialPage/MaterialPage';

export default function MaterialPage({
  params,
}: {
  params: { section_slug: string; materials_id: string };
}) {
  return (
    <Material
      materials_id={params.materials_id}
      section_slug={params.section_slug}
    />
  );
}
