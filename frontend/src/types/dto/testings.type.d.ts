declare interface TestingsListDto {
  page?: string;
  size?: string;
  lesson_id?: string;
}

declare interface CheckAnswerDto {
  id: number;
  answer: string | string[];
  test_mode: 'exam' | 'training';
}
