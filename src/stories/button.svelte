<button class="button py-1 px-3 font-semibold border-4 border-solid border-green-500" on:click={onClick}>
    {text}
</button>

<style>
    .button {
      -webkit-appearance: none;
      background-color: #ffffff;
      cursor: pointer;
      border-radius: 8px;
    }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  
  export let text = '';

  const dispatch = createEventDispatcher();

  function onClick(event) {
    dispatch('click', event)
  }
</script>
