declare interface LessonModel {
  id: number;
  title: string;
  preview_thumbnail: string;
  author_id: number;
  author_email: string;
  material_id: number;
  material_title: string;
  text: string;
}

declare interface LessonsListModel {
  count: number;
  next?: string;
  previous?: string;
  results: Omit<LessonModel, 'text'>[];
}
