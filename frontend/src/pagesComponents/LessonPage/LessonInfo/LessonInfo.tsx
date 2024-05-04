'use client';
import { BackButton } from '@/components/UI/BackButton';
import { useTestingsQuery } from '@/utils/hooks/tanstack/useTestings';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ILessonInfoProps {
  lesson: LessonModel | undefined;
}

export const LessonInfo: FC<ILessonInfoProps> = ({ lesson }) => {
  const { data: testings } = useTestingsQuery({
    lesson_id: lesson?.id.toString(),
  });
  return (
    <div className="pt-10 flex flex-col gap-5">
      <BackButton href="./" className="self-start" />
      <h1
        dangerouslySetInnerHTML={{ __html: lesson?.title ?? '' }}
        className="text-3xl font-bold text-center"
      />
      <h2
        dangerouslySetInnerHTML={{ __html: lesson?.title ?? '' }}
        className="text-xl font-semibold text-center"
      />
      {lesson?.preview_display && (
        <Image
          src={lesson.preview_display}
          alt={lesson?.title ?? ''}
          className="max-w-full max-h-[300px] object-cover rounded-lg"
          width={0}
          height={0}
          sizes={'100vw'}
        />
      )}
      <p
        dangerouslySetInnerHTML={{ __html: lesson?.text ?? '' }}
        className="[&_*]:!text-black pb-4"
      />
      <iframe
        width="560"
        height="315"
        src={lesson?.youtube_link}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="same-origin"
        allowFullScreen
        className="self-center mb-4 rounded-xl"
      ></iframe>
      {testings && testings?.data.results.length !== 0 && (
        <h3 className="text-xl font-semibold text-center">
          Пройти тесты по теме можно перейдя по{' '}
          <Link
            href={`${lesson?.id}/testings`}
            className="text-secondary  hover:underline"
          >
            ссылке
          </Link>
        </h3>
      )}
    </div>
  );
};
