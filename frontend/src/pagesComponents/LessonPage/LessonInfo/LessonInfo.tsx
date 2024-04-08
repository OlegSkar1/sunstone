import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ILessonInfoProps {
  lesson: LessonModel | undefined;
}

export const LessonInfo: FC<ILessonInfoProps> = ({ lesson }) => {
  return (
    <div className="pt-10 flex flex-col gap-5">
      <h1
        dangerouslySetInnerHTML={{ __html: lesson?.title ?? '' }}
        className="text-3xl font-bold text-center"
      />
      <h2
        dangerouslySetInnerHTML={{ __html: lesson?.material_title ?? '' }}
        className="text-xl font-semibold text-center"
      />
      {lesson?.preview_thumbnail && (
        <Image
          src={lesson.preview_thumbnail}
          alt={lesson?.title ?? ''}
          className="max-w-full max-h-[300px] object-cover rounded-lg"
          width={0}
          height={0}
          sizes={'100vw'}
        />
      )}
      <p
        dangerouslySetInnerHTML={{ __html: lesson?.text ?? '' }}
        className="[&_*]:!text-black"
      />
      <h3 className="text-xl font-semibold text-center">
        Пройти тесты по теме можно перейдя по{' '}
        <Link
          href={`${lesson?.id}/testings`}
          className="text-secondary  hover:underline"
          target="_blank"
        >
          ссылке
        </Link>
      </h3>
    </div>
  );
};
