<script lang="ts">
  import Modal from 'components/modal/index.svelte';
  import deepClone from 'utils/deepClone';
  import type { IOption } from 'types/option';

  export let options: IOption[];

  let running: boolean = false;
  let showModal: boolean = false;
  let option: IOption | null = null;
  let timer: NodeJS.Timeout | null = null;
  let optionList: IOption[] = deepClone(options);
  let optionInput: string = '';

  $: optionName = option?.name || '';
  $: activeOptionList = optionList.filter((f: IOption) => !f.hide);
  $: console.log('options => ', optionList)

  const getRandomIndex = (min: number, max: number): number => {
    return Math.min(Math.floor(Math.random() * (max - min) + min), max);
  }

  const start = () => {
    running = true;
    timer = setInterval(() => {
      const idx = getRandomIndex(0, activeOptionList.length);
      option = activeOptionList[idx];
    }, 50)
  }

  const stop = () => {
    running = false;
    if (timer) {
      clearInterval(timer);
    }
  }

  const toggleShowModal = (show: boolean) => {
    showModal = show;
  }

  const toggleSelectOption = (option: IOption) => {
    option.hide = !option.hide;
    optionList = [...optionList];
  }

  const addOption = () => {
    const name = optionInput.trim();
    if (!name) return;
    optionList = [...optionList, { name }]
    optionInput = '';
  }

  const resetOptions = () => {
    optionList = deepClone(options);
  }
</script>

<div>
  {#if showModal}
    <Modal
      hideCloseBtn
      on:close={() => toggleShowModal(false)}
      on:confirm={() => toggleShowModal(false)}
    >
      <div slot='header'>Options Setting</div>
      <div class="option-list">
        {#each optionList as option, index}
          <div
            class={`option-item ${!option.hide && 'active'}`}
            on:click={() => toggleSelectOption(option)}
          >
            {option.name}
          </div>
        {/each}
      </div>
      <input
        class="modal-option-input"
        bind:value={optionInput}
      />
      <button
        class="add-option-btn"
        disabled={!optionInput.trim()}
        on:click={addOption}
      >
        +
      </button>
      <button
        slot="footer-extra"
        on:click={resetOptions}
      >
        Reset
      </button>
    </Modal>
  {/if}
  <div class="options-info">
    Number of Options：{activeOptionList.length}
    <span on:click={() => toggleShowModal(true)} class="link">Options Setting</span>
  </div>

  <input
    disabled
    placeholder="Make decision randomly"
    class="random-input"
    bind:value={optionName}
  />

  {#if !running}
    <button on:click={start}>start</button>
  {:else}
    <button on:click={stop}>stop</button>
  {/if}

  {#if option && !running}
    <div>
      <h4>Decision Making Result</h4>
      {#each Object.keys(option) as key}
        <div>{key}: {option[key]}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  input:disabled {
    cursor: not-allowed;
  }
  .random-input {
    width: 16em;
  }

  .option-list {
    display: flex;
    flex-wrap: wrap;
    max-height: calc(100vh - 20em);
    padding-bottom: 1em;
    border-bottom: 1px solid #e5edef;
    overflow: auto;
  }

  .option-item {
    display: flex;
    align-items: center;
    padding: 5px 8px;
    margin-right: 0.5em;
    border: 1px solid #e5edef;
    border-radius: 20px;
    cursor: pointer;
  }

  .modal-option-input {
    width: 16em;
    margin-top: 1em;
  }
  .add-option-btn {
    width: 2.5em;
  }

  .option-item.active {
    background-color: #06f;
    color: white;
  }

  .options-info {
    margin-bottom: 10px;
  }
  .link {
    display: inline-block;
    margin-left: 1em;
    color: #06f;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
