import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import React, { FC } from 'react';
import { AnswerCard } from './AnswerCard/AnswerCard';

interface ITestCardProps {
  test?: QuestionType;
}

export const TestCard: FC<ITestCardProps> = ({ test }) => {
  if (!test) return null;

  return (
    <Card className="max-w-[800px] min-h-[300px] w-full">
      <CardHeader>
        <h2 className="text-xl font-bold text-center w-full">{test?.text}</h2>
      </CardHeader>
      <CardBody>
        <AnswerCard
          answers={test.answers}
          type={test.type}
          question_id={test.id}
        />
      </CardBody>
    </Card>
  );
};
