declare interface TestingsModel {
  count: number;
  next: null | string;
  previous: null | string;
  results: ResultModel[];
}

declare interface ResultModel {
  id: number;
  title: string;
  description: string;
  lesson: number;
}

declare interface AnswerModel {
  id: number;
  text: string;
  question: number;
}

declare interface RelationModel {
  id: number;
  image_display: string | null;
  image_preview: string | null;
  text: string;
}

declare interface QuestionType {
  id: number;
  answers: AnswerModel[];
  relations: RelationModel[];
  type: 'single_choices' | 'multiple_choices' | 'input' | 'relation';
  text: string;
  testing: number;
}

declare interface TestModel {
  id: number;
  title: string;
  description: string;
  lesson: number;
  questions: QuestionType[];
  users_statistics: number[];
}

declare interface CheckAnswerModel {
  ok: boolean;
}
