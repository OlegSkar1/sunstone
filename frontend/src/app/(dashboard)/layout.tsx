import { Header } from '@/components/Layout/Header/Header';
import { Modal } from '@/components/UI/Modal';
import React, { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Modal />
      <main>{children}</main>
    </>
  );
}
