'use client';
import { useTestStore } from '@/store/testStore';
import { useSlugTestingsQuery } from '@/utils/hooks/tanstack/useTestings';
import { Button, Switch } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const TestInfo = ({
  id,
  clickHandler,
}: {
  id: number;
  clickHandler: () => void;
}) => {
  const router = useRouter();
  const setTestMode = useTestStore((state) => state.setTestMode);
  const testMode = useTestStore((state) => state.testMode);
  const { data: testings } = useSlugTestingsQuery(id.toString());

  const startSubmitHandler = () => {
    router.push(`testings/${id}`);
    clickHandler();
  };

  return (
    <div className="flex flex-col items-center gap-20">
      <p className="text-xl font-semibold text-center">
        {testings?.data.description}
      </p>
      <Switch
        className=""
        isSelected={testMode === 'exam'}
        onValueChange={(value) => setTestMode(value ? 'exam' : 'training')}
      >
        {testMode === 'exam' ? 'Режим экзамена' : 'Режим тренировки'}
      </Switch>

      <p>
        {testMode === 'exam'
          ? 'Одна попытка, результат будет сохранен'
          : 'Кол-во попыток неограничено, реультат не будет сохранен'}
      </p>

      <Button
        variant="solid"
        color="primary"
        className="text-white w-fit shrink-0"
        onClick={startSubmitHandler}
      >
        Начать
      </Button>
    </div>
  );
};
