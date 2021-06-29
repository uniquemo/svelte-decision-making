<script lang="ts">
  import foodData from 'data/food';
  import Option from './components/option/index.svelte';
</script>

<main>
  <h3>Decision Making</h3>
  <Option options={foodData} />
</main>

<style>
  main {
    padding: 0 1em;
  }

  :global(button) {
    cursor: pointer;
  }
</style>
