'use client';
import { SearchInput } from '@/components/UI/Input/PasswordInput/SearchInput/SearchInput';
import { Logo } from '@/components/UI/Logo/Logo';
import { ProfilePopover } from '@/components/UI/ProfilePopover/ProfilePopover';

import React from 'react';

export const Header = () => {
  return (
    <header className="flex justify-between items-center gap-8">
      <Logo />
      <SearchInput />
      <ProfilePopover />
    </header>
  );
};
