'use client';
import { useTestStore } from '@/store/testStore';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IMultipleAnswersProps {
  answers: AnswerModel[];
  question_id: number;
  isCompleted: boolean;
}

export const MultipleAnswer: FC<IMultipleAnswersProps> = ({
  answers,
  question_id,
  isCompleted,
}) => {
  const totalPages = useTestStore((state) => state.totalPages);
  const setCompletedList = useTestStore((state) => state.setCompletedList);
  const testMode = useTestStore((state) => state.testMode);
  const clearTest = useTestStore((state) => state.clear);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ answer: string[] }>({
    mode: 'onChange',
    defaultValues: {
      answer: [],
    },
  });

  const { mutate, isPending, data } = useCheckAnswerMutation({});

  const answerHandler: SubmitHandler<{ answer: string[] }> = (data) => {
    mutate({
      answer: data.answer,
      id: question_id,
      test_mode: testMode,
    });

    if (testMode === 'exam') setCompletedList(question_id);
  };

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
            <CheckboxGroup
              value={field.value}
              onValueChange={field.onChange}
              isDisabled={isCompleted}
              isInvalid={!data?.data.ok}
            >
              {answers.map((answer) => (
                <Checkbox
                  key={answer.id}
                  value={answer.text}
                  color={data?.data.ok ? 'primary' : 'danger'}
                >
                  {answer.text}
                </Checkbox>
              ))}
            </CheckboxGroup>
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
            <Button
              variant="shadow"
              color="primary"
              className="text-white"
              onClick={clearTest}
            >
              Завершить
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
};
