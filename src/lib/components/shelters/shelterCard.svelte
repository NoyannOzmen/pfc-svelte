<script lang='ts'>
  let { shelter = $bindable() } = $props();
  const url = shelter.images_association[0].url;
  import shelterEmpty from '$lib/assets/images/shelter_empty.webp'; 
</script>

<div class="bg-zoning rounded-lg shadow flex flex-col">
  <div class="relative md:w-full flex justify-center items-center">
    {#if url}
      <img
        class="font-body rounded-lg"
        src={`./src/lib/assets/${url}`}
        alt={`Logo de ${shelter.nom}`}
      />
    {:else}
      <img
        class="font-body rounded-lg"
        src={shelterEmpty}
        alt="Bientôt visible"
      />
    {/if}
  </div>
  <div class="flex text-center flex-col">
    <div class="flex flex-wrap">
      <h3 class="flex-auto text-xl md:text-3xl font-semibold">
        {shelter.nom}
      </h3>
      <hr />
      <p class="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500">
        Localisation : {shelter.code_postal}&nbsp;{shelter.commune}
      </p>
    </div>
    <div class="flex text-sm font-medium justify-center items-end">
      <a
        class="my-2 bg-accents1-light text-fond w-[90%] transition ease-in duration-200 text-center text-xs md:text-2xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        href={`/associations/${shelter.id}`}
      >
        En savoir plus
      </a>
    </div>
  </div>
</div>
