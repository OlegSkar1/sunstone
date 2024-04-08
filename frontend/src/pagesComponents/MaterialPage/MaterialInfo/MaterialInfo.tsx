import dayjs from 'dayjs';
import Image from 'next/image';
import React, { FC } from 'react';

interface IMaterialInfoProps {
  section_slug: string;
  materials_id: string;
  material: MaterialModel | undefined;
}

export const MaterialInfo: FC<IMaterialInfoProps> = ({
  section_slug,
  materials_id,
  material,
}) => {
  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex gap-5 justify-around items-center">
        <h1
          dangerouslySetInnerHTML={{ __html: material?.title ?? '' }}
          className="text-3xl font-bold text-center"
        />
        <span className="justify-self-end text-small font-semibold">
          {dayjs(material?.created_at).format('DD.MM.YYYY')}
        </span>
      </div>
      <Image
        src={material?.image_display ?? ''}
        alt={material?.title ?? ''}
        sizes={'100vw'}
        width={0}
        height={0}
        className="w-full max-h-[300px] object-cover rounded-lg"
      />
      <div
        dangerouslySetInnerHTML={{ __html: material?.text ?? '' }}
        className="!text-base  [&_span]:!text-black"
      />
    </div>
  );
};
