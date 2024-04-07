'use client';
import { useProfileQuery } from '@/utils/hooks/tanstack/useProfile';
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const ProfileDropdown = () => {
  const { data } = useProfileQuery();

  if (!data) {
    return null;
  }

  return (
    <Dropdown placement="bottom" offset={20}>
      <DropdownTrigger>
        <Avatar
          src={data.data.avatar_display ?? ''}
          isBordered
          color="primary"
          as="button"
        />
      </DropdownTrigger>
      <DropdownMenu className="py-2">
        <DropdownItem key="profile" className="text-center p-0 w-full">
          <Link
            href="/profile"
            className="w-full text-center p-[6px_8px] block"
          >
            Профиль
          </Link>
        </DropdownItem>
        <DropdownItem
          key="signout"
          as="button"
          color="danger"
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="text-danger"
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
