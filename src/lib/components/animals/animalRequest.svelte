<script lang='ts'>
  let { animalId } = $props();

  /* 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // ...
  }
  */
</script>


<!-- 
{#if auth.user.accueillant}
  <div class="text-center w-full py-2">
    {#if userMessage}
      <p class="font-grands text-accents1 text-center">{userMessage}</p>
    {/if}
    <form onsubmit={handleSubmit}> 
      <button
        type="submit"
        class="mx-auto my-3 py-2 px-6 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Faire une demande
      </button>
    </form>
  </div>
{/if} 
-->