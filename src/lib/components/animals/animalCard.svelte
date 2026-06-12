<script lang='ts'>
  import animalEmpty from '$lib/assets/images/animal_empty.webp';
  let { animal = $bindable() } = $props();
</script>

<div class="bg-zoning rounded-lg shadow md:flex-col">
  <div class="relative md:w-full flex justify-center items-center">
    {#if animal.images_animal.length}
      <img
        class="font-body rounded-lg"
        src={`./src/lib/assets/${animal.images_animal[0].urlrl}`}
        alt={`Photo de ${animal.nom}`}
      />
    {:else}
      <img
        class="font-body rounded-lg"
        src={animalEmpty}
        alt="Bientôt visible"
      />
    {/if}
  </div>
  <div class="flex-auto text-center">
    <div class="flex flex-wrap">
      <h3 class="flex-auto text-xl md:text-3xl font-semibold dark:text-gray-50">
        {animal.nom}
      </h3>
      <h4 class="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 ">
        {animal.espece.nom}
      </h4>
      <hr />
      <p class="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 ">
        Age : {animal.age}
      </p>
      <p class="flex-none w-full mt-2 text-xs md:text-xl font-medium text-gray-500 ">
        Localisation : {animal.refuge.code_postal}
      </p>
    </div>
    <div class="flex text-sm font-medium justify-center">
      <a
        class="my-2 bg-accents1-light text-fond w-[90%] transition ease-in duration-200 text-center text-xs md:text-2xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        href={`/animaux/${animal.id}`}
      >
        Découvrir
      </a>
    </div>
  </div>
</div>