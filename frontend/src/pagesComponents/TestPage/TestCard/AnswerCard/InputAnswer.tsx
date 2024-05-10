'use client';
import { useTestStore } from '@/store/testStore';
import { animateFormError } from '@/utils/consts/animations.const';
import { defaultRules } from '@/utils/consts/validation.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

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

  const [textAreaColor, setTextAreaColor] = useState<
    'primary' | 'success' | 'danger'
  >('primary');

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
        if (data.data.ok) {
          setTextAreaColor('success');
        } else {
          setTextAreaColor('danger');
        }
      }

      setCompletedList({
        answers: getValues('answer'),
        questionId: question_id,
        ok: data.data.ok,
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
      className="flex flex-col items-center gap-10 flex-1 mt-10"
    >
      <Controller
        control={control}
        name="answer"
        rules={defaultRules}
        render={({ field }) => {
          const onChangeHandler = (value: string) => {
            setTextAreaColor('primary');
            field.onChange(value);
          };
          return (
            <Input
              isDisabled={isCompleted}
              value={field.value}
              onValueChange={onChangeHandler}
              placeholder="Ваш ответ"
              color={textAreaColor}
              variant="faded"
              className="max-w-[300px]"
              classNames={{
                inputWrapper: `${
                  testMode === 'training'
                    ? currentQuestion && currentQuestion.ok
                      ? 'border-success'
                      : 'border-danger'
                    : 'border-default'
                }`,
              }}
            />
          );
        }}
      />
      <div className="flex items-center justify-center h-[20px]">
        <AnimatePresence mode="wait">
          {testMode === 'training' &&
            (currentQuestion && currentQuestion.ok ? (
              <motion.p
                variants={animateFormError}
                initial="hide"
                animate="show"
                exit={'hide'}
                transition={{ duration: 0.15 }}
                className="text-success"
              >
                Верно
              </motion.p>
            ) : (
              <motion.div
                variants={animateFormError}
                initial="hide"
                animate="show"
                exit={'hide'}
                transition={{ duration: 0.15 }}
                className="text-danger"
              >
                Неверно
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

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
