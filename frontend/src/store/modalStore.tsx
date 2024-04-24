import { ReactNode } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ModalState {
  isVisible: boolean;
  content: ReactNode;
  title: string;
  showModal: (content: ReactNode, title: string) => void;
  hideModal: () => void;
}

const initialState = {
  isVisible: false,
  content: null,
  title: '',
};

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    ...initialState,
    showModal: (content, title) =>
      set((state) => {
        state.isVisible = true;
        state.content = content;
        state.title = title;
      }),
    hideModal: () => set(initialState),
  }))
);
