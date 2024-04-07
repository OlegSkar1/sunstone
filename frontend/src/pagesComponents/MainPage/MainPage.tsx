'use client';

import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import { useProfileQuery } from '@/utils/hooks/tanstack/useProfile';

export default function MainPage() {
  const query = searchStore((state) => state.search);
  const { data: profile } = useProfileQuery();
  return (
    <>
      {query ? (
        <SearchList />
      ) : (
        <div>
          <h2>
            Добро пожаловать {profile?.data.name} {profile?.data.last_name}
          </h2>
        </div>
      )}
    </>
  );
}
