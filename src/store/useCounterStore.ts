import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandPersistStorage} from './zustand-storage';

type IActions = {
  incrementAction: () => void;
  decrementAction: () => void;
  resetAction: () => void;
};

type IStore = {
  count: number;
  actions: IActions;
};

const initialState = {
  count: 0,
};

// Creates a slice of the store for managing state and actions.
const createSlice: StateCreator<IStore> = set => ({
  ...initialState,
  actions: {
    incrementAction: () => set(state => ({count: state.count + 1})),
    decrementAction: () => set(state => ({count: state.count - 1})),
    resetAction: () => set(() => ({count: 0})),
  },
});

/**
 * Hook to use the persisted store.
 * The store state is persisted using custom storage.
 */
export const usePersistCounterStore = create<IStore>()(
  persist(createSlice, {
    name: 'counter-store',
    storage: createJSONStorage(() => zustandPersistStorage),
  }),
);

/**
 * Hook to use the store without persistence.
 */
export const useCounterStore = create<IStore>(createSlice);
