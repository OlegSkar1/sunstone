'use client';
import { DragAndDropList } from '@/components/UI/DragAndDropList';
import { IValue } from '@/components/UI/DragAndDropList/DragAndDropList';
import { useTestStore } from '@/store/testStore';
import { useCheckAnswerMutation } from '@/utils/hooks/tanstack/useTestings';
import { Button } from '@nextui-org/react';
import { current } from 'immer';
import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';
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

  const currentQuestion = completedList.find((item) => item.questionId === id);

  console.log(currentQuestion);

  const [checkboxColor, setCheckboxColor] = useState<
    'primary' | 'success' | 'danger'
  >(currentQuestion?.color || 'primary');

  const { control, handleSubmit, getValues, watch } = useForm<IFormData>({
    defaultValues: {
      answers,
      relations,
    },
  });

  const watchedAnswers = watch('answers');
  const watchedRelations = watch('relations');

  const answersIds = useMemo(
    () => watchedAnswers.map((item) => item.id).filter((item) => item),
    [watchedAnswers]
  );

  const relationsIds = useMemo(
    () => watchedRelations.map((item) => item.id).filter((item) => item),
    [watchedRelations]
  );

  const { mutate } = useCheckAnswerMutation({
    onSuccess: (data) => {
      data.data.ok ? setCheckboxColor('success') : setCheckboxColor('danger');
      setCompletedList({
        answers: answersIds,
        relations: relationsIds,
        questionId: id,
        color: data.data.ok ? 'success' : 'danger',
      });
    },
  });

  const submitHandler = (data: IFormData) => {
    const formattedData = data.answers.reduce((acc, item, index) => {
      acc[index] = {
        [item.id]: data.relations[index]['id'],
      };

      return acc;
    }, [] as { [key: number]: number }[]);

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
      <div className="grid grid-cols-[minmax(100px,_1fr)_minmax(100px,_1fr)] auto-rows-fr gap-10 w-full">
        <Controller
          control={control}
          name="answers"
          render={({ field }) => (
            <DragAndDropList values={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={control}
          name="relations"
          render={({ field }) => (
            <DragAndDropList values={field.value} onChange={field.onChange} />
          )}
        />
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
        {id === totalPages && (
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
