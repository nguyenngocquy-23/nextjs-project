import { create } from 'zustand';

type ProductFilterState = {
  searchHistory: string[];
  setSearchHistory: (term: string) => void;
};

export const usePostFilter = create<ProductFilterState>((set) => ({
  searchHistory: [],
  setSearchHistory: (term: string) =>
    set((state) => ({
      searchHistory: [
        term,
        ...state.searchHistory.filter((t) => t !== term),
      ].slice(0, 5), // lưu tối đa 5 từ khoá
    })),
  clearHistory: () => set({ searchHistory: [] }),
}));
