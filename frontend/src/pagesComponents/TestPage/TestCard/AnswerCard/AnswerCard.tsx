'use client';
import React, { FC } from 'react';
import { SingleAnswer } from './SingleAnswer';
import { MultipleAnswer } from './MultipleAnswer';
import { InputAnswer } from './InputAnswer';

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
  switch (type) {
    case 'single_choices':
      return <SingleAnswer answers={answers} question_id={question_id} />;
    case 'multiple_choices':
      return <MultipleAnswer answers={answers} question_id={question_id} />;
    case 'input':
      return <InputAnswer answers={answers} question_id={question_id} />;
  }
};
