<script>
  /* import HeaderLogged from './headerLogged.svelte'; */
  import HeaderLogin from './headerLogin.svelte';
</script>

<nav class="rounded-br-lg md:rounded-b-lg flex-auto  bg-accents2-dark text-fond p-3 text-base md:text-lg md:mr-4">
  <ul class="flex flex-col md:flex-row flex-nowrap justify-around">
    <!-- 
    {#if user}
      <HeaderLogged />
    {:else}
      <HeaderLogin />}
    {/if}
    -->
     <HeaderLogin />
  </ul>
</nav>