<script lang='ts'>
  import animalEmpty from '$lib/assets/images/animal_empty.webp';

  let { animal = $bindable()} = $props();
  const url = animal.images_animal[0].url;

  function handleClick(e: MouseEvent) {
    const row = e.currentTarget as HTMLTableRowElement;
    const fold = row.nextElementSibling;
    fold?.classList.toggle('hidden');
  }
</script>

<tbody>
  <tr
    onclick={handleClick}
    tabindex="0"
    class="view  text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border hover:bg-accents2-dark"
  >
    <td class="px-2 pt-2  border-accents2-dark border-solid border">{animal.nom}</td>
    <td class="px-2 pt-2  border-accents2-dark border-solid border">
      {animal.accueillant.nom}
    </td>
  </tr>

  <tr class="fold hidden mb-3 bg-fond rounded-b-lg ">
    <td class="w-full rounded-xl" colSpan={2}>
      <div class="flex flex-wrap p-2 justify-center md:flex-nowrap">
        <div class="w-full md:w-1/2">
          <h3 class="font-body font-bold">Animal</h3>

          <div class="flex p-6 pb-4">
            <div class="flex flex-col gap-2">
              {#if url}
                <img
                  class="w-28 rounded-lg"
                  src={`../../../src/lib/assets/${url}`}
                  alt={`Photo de ${animal.nom}`}
                />
              {:else}
                <img
                  class="w-28 rounded-lg"
                  src={animalEmpty}
                  alt="Bientôt visible"
                />
              {/if}
              <a
                class="rounded-full block bg-accents1 text-fond w-28 text-center text-xs font-semibold px-6 hover:underline"
                href={`/associations/profil/animaux/${animal.id}`}
              >
                Détails
              </a>
            </div>

            <div class="pl-4">
              <p class="text-base italic leading-3">Nom</p>
              <p class="text-base font-semibold">{animal.nom}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 px-6 gap-y-2">
            <div>
              <p class="text-sm italic leading-3">Age</p>
              <p class="text-base font-semibold">{animal.age} ans</p>
            </div>

            <div>
              <p class="text-sm italic leading-3">Sexe</p>
              <p class="text-base font-semibold">{animal.sexe}</p>
            </div>

            <div class="">
              <p class="text-sm italic leading-3">Espèce</p>
              <p class="text-base font-semibold">{animal.espece.nom}</p>
            </div>

            {#if animal.race}
              <div>
                <p class="text-sm italic leading-3">Race</p>
                <p class="text-base font-semibold">{animal.race}</p>
              </div>
            {/if}
          </div>

          {#if animal.animal_tag.length}
            <div class="flex flex-wrap mt-4 px-6 gap-1">
              {#each animal.tags as tag (tag.id)}
                <p class="group p-2 rounded-full block justify-center bg-accents1-light text-fond text-center text-sm font-semibold py-1 px-2">
                  {tag.nom}
                  <span class="group-hover:block hidden z-10 bg-accents2 text-fond absolute px-2 py-2 text-sm rounded-b-xl rounded-tr-xl">
                    {tag.description}
                  </span>
                </p>
              {/each}
            </div>
          {/if}
        </div>

        <hr class="border-t-accents2 w-2/4 border-t-2 border-solid justify-self-center my-4 md:hidden" />

        <div class="w-full md:w-1/2">
          <h3 class="font-body font-bold mb-4">Famille</h3>

          <div class="px-6 mb-3 md:grid-cols-2 md:grid">
            <div class="mb-2 mt-2">
              <p class="text-sm italic leading-3">Nom</p>
              <p class="text-base font-semibold">{animal.accueillant.nom}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Téléphone</p>
              <p class="text-base font-semibold">{animal.accueillant.telephone}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-4">Adresse</p>
              <p class="text-base font-semibold leading-3">{animal.accueillant.rue}</p>
              <p class="text-base font-semibold ">
                {animal.accueillant.code_postal} {animal.accueillant.commune}
              </p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Pays</p>
              <p class="text-base font-semibold">{animal.accueillant.pays}</p>
            </div>
            <div>
              <p class="text-sm italic leading-3">Hébergement</p>
              <p class="text-base font-semibold">{animal.accueillant.hebergement}</p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</tbody>
