'use client';

import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';

export default function MainPage() {
  const query = searchStore((state) => state.search);
  return <main>{query ? <SearchList /> : 'mainpage'}</main>;
}
