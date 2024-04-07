declare interface MaterialModel {
  id: number;
  title: string;
  author: number;
  section: number;
  created_at: string;
  updated_at: string;
  text: string;
}

declare interface MaterialsModel {
  count: number;
  next: string;
  previous: string;
  results: MaterialModel[];
}
