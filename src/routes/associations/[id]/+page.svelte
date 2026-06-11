<script lang='ts'>
	import Carousel from '$lib/components/animals/carousel.svelte';
  let { data = $bindable() } = $props();
  const shelterUrl = data.shelter.images_association[0].url;
  import shelterEmpty from '$lib/assets/images/shelter_empty.webp'; 
</script>

<section class="flex flex-col mx-auto mt-2">
  <h2 class="font-grands text-2xl md:text-3xl text-center w-full my-6">{data.shelter.nom}</h2>

  <div class="font-body mx-auto w-[80%] rounded-lg my-1 justify-center flex">
    {#if shelterUrl}
      <img
        class="rounded-lg"
        src={`../src/lib/assets/${shelterUrl}`}
        alt={`Logo de ${data.shelter.nom}`}
      />
    {:else}
      <img
        class="rounded-lg"
        src={shelterEmpty}
        alt={`Logo de ${data.shelter.nom} bientôt visible`}
      />
    {/if}
  </div>

  <article class="font-body mx-auto w-[90%] md:w-[60%] bg-zoning rounded-lg shadow  my-4">
    <div class="text-center w-full">
      <h3 class="font-grands text-xl md:text-3xl text-center my-1 w-full">
        Informations
      </h3>
    </div>

    <div class="w-full py-2 px-2 text-xs">
      <p class="font-body text-texte md:text-center md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus magni rerum,
        unde sunt beatae ipsam rem est sequi minus eligendi doloremque aliquid laudantium eos
        perspiciatis obcaecati ea voluptas harum et?
      </p>
    </div>

    <div class="w-full px-2 py-4 gap-2 text-xs flex flex-col">
      <p class="font-body text-texte text-center md:text-base">
        Adresse : {data.shelter.rue},&nbsp;{data.shelter.code_postal},&nbsp;{data.shelter.commune},&nbsp;
        {data.shelter.pays}
      </p>
      <p class="font-body text-texte text-center md:text-base">
        Téléphone : {data.shelter.telephone}
      </p>
      {#if data.shelter.site}
        <p class="font-body text-texte text-center md:text-base">
          E-mail : {data.shelter.site}
        </p>
      {/if}
      {#if data.shelter.description}
        <p class="font-body text-texte text-center md:text-base">
          E-mail : {data.shelter.description}
        </p>
      {/if}
    </div>
  </article>
</section>

<section class="p-2 block">
  <h2 class="font-grands text-xl text-center my-2 md:md:text-2xl">
    Ils vous attendent de patte ferme chez {data.shelter.nom} !
  </h2>
  <Carousel 
    data={data.shelter.animal}
    shelterId={data.shelter.id}
  />
</section>