'use client';
import { TestInfo } from '@/pagesComponents/TestPage/TestInfo/TestInfo';
import { useModalStore } from '@/store/modalStore';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React, { FC } from 'react';

interface ITestingCardProps {
  test: ResultModel;
}

export const TestingsCard: FC<ITestingCardProps> = ({ test }) => {
  const showModal = useModalStore((state) => state.showModal);
  const hideModal = useModalStore((state) => state.hideModal);

  const cardHandler = () => {
    console.log('test');
    showModal(<TestInfo id={test.id} clickHandler={hideModal} />, test.title);
  };

  if (!test) return null;
  return (
    <Card
      disableRipple
      isPressable
      onPress={cardHandler}
      className="hover:scale-[101%] transition-all active:scale-[101%] h-[350px] sm:max-w-[250px] max-sm:w-full"
    >
      <CardHeader className="flex-col gap-4">
        <h2
          dangerouslySetInnerHTML={{ __html: test.title ?? '' }}
          className="text-xl text-start font-bold"
        />
        <div dangerouslySetInnerHTML={{ __html: test.description ?? '' }} />
      </CardHeader>
      <CardBody className="overflow-hidden">
        <p>{test.lesson}</p>
      </CardBody>
    </Card>
  );
};
