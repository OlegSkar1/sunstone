declare interface SectionModel {
  slug: string;
  name: string;
  description: string;
  image_display: string;
  image_preview: string;
}

declare interface SectionListModel {
  count: number;
  next: string;
  previous: string;
  results: SectionModel[];
}
