declare interface MaterialsListDto {
  author_filter?: string;
  page?: number;
  section_filter?: string;
  size?: number;
  update_date_filter?: 'today' | 'yestarday' | 'week' | 'month' | 'year';
}
