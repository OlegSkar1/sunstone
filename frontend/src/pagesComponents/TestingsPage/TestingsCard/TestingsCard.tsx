import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ITestingCardProps {
  test: ResultModel;
}

export const TestingsCard: FC<ITestingCardProps> = ({ test }) => {
  if (!test) return null;
  return (
    <Link href={`/tests/${test.id}`}>
      <Card className="hover:scale-[101%] transition-all active:scale-[101%] h-[350px] sm:max-w-[250px] max-sm:w-full">
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
    </Link>
  );
};
