declare interface MaterialModel {
  id: number;
  title: string;
  short_description: string;
  image_display: string | null;
  author: number;
  section: number;
  section_slug: string;
  created_at: string;
  updated_at: string;
  text: string;
}

declare interface MaterialsModel {
  count: number;
  next: string;
  previous: string;
  results: Omit<MaterialModel, 'text'>[];
}
