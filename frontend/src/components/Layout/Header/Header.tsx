'use client';
import { SearchInput } from '@/components/UI/Input/PasswordInput/SearchInput/SearchInput';
import { Logo } from '@/components/UI/Logo/Logo';
import { ProfileDropdown } from '@/components/UI/ProfileDropdown/ProfileDropdown';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useState } from 'react';

export interface NavbarItemProps {
  link: string;
  name: string;
}

const navbarItems: NavbarItemProps[] = [
  { link: '/sections', name: 'Разделы' },
  { link: '/materials', name: 'Материалы' },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      as="header"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="relative z-1"
    >
      <NavbarContent className="max-sm:max-w-fit">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-3" justify="center">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.name}
            isActive={pathname === item.link}
            className="text-sm font-semibold data-[active=true]:text-primary"
          >
            <Link href={item.link}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <SearchInput classNames={{ base: 'max-w-full sm:max-w-[10rem]' }} />
      </NavbarContent>

      <ProfileDropdown />
      <AnimatePresence mode="wait">
        <NavbarMenu
          className="pl-16 pt-10 bg-black/10 absolute top-0 left-0"
          motionProps={{
            initial: { opacity: 0, height: 0, overflow: 'hidden' },
            animate: { opacity: 1, height: 'auto' },
            exit: { opacity: 0, height: 0, overflow: 'hidden' },
          }}
        >
          <NavbarMenuToggle className="ml-auto mr-0 h-max pb-10" />
          {navbarItems.map((item) => (
            <NavbarMenuItem
              key={item.link}
              isActive={pathname === item.link}
              className="text-xl font-semibold data-[active=true]:text-primary pb-5"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={item.link}>{item.name}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </AnimatePresence>
    </Navbar>
  );
};
