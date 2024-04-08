'use client';
import { usePaginationTestStore } from '@/store/paginationTestStore';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IInputAnswersProps {
  question_id: number;
  answers: AnswerModel[];
}

export const InputAnswer: FC<IInputAnswersProps> = ({
  question_id,
  answers,
}) => {
  const [result, setResult] = useState(true);
  const totalPages = usePaginationTestStore((state) => state.totalPages);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ answer: string }>({
    mode: 'onChange',
    defaultValues: {
      answer: '',
    },
  });

  const { mutate, isPending } = useCheckAnswerMutation({
    onSuccess: (data) => {
      setResult(data.data.ok);
    },
  });

  const answerHandler: SubmitHandler<{ answer: string }> = (data) => {
    mutate({ answer: data.answer, id: question_id.toString() });
  };

  return (
    <form
      onSubmit={handleSubmit(answerHandler)}
      className="flex flex-col items-center gap-10 flex-1"
    >
      <Controller
        control={control}
        name="answer"
        rules={defaultRules}
        render={({ field }) => {
          return (
            <Input
              value={field.value}
              onChange={field.onChange}
              placeholder="Ваш ответ"
              color={result ? 'primary' : 'danger'}
              errorMessage={!result && 'Неправильно'}
              variant="bordered"
            />
          );
        }}
      />

      <div className={'flex gap-5 mt-auto mb-4'}>
        <Button
          variant="shadow"
          color="success"
          className="text-white"
          type="submit"
          isDisabled={!isValid}
          isLoading={isPending}
        >
          Подтвердить
        </Button>
        {question_id === totalPages && (
          <Link href="../testings">
            <Button variant="shadow" color="primary" className="text-white">
              Завершить
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
};
