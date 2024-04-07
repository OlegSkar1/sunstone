import Material from '@/pagesComponents/MaterialPage/MaterialPage';

export default function MaterialPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return <Material materials_id={params.id} section_slug={params.slug} />;
}
