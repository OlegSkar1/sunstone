'use client';

import { CustomRadio } from '@/components/UI/CustomRadio';
import { useTestStore } from '@/store/testStore';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button, RadioGroup } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ISingleAnswersProps {
  answers: AnswerModel[];
  question_id: number;
  isCompleted: boolean;
}

export const SingleAnswer: FC<ISingleAnswersProps> = ({
  answers,
  question_id,
  isCompleted,
}) => {
  const totalPages = useTestStore((state) => state.totalPages);

  const setCompletedList = useTestStore((state) => state.setCompletedList);
  const testMode = useTestStore((state) => state.testMode);

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

  const { mutate, isPending, data } = useCheckAnswerMutation({});

  const answerHandler: SubmitHandler<{ answer: string }> = (data) => {
    mutate({
      answer: data.answer,
      id: question_id.toString(),
      test_mode: testMode,
    });

    if (testMode === 'exam') setCompletedList(question_id);
  };

  console.log(question_id);
  console.log(totalPages);

  return (
    <form
      onSubmit={handleSubmit(answerHandler)}
      className="flex flex-col items-center gap-10"
    >
      <Controller
        control={control}
        name="answer"
        rules={defaultRules}
        render={({ field }) => {
          return (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              isDisabled={isCompleted}
              isInvalid={!data?.data.ok}
            >
              {answers.map((answer) => (
                <CustomRadio
                  key={answer.id}
                  value={answer.text}
                  color={data?.data.ok ? 'primary' : 'danger'}
                >
                  {answer.text}
                </CustomRadio>
              ))}
            </RadioGroup>
          );
        }}
      />

      <div className={'flex gap-5 mt-auto mb-4'}>
        <Button
          variant="shadow"
          color="success"
          className="text-white"
          type="submit"
          isDisabled={!isValid || isCompleted}
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
