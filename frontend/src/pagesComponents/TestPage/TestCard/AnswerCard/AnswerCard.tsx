'use client';
import React, { FC } from 'react';
import { SingleAnswer } from './SingleAnswer';

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
      return <div>AswerCard</div>;
    case 'input':
      return <div>AswerCard</div>;
  }
};
