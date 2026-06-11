<script lang='ts'>
  import shelterEmpty from '$lib/assets/images/shelter_empty.webp'; 
  import animalEmpty from '$lib/assets/images/animal_empty.webp'; 
	import Carousel from '$lib/components/animals/carousel.svelte';
	import AnimalRequest from '$lib/components/animals/animalRequest.svelte';

  let { data = $bindable() } = $props();

  const animalUrl = data.animal.images_animal[0].url;
  const shelterUrl = data.animal.refuge.images_association[0].url;
</script>

<div class="flex flex-wrap flex-col md:flex-row justify-self-stretch flex-1 w-full place-content-evenly 2xl:w-1/2 2xl:self-center">
  <section class="flex flex-col m-4 flex-1 max-[767px]:mx-4 md:ml-6 place-content-evenly">
    <h2 class="font-grands text-2xl md:text-3xl text-center w-full my-6">{data.animal.nom}</h2>

    <div class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
      {#if animalUrl}
        <img
          class="mx-auto my-2"
          src={`../src/lib/assets/${animalUrl}`}
          alt={`Photo de ${data.animal.nom}`}
        />
      {:else}
        <img class="mx-auto my-2" src={animalEmpty} alt="Bientôt visible" />
      {/if}
    </div>
    <article class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
      <div class="text-center w-full py-2">
        <h3 class="font-grands text-3xl text-center my-2 w-full">
          A propos de {data.animal.nom}
        </h3>
      </div>

      <div class="text-center w-full py-2">
        {#each data.animal.animal_tag.tag as tag (tag.id)}
          <button class="group p-1 rounded-lg bg-accents1-dark text-fond text-center">
            {tag.nom}
            <span class="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
              {tag.description}
            </span>
          </button>
        {/each}
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Nom : {data.animal.nom}</p>
        <p class="font-body text-texte">Age : {data.animal.age}&nbsp;ans</p>
        <p class="font-body text-texte">Sexe : {data.animal.sexe}</p>
      </div>
      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Espèce : {data.animal.espece?.nom}</p>
        {#if data.animal.race}
          <p class="font-body text-texte">Race : {data.animal.race}</p>
        {/if}
        <p class="font-body text-texte">Couleur : {data.animal.couleur}</p>
      </div>
      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Statut : {data.animal.statut}</p>
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">
          Son petit truc en plus :<br />
          {data.animal.description}
        </p>
      </div>
      <AnimalRequest animalId={data.animal.id} />
    </article>
  </section>

  <section class="flex flex-col md:my-8 flex-none  md:max-w-[50%] max-[767px]:mx-4 md:mr-6 md:mt-32 py-6">
    <article class="font-body mx-auto w-full bg-zoning rounded-lg shadow my-4">
      <h3 class="font-grands text-3xl text-center my-2 pt-5 w-full">
        {data.animal.nom}
        <br />
        vous attend chez
        <br />
        {data.animal.refuge.nom}
      </h3>

      <div class="font-body mx-auto w-[80%] rounded-lg my-4">
        {#if shelterUrl}
          <img
            class="mx-auto"
            src={`../src/lib/assets/${shelterUrl}`}
            alt={`Logo de ${data.animal.refuge.nom}`}
          />
        {:else}
          <img
            class="mx-auto"
            src={shelterEmpty}
            alt={`Logo de ${data.animal.refuge.nom} bientôt visible`}
          />
        {/if}
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">
          Adresse : {data.animal.refuge.rue},<br />
          {data.animal.refuge.code_postal},&nbsp;{data.animal.refuge.commune},&nbsp;{data.animal.refuge.pays}
        </p>
        <p class="font-body text-texte">Téléphone : {data.animal.refuge.telephone}</p>
        {#if data.animal.refuge.site}
          <p class="font-body text-texte">E-mail : {data.animal.refuge.site}</p>
        {/if}
        {#if data.animal.refuge.description}
          <p class="font-body text-texte">{data.animal.refuge.description}</p>
        {/if}
      </div>

      <div class="text-center w-full py-2">
        <a
          class="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          href={`/associations/${data.animal.refuge.id}`}
        >
          En savoir plus
        </a>
      </div>
    </article>
  </section>

  <section class="p-4 py-6 block">
    <h2 class="font-grands text-3xl text-center my-2">
      Ils vous attendent de patte ferme !
    </h2>
    <Carousel 
      animalId={data.animal.id}
      data={data.animal.refuge.animal}
    />
  </section>
</div>