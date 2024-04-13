'use client';
import { usePaginationTestStore } from '@/store/paginationTestStore';
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
}

export const MultipleAnswer: FC<IMultipleAnswersProps> = ({
  answers,
  question_id,
}) => {
  const [result, setResult] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const totalPages = usePaginationTestStore((state) => state.totalPages);

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

  const { mutate, isPending } = useCheckAnswerMutation({
    onSuccess: (data) => {
      setResult(data.data.ok);
      setIsChecked(true);
    },
  });

  const answerHandler: SubmitHandler<{ answer: string[] }> = (data) => {
    mutate({ answer: data.answer, id: question_id.toString() });
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
              isDisabled={isChecked}
            >
              {answers.map((answer) => (
                <Checkbox
                  key={answer.id}
                  value={answer.text}
                  color={result ? 'primary' : 'danger'}
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