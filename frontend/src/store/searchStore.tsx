import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SearchState {
  search: string | undefined;
  setSearch: (search: string) => void;
}

export const searchStore = create<SearchState>()(
  immer((set) => ({
    search: undefined,
    setSearch: (search: string) =>
      set((state) => {
        state.search = search;
      }),
  }))
);
