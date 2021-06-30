import { writable, derived } from 'svelte/store';

const useReducer = (reducer, initialState) => {
  const state = writable(initialState);
  const dispatch = (action) => {
    state.update(currentState => reducer(currentState, action));
  }
  const readableState = derived(state, $state => $state);

  return [readableState, dispatch];
}

export default useReducer;
