'use client';

import { CustomRadio } from '@/components/UI/CustomRadio';
import { useTestStore } from '@/store/testStore';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button, RadioGroup } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useRef, useState } from 'react';
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
  const radioRef = useRef<HTMLElement>(null);
  const totalPages = useTestStore((state) => state.totalPages);

  const setCompletedList = useTestStore((state) => state.setCompletedList);
  const testMode = useTestStore((state) => state.testMode);
  const completedList = useTestStore((state) => state.completedList);
  const clearTest = useTestStore((state) => state.clear);

  const currentQuestion = completedList.find(
    (item) => item.questionId === question_id
  );
  const [radioColor, setRadioColor] = useState<
    'primary' | 'success' | 'danger'
  >(currentQuestion?.color || 'primary');

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<{ answer: string }>({
    mode: 'onChange',
    defaultValues: {
      answer: '',
    },
    values: {
      answer: (currentQuestion?.answers as string) || '',
    },
  });

  const { mutate } = useCheckAnswerMutation({
    onSuccess: (data) => {
      if (testMode === 'training') {
        data.data.ok ? setRadioColor('success') : setRadioColor('danger');
      }
      setCompletedList({
        answers: getValues('answer'),
        questionId: question_id,
        color:
          testMode === 'training'
            ? data.data.ok
              ? 'success'
              : 'danger'
            : 'primary',
      });
    },
  });

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
      className="flex flex-col items-center gap-10"
    >
      <Controller
        control={control}
        name="answer"
        rules={defaultRules}
        render={({ field }) => {
          const onChangeHandler = (value: string) => {
            setRadioColor('primary');
            field.onChange(value);
          };
          return (
            <RadioGroup
              value={field.value}
              onValueChange={onChangeHandler}
              isDisabled={isCompleted}
            >
              {answers.map((answer) => (
                <CustomRadio
                  ref={radioRef}
                  isInvalid
                  key={answer.id}
                  value={answer.text}
                  color={radioColor}
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
          isDisabled={!isValid || (isCompleted && testMode === 'exam')}
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
