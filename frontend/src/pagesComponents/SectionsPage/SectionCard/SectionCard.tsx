import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import React, { FC } from 'react';

interface ISectionCardProps {
  card: SectionModel | null;
}
export const SectionCard: FC<ISectionCardProps> = ({ card }) => {
  return (
    <Card className="hover:scale-[101%] transition-all h-[350px] max-w-[250px]">
      <CardHeader className="flex-col gap-4">
        <h2
          dangerouslySetInnerHTML={{ __html: card?.name ?? '' }}
          className="text-xl text-start font-bold"
        />
        <div dangerouslySetInnerHTML={{ __html: card?.description ?? '' }} />
      </CardHeader>
      <CardBody className="overflow-hidden">
        {!card ? (
          <Skeleton className="rounded-lg">
            <div className="h-64 bg-default-300" />
          </Skeleton>
        ) : (
          <Image
            src={card.image_display}
            alt={card.name}
            sizes={'100vw'}
            width={0}
            height={0}
            className="w-full max-h-[150px] object-fill rounded-lg"
          />
        )}
      </CardBody>
    </Card>
  );
};
