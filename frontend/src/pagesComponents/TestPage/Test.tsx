'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { TestCard } from './TestCard/TestCard';
import { useSlugTestingsQuery } from '@/utils/hooks/tanstack/useTestings';
import { Pagination, Switch } from '@nextui-org/react';
import { useTestStore } from '@/store/testStore';
import { useEffect } from 'react';
import { TestInfo } from './TestInfo/TestInfo';

export default function Test({ id }: { id: string }) {
  const setTotalPages = useTestStore((state) => state.setTotalPages);
  const currentPage = useTestStore((state) => state.currentPage);
  const setCurrentPage = useTestStore((state) => state.setCurrentPage);

  const query = searchStore((state) => state.search);

  const { data: testings } = useSlugTestingsQuery(id);

  useEffect(() => {
    if (testings) {
      setTotalPages(testings.data.questions.length);
    }
  }, [testings]);

  if (!testings?.data.questions.length) return null;
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex flex-col gap-4 items-center mt-20">
          <TestCard test={testings?.data.questions[currentPage - 1]} />
          <Pagination
            variant="faded"
            color="secondary"
            total={testings?.data.questions.length}
            initialPage={1}
            showControls
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
