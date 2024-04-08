'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { TestCard } from './TestCard/TestCard';
import { useSlugTestingsQuery } from '@/utils/hooks/tanstack/useTestings';
import { Pagination } from '@nextui-org/react';
import { usePaginationTestStore } from '@/store/paginationTestStore';
import { useEffect } from 'react';

export default function Test({ id }: { id: string }) {
  const setTotalPages = usePaginationTestStore((state) => state.setTotalPages);
  const currentPage = usePaginationTestStore((state) => state.currentPage);
  const setCurrentPage = usePaginationTestStore(
    (state) => state.setCurrentPage
  );

  const query = searchStore((state) => state.search);
  const { data: testings } = useSlugTestingsQuery(id);
  useEffect(() => {
    if (testings) {
      setTotalPages(testings.data.questions.length);
    }
  }, [testings]);
  console.log(testings?.data.questions.length);
  if (!testings) return;
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div className="flex flex-col justify-center items-center pt-10 gap-5">
          <h2 className="text-3xl font-black">{testings?.data.title}</h2>

          <p className="text-xl font-semibold">{testings?.data.description}</p>
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
