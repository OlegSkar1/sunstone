import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

interface IMaterialCardProps {
  card: MaterialModel | null;
}
export const MaterialCard: FC<IMaterialCardProps> = ({ card }) => {
  const pathname = usePathname();
  const section = pathname.split('/').at(-1) ?? '';
  const createTime = dayjs(card?.created_at).format('DD.MM.YYYY');
  const separateTitle =
    card?.title.substring(0, 50).length === card?.title.length
      ? card?.title
      : card?.title.substring(0, 50) + '...';

  if (!card) return;

  return (
    <Card className="hover:scale-[101%] transition-all h-[350px] max-w-[250px] relative">
      <CardHeader className="flex-col gap-4">
        <div className="flex justify-between">
          <h2
            dangerouslySetInnerHTML={{ __html: separateTitle ?? '' }}
            className="text-xl text-start font-bold"
          />
          <time
            dangerouslySetInnerHTML={{ __html: createTime ?? '' }}
            className="text-small text-foreground whitespace-nowrap"
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden">
        <Image
          src={''}
          alt={card.title}
          sizes={'100vw'}
          width={0}
          height={0}
          className="w-full max-h-[150px] object-fill rounded-lg"
        />
      </CardBody>
      <CardFooter>
        <p className="font-semibold">{section}</p>
      </CardFooter>
    </Card>
  );
};
