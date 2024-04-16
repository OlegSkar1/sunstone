import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import React, { FC } from 'react';
import { AnswerCard } from './AnswerCard/AnswerCard';
import { useTestStore } from '@/store/testStore';

interface ITestCardProps {
  test?: QuestionType;
}

export const TestCard: FC<ITestCardProps> = ({ test }) => {
  const setTestMode = useTestStore((state) => state.setTestMode);
  const testMode = useTestStore((state) => state.testMode);

  if (!test) return null;

  return (
    <Card className="max-w-[800px] min-h-[300px] w-full">
      <CardHeader>
        <h2 className="text-xl font-bold text-center w-full">{test?.text}</h2>
        <Switch
          isSelected={testMode === 'exam'}
          onValueChange={(value) => setTestMode(value ? 'exam' : 'training')}
        >
          {testMode === 'exam' ? 'Режим экзамена' : 'Режим тренировки'}
        </Switch>
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
