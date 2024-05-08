declare interface TestingsListDto {
  page?: string;
  size?: string;
  lesson_id?: string;
}

declare interface RelationDto {
  answer_id: number;
  relation_id: number;
}

declare interface CheckAnswerDto {
  id: number;
  answer: string | string[] | RelationDto[];
  test_mode: 'exam' | 'training';
}
