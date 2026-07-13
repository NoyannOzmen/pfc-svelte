<script lang='ts'>
  import HeaderLogged from './headerLogged.svelte';
  import HeaderLogin from './headerLogin.svelte';

  let { user = $bindable() } = $props();
</script>

<nav class="rounded-br-lg md:rounded-b-lg flex-auto  bg-accents2-dark text-fond p-3 text-base md:text-lg md:mr-4">
  <ul class="flex flex-col md:flex-row flex-nowrap justify-around">
    {#if user}
      <HeaderLogged user={user} />
    {:else}
      <HeaderLogin />
    {/if}
  </ul>
</nav>