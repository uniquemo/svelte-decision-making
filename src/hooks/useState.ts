import { writable, derived } from 'svelte/store';

const useState = (initialState) => {
  const state = writable(initialState);
  const update = (val) => {
    state.update(currentState =>
      typeof val === 'function' ? val(currentState) : val
    );
  }
  const readableState = derived(state, $state => $state);

  return [readableState, update];
}

export default useState;
