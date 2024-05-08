import { IValue } from '@/components/UI/DragAndDropList/DragAndDropList';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type TestModeType = 'exam' | 'training';

interface CompletedItem {
  answers: string | string[] | IValue[];
  relations?: IValue[];
  questionId: number;
  color?: 'primary' | 'success' | 'danger';
  ok?: boolean;
}

interface ITestStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (page: number) => void;
  completedList: CompletedItem[];
  setCompletedList: ({ questionId, color, answers }: CompletedItem) => void;
  testMode: TestModeType;
  setTestMode: (testMode: TestModeType) => void;
  clear: () => void;
}

export interface ITestStoreInitState {
  testMode: TestModeType;
  completedList: CompletedItem[];
  currentPage: number;
  totalPages: number;
}

const initialState: ITestStoreInitState = {
  testMode: 'training',
  completedList: [],
  currentPage: 1,
  totalPages: 0,
};

export const useTestStore = create<ITestStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      setTestMode: (testMode) => set({ testMode }),
      setTotalPages: (page) => set({ totalPages: page }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setCompletedList: (completedItem) =>
        set((state) => {
          const itemIndex = state.completedList.findIndex((item) => {
            return item.questionId === completedItem.questionId;
          });
          itemIndex !== -1
            ? (state.completedList[itemIndex] = completedItem)
            : state.completedList.push(completedItem);
        }),
      clear: () => set(initialState),
    })),
    {
      storage: createJSONStorage(() => sessionStorage),
      name: 'testStore',
    }
  )
);
