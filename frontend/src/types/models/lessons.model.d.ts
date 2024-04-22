declare interface LessonModel {
  id: number;
  title: string;
  preview_display: string;
  author_email: string;
  author_id: number;
  text: string;
  material_title: string;
  material_id: number;
  youtube_link: string;
}

declare interface LessonListItem {
  id: number;
  title: string;
  preview_thumbnail: string;
  author_id: number;
  author_email: string;
  material_id: number;
  material_title: string;
}

declare interface LessonsListModel {
  count: number;
  next?: string;
  previous?: string;
  results: LessonListItem[];
}
