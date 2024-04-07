import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ISectionCardProps {
  card: SectionModel;
}
export const SectionCard: FC<ISectionCardProps> = ({ card }) => {
  if (!card) return;
  return (
    <Link href={`sections/${card.slug}`}>
      <Card className="hover:scale-[101%] transition-all active:scale-[101%] h-[350px] sm:max-w-[250px] max-sm:w-full">
        <CardHeader className="flex-col gap-4">
          <h2
            dangerouslySetInnerHTML={{ __html: card.name ?? '' }}
            className="text-xl text-start font-bold"
          />
          <div dangerouslySetInnerHTML={{ __html: card.description ?? '' }} />
        </CardHeader>
        <CardBody className="overflow-hidden">
          <Image
            src={card.image_display ?? ''}
            alt={card.name}
            sizes={'100vw'}
            width={0}
            height={0}
            className="w-full max-h-[150px] object-cover rounded-lg"
          />
        </CardBody>
      </Card>
    </Link>
  );
};
