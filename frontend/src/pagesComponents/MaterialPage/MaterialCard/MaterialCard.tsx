import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface IMaterialCardProps {
  card: Omit<MaterialModel, 'text'> | null;
}
export const MaterialCard: FC<IMaterialCardProps> = ({ card }) => {
  const createTime = dayjs(card?.created_at).format('DD.MM.YYYY');
  const separateTitle =
    card?.title.substring(0, 50).length === card?.title.length
      ? card?.title
      : card?.title.substring(0, 50) + '...';

  if (!card) return;

  return (
    <Link
      href={`/sections/${card.section_slug}/materials/${card.id}`}
      className="hover:scale-[101%] transition-all active:scale-[101%] h-[350px] sm:max-w-[500px] flex w-full"
    >
      <Card className="w-full">
        <CardHeader className="flex-col gap-4 overflow-hidden">
          <div className="flex justify-between gap-2 max-sm:items-center w-full">
            <h2
              dangerouslySetInnerHTML={{ __html: separateTitle ?? '' }}
              className="text-xl text-start font-bold"
            />
            <time
              dangerouslySetInnerHTML={{ __html: createTime ?? '' }}
              className="text-small text-foreground whitespace-nowrap"
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: card?.short_description ?? '' }}
          />
        </CardHeader>
        <CardBody className="overflow-hidden">
          {card.image_display && (
            <div className="relative h-full">
              <Image
                src={card.image_display}
                alt={card.title}
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                fill
                className="rounded-lg"
              />
            </div>
          )}
        </CardBody>
        <CardFooter>
          <p className="font-semibold">{card.section_slug}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
