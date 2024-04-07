'use client';
import { useProfileQuery } from '@/utils/hooks/tanstack/useProfile';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const ProfilePopover = () => {
  const { data } = useProfileQuery();
  if (!data) return;

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Card className="shrink-0 cursor-pointer px-2">
          <CardBody className="flex-row items-center gap-2 text-small font-semibold">
            <Avatar size="sm" src={data.data.avatar_display} />
            <span>{data.data.name}</span>
          </CardBody>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="py-2">
        <Link href="/profile">
          <Button variant="flat" color="primary">
            Профиль
          </Button>
        </Link>
        <Button
          fullWidth
          variant="light"
          onClick={() => signOut({ callbackUrl: '/signin' })}
        >
          Выйти
        </Button>
      </PopoverContent>
    </Popover>
  );
};
