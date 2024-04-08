import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IPaginationTestStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (page: number) => void;
}

export const usePaginationTestStore = create<IPaginationTestStore>()(
  immer((set) => ({
    currentPage: 1,
    totalPages: 0,
    setTotalPages: (page) => set({ totalPages: page }),
    setCurrentPage: (page) => set({ currentPage: page }),
  }))
);
