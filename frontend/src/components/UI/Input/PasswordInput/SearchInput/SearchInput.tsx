'use client';
import { searchStore } from '@/store/searchStore';
import { useDebounceFn } from '@/utils/hooks/useDebounceFn';
import { Input, InputProps } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export const SearchInput: FC<InputProps> = (props) => {
  const pathname = usePathname();
  const [value, setValue] = useState('');
  const search = searchStore((state) => state.search);
  const setSearch = searchStore((state) => state.setSearch);
  const setDebouncedSearchValue = useDebounceFn(setSearch, 300);

  const handleSetValue = (value: string) => {
    setValue(value);
    setDebouncedSearchValue(value);
  };

  useEffect(() => {
    !search && setValue('');
  }, [search]);

  useEffect(() => {
    setValue('');
    setSearch('');
  }, [pathname]);

  return (
    <Input
      value={value}
      onChange={(e) => handleSetValue(e.target.value)}
      placeholder="Search..."
      size="sm"
      startContent={<CiSearch />}
      classNames={{
        inputWrapper: 'bg-transparent shadow-none',
      }}
      isClearable
      onClear={() => handleSetValue('')}
      {...props}
    />
  );
};
