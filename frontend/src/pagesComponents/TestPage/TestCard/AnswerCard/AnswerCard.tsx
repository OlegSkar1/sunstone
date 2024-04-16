'use client';
import React, { FC, useMemo } from 'react';
import { SingleAnswer } from './SingleAnswer';
import { MultipleAnswer } from './MultipleAnswer';
import { InputAnswer } from './InputAnswer';
import { useTestStore } from '@/store/testStore';

interface IAswerCardProps {
  type: QuestionType['type'];
  answers: AnswerModel[];
  question_id: number;
}

export const AnswerCard: FC<IAswerCardProps> = ({
  type,
  answers,
  question_id,
}) => {
  const completedList = useTestStore((state) => state.completedList);
  const testMode = useTestStore((state) => state.testMode);

  const isCompleted = useMemo(() => {
    if (testMode === 'exam') return completedList.includes(question_id);
    return false;
  }, [completedList, question_id, testMode]);

  switch (type) {
    case 'single_choices':
      return (
        <SingleAnswer
          answers={answers}
          question_id={question_id}
          isCompleted={isCompleted}
        />
      );
    case 'multiple_choices':
      return (
        <MultipleAnswer
          answers={answers}
          question_id={question_id}
          isCompleted={isCompleted}
        />
      );
    case 'input':
      return (
        <InputAnswer
          answers={answers}
          question_id={question_id}
          isCompleted={isCompleted}
        />
      );
  }
};
