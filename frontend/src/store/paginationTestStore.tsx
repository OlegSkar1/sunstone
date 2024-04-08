import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IPaginationTestStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const usePaginationTestStore = create<IPaginationTestStore>()(
  immer((set) => ({
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
  }))
);
