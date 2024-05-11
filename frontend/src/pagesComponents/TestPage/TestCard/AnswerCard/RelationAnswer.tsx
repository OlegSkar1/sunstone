'use client';
import { DragAndDropList } from '@/components/UI/DragAndDropList';
import { IValue } from '@/components/UI/DragAndDropList/DragAndDropList';
import { useTestStore } from '@/store/testStore';
import { animateFormError } from '@/utils/consts/animations.const';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IFormData {
  answers: IValue[];
  relations: IValue[];
}

interface IRelationAnwerProps
  extends Pick<QuestionType, 'answers' | 'relations' | 'id'> {
  isCompleted: boolean;
}

export const RelationAnswer: FC<IRelationAnwerProps> = ({
  answers,
  relations,
  isCompleted,
  id,
}) => {
  const testMode = useTestStore((state) => state.testMode);
  const totalPages = useTestStore((state) => state.totalPages);
  const clearTest = useTestStore((state) => state.clear);
  const completedList = useTestStore((state) => state.completedList);
  const setCompletedList = useTestStore((state) => state.setCompletedList);
  const lastQuestionId = useTestStore((state) => state.lastQuestionId);

  const currentQuestion = completedList.find((item) => item.questionId === id);

  const [error, setError] = useState('');

  const { control, handleSubmit, watch } = useForm<IFormData>({
    defaultValues: {
      answers,
      relations,
    },
    values: {
      answers: currentQuestion?.answers as IValue[],
      relations: currentQuestion?.relations as IValue[],
    },
  });

  const watchedAnswers = watch('answers');
  const watchedRelations = watch('relations');

  const { mutate } = useCheckAnswerMutation({
    onSuccess: (data) => {
      setCompletedList({
        answers: watchedAnswers,
        relations: watchedRelations,
        questionId: id,
        ok: data?.data.ok,
      });
    },
  });

  useEffect(() => {
    if (currentQuestion && testMode === 'training') {
      currentQuestion.ok ? setError('') : setError('Неверный ответ');
    }
  }, [currentQuestion, testMode]);

  const submitHandler = (data: IFormData) => {
    const formattedData = data.answers.reduce((acc, item, index) => {
      acc = [
        ...acc,
        { answer_id: item.id, relation_id: data.relations[index].id },
      ];

      return acc;
    }, [] as RelationDto[]);

    mutate({
      answer: formattedData,
      id,
      test_mode: testMode,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col items-center gap-10"
    >
      <div
        className={clsx(
          'grid grid-cols-[minmax(100px,_1fr)_minmax(100px,_1fr)] auto-rows-fr gap-10 w-full',
          { 'opacity-50': isCompleted }
        )}
      >
        <Controller
          control={control}
          name="answers"
          render={({ field }) => (
            <DragAndDropList
              disabled={isCompleted}
              values={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="relations"
          render={({ field }) => (
            <DragAndDropList
              disabled={isCompleted}
              values={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex items-center justify-center h-[20px]">
        <AnimatePresence mode="wait">
          {currentQuestion && currentQuestion.ok ? (
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
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={'flex gap-5 mt-auto mb-4'}>
        <Button
          variant="shadow"
          color="success"
          className="text-white"
          type="submit"
          isDisabled={isCompleted && testMode === 'exam'}
        >
          Подтвердить
        </Button>
        {id === lastQuestionId && (
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
