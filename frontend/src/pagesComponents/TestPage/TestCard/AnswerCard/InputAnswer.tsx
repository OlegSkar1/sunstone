'use client';
import { useTestStore } from '@/store/testStore';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IInputAnswersProps {
  question_id: number;
  isCompleted: boolean;
}

export const InputAnswer: FC<IInputAnswersProps> = ({
  question_id,
  isCompleted,
}) => {
  const totalPages = useTestStore((state) => state.totalPages);
  const setCompletedList = useTestStore((state) => state.setCompletedList);
  const testMode = useTestStore((state) => state.testMode);
  const clearTest = useTestStore((state) => state.clear);
  const completedList = useTestStore((state) => state.completedList);

  const currentQuestion = completedList.find(
    (item) => item.questionId === question_id
  );

  const [textAreaColor, setSetTextAreaColor] = useState<
    'primary' | 'success' | 'danger'
  >('primary');

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<{ answer: string }>({
    mode: 'onChange',
    defaultValues: {
      answer: '',
    },
    values: {
      answer: (currentQuestion?.answers as string) || '',
    },
  });

  const { mutate, data } = useCheckAnswerMutation({
    onSuccess: (data) => {
      if (data.data.ok) {
        setSetTextAreaColor('success');
        clearErrors('answer');
      } else {
        setSetTextAreaColor('danger');
      }

      setCompletedList({
        answers: getValues('answer'),
        questionId: question_id,
        color: data.data.ok ? 'success' : 'danger',
      });
    },
  });

  useEffect(() => {
    if (data && !data?.data.ok) {
      setError('answer', { message: 'Неверно', type: 'custom' });
    }
  }, [data?.data.ok]);

  const answerHandler: SubmitHandler<{ answer: string }> = (data) => {
    mutate({
      answer: data.answer,
      id: question_id,
      test_mode: testMode,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(answerHandler)}
      className="flex flex-col items-center gap-10 flex-1 mt-10"
    >
      <Controller
        control={control}
        name="answer"
        rules={defaultRules}
        render={({ field }) => {
          const onChangeHandler = (value: string) => {
            setSetTextAreaColor('primary');
            field.onChange(value);
          };
          return (
            <Input
              isInvalid={data && !data?.data.ok}
              disabled={isCompleted}
              value={field.value}
              onValueChange={onChangeHandler}
              placeholder="Ваш ответ"
              color={textAreaColor}
              classNames={{ input: `text-${textAreaColor}` }}
              errorMessage={errors.answer?.message}
              variant="faded"
              className="max-w-[300px]"
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
          isDisabled={!isValid || (isCompleted && testMode === 'exam')}
        >
          Подтвердить
        </Button>
        {question_id === totalPages && (
          <Link href="../testings" onClick={clearTest}>
            <Button variant="shadow" color="primary" className="text-white">
              Завершить
            </Button>
          </Link>
        )}
      </div>
    </form>
  );
};
