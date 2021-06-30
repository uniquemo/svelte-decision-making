<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let hideCloseBtn;

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');
  const confirm = () => dispatch('confirm');

  let modal: HTMLDivElement;

  const handleKeyDown: svelte.JSX.KeyboardEventHandler<Window> = (ev) => {
    if (ev.key === 'Escape') {
      close();
      return;
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="modal-mask" on:click={close}></div>

<div class="modal" bind:this={modal}>
  <div class="modal-header">
    <slot name="header"></slot>
  </div>

  <div class="modal-body">
    <slot></slot>
  </div>

  <button on:click={confirm}>confirm</button>
  {#if !hideCloseBtn}
    <button on:click={close}>close</button>
  {/if}
  <slot name="footer-extra"></slot>
</div>

<style>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background-color: white;
  }

  .modal-header {
    padding: 0.5em 0 1em;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    font-weight: 600;
  }

  .modal-body {
    padding: 1em 0;
  }
</style>
