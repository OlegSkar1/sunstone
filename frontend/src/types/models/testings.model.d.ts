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

declare interface QuestionType {
  id: number;
  answers: AnswerModel[];
  type: 'single_choices' | 'multiple_choices' | 'input';
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
