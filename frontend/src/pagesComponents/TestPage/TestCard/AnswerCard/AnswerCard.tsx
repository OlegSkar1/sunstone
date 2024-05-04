'use client';
import React, { FC, useMemo } from 'react';
import { SingleAnswer } from './SingleAnswer';
import { MultipleAnswer } from './MultipleAnswer';
import { InputAnswer } from './InputAnswer';
import { useTestStore } from '@/store/testStore';
import { RelationAnswer } from './RelationAnswer';

interface IAswerCardProps extends Omit<QuestionType, 'text' | 'testing'> {}

export const AnswerCard: FC<IAswerCardProps> = ({
  type,
  answers,
  id,
  relations,
}) => {
  const completedList = useTestStore((state) => state.completedList);

  const testMode = useTestStore((state) => state.testMode);

  const isCompleted = useMemo(() => {
    if (testMode === 'exam')
      return !!completedList.find((item) => item.questionId === id);
    return false;
  }, [completedList, id, testMode]);

  switch (type) {
    case 'single_choices':
      return (
        <SingleAnswer
          answers={answers}
          question_id={id}
          isCompleted={isCompleted}
        />
      );
    case 'multiple_choices':
      return (
        <MultipleAnswer
          answers={answers}
          question_id={id}
          isCompleted={isCompleted}
        />
      );
    case 'input':
      return <InputAnswer question_id={id} isCompleted={isCompleted} />;
    case 'relation':
      return (
        <RelationAnswer
          answers={answers}
          relations={relations}
          id={id}
          isCompleted={isCompleted}
        />
      );
  }
};
