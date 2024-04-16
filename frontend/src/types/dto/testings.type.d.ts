declare interface TestingsListDto {
  page?: string;
  size?: string;
  lesson_id?: string;
}

declare interface CheckAnswerDto {
  id: string;
  answer: string | string[];
  test_mode: 'exam' | 'training';
}
