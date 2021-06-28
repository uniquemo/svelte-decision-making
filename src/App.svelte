<script lang="ts">
  import foodData from './data/food'

  let running = false;
  let food = null;
  let foodName = '';
  let timer = null;

  const getRandomIndex = (min: number, max: number) => {
    return Math.min(Math.floor(Math.random() * (max - min) + min), max);
  }

  const start = () => {
    running = true;

    timer = setInterval(() => {
      const idx = getRandomIndex(0, foodData.length);
      food = foodData[idx];
      foodName = food.name;
    }, 50)
  }

  const stop = () => {
    running = false;
    if (timer) {
      clearInterval(timer);
    }
  }
</script>

<main>
  <h3>Food Selection</h3>
  <input
    disabled
    placeholder="Generate food randomly"
    class="food"
    bind:value={foodName}
  />

  {#if !running}
    <button on:click={start}>start</button>
  {:else}
    <button on:click={stop}>stop</button>
  {/if}

  {#if food && !running}
    <div>
      <h4>Decision Making Result</h4>
      {#each Object.keys(food) as key}
        <div>{key}: {food[key]}</div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    padding: 0 1em;
  }
  input:disabled {
    cursor: not-allowed;
  }
  .food {
    width: 300px;
  }
</style>
