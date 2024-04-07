'use client';
import SearchList from '@/components/SearchList/SearchList';
import { searchStore } from '@/store/searchStore';
import React from 'react';

export default function Materials() {
  const query = searchStore((state) => state.search);
  return <>{query ? <SearchList /> : <div>Materials</div>}</>;
}
