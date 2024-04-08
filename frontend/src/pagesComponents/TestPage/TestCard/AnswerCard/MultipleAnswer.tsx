'use client';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
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
    console.log(data);
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

      <Button
        variant="shadow"
        color="success"
        className="text-white"
        type="submit"
        isDisabled={!isValid || isChecked}
        isLoading={isPending}
      >
        Подтвердить
      </Button>
    </form>
  );
};
