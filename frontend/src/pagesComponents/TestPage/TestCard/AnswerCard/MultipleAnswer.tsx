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
  const completedList = useTestStore((state) => state.completedList);

  const currentQuestion = completedList.find(
    (item) => item.questionId === question_id
  );

  const [checkboxColor, setCheckboxColor] = useState<
    'primary' | 'success' | 'danger'
  >(currentQuestion?.color || 'primary');

  const {
    control,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<{ answer: string[] }>({
    mode: 'onChange',
    defaultValues: {
      answer: [],
    },
    values: {
      answer: (currentQuestion?.answers as string[]) || [],
    },
  });

  const { mutate } = useCheckAnswerMutation({
    onSuccess: (data) => {
      data.data.ok ? setCheckboxColor('success') : setCheckboxColor('danger');
      setCompletedList({
        answers: getValues('answer'),
        questionId: question_id,
        color: data.data.ok ? 'success' : 'danger',
      });
    },
  });

  const answerHandler: SubmitHandler<{ answer: string[] }> = (data) => {
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
          const onChangeHandler = (value: string[]) => {
            setCheckboxColor('primary');
            field.onChange(value);
          };
          return (
            <CheckboxGroup
              value={field.value}
              onValueChange={onChangeHandler}
              isDisabled={isCompleted}
            >
              {answers.map((answer) => {
                return (
                  <Checkbox
                    key={answer.id}
                    value={answer.text}
                    color={checkboxColor}
                  >
                    {answer.text}
                  </Checkbox>
                );
              })}
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
