import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ISectionCardProps {
  card: LessonModel | null;
}
export const LessonCard: FC<ISectionCardProps> = ({ card }) => {
  if (!card) return;
  return (
    <Link href={`sections/${card?.id}`}>
      <Card className="hover:scale-[101%] transition-all h-[350px] sm:w-[250px] max-w-[250px] w-full">
        <CardHeader className="flex-col gap-4">
          <h2
            dangerouslySetInnerHTML={{ __html: card?.title ?? '' }}
            className="text-xl text-start font-bold"
          />
          <div
            dangerouslySetInnerHTML={{ __html: card?.material_title ?? '' }}
          />
        </CardHeader>
        <CardBody className="overflow-hidden">
          <Image
            src={card.preview_thumbnail ?? ''}
            alt={card.title}
            sizes={'100vw'}
            width={0}
            height={0}
            className="w-full max-h-[150px] object-fill rounded-lg"
          />
        </CardBody>
      </Card>
    </Link>
  );
};
