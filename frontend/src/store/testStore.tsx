import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type TestModeType = 'exam' | 'training';

interface ITestStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (page: number) => void;
  completedList: number[];
  setCompletedList: (completedItemId: number) => void;
  testMode: TestModeType;
  setTestMode: (testMode: TestModeType) => void;
}

export const useTestStore = create<ITestStore>()(
  immer((set) => ({
    testMode: 'training',
    completedList: [],
    currentPage: 1,
    totalPages: 0,
    setTestMode: (testMode) => set({ testMode }),
    setTotalPages: (page) => set({ totalPages: page }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setCompletedList: (completedItemId) =>
      set((state) => {
        state.completedList.push(completedItemId);
      }),
  }))
);
