<script lang='ts'>
  import shelterEmpty from '$lib/assets/images/shelter_empty.webp'; 
  import animalEmpty from '$lib/assets/images/animal_empty.webp'; 
	import Carousel from '$lib/components/animals/carousel.svelte';
	import { enhance } from '$app/forms';

  let { data = $bindable(), form } = $props();
  let animal = $derived(data.animal);
  let user = $derived(data.user);
</script>

<div class="flex flex-wrap flex-col md:flex-row justify-self-stretch flex-1 w-full place-content-evenly 2xl:w-1/2 2xl:self-center">
  <section class="flex flex-col m-4 flex-1 max-[767px]:mx-4 md:ml-6 place-content-evenly">
    <h2 class="font-grands text-2xl md:text-3xl text-center w-full my-6">{animal.nom}</h2>

    <div class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
      {#if animal.images_animal && animal.images_animal.length}
        <img
          class="mx-auto my-2"
          src={`../src/lib/assets/${animal.images_animal[0].url}`}
          alt={`Photo de ${animal.nom}`}
        />
      {:else}
        <img class="mx-auto my-2" src={animalEmpty} alt="Bientôt visible" />
      {/if}
    </div>
    <article class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
      <div class="text-center w-full py-2">
        <h3 class="font-grands text-3xl text-center my-2 w-full">
          A propos de {animal.nom}
        </h3>
      </div>

      <div class="text-center w-full py-2">
        {#each animal.animal_tag as tag (tag.tag.id)}
          <button class="group mx-1 p-1 rounded-lg bg-accents1-dark text-fond text-center">
            {tag.tag.nom}
            <span class="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
              {tag.tag.description}
            </span>
          </button>
        {/each}
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Nom : {animal.nom}</p>
        <p class="font-body text-texte">Age : {animal.age}&nbsp;ans</p>
        <p class="font-body text-texte">Sexe : {animal.sexe}</p>
      </div>
      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Espèce : {animal.espece?.nom}</p>
        {#if animal.race}
          <p class="font-body text-texte">Race : {animal.race}</p>
        {/if}
        <p class="font-body text-texte">Couleur : {animal.couleur}</p>
      </div>
      <div class="text-center w-full py-2">
        <p class="font-body text-texte">Statut : {animal.statut}</p>
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">
          Son petit truc en plus :<br />
          {animal.description}
        </p>
      </div>
        {#if user?.famille}
          <div class="text-center w-full py-2">
            {#if form?.message}
              <p class="font-grands text-accents1 text-center">{form.message}</p>
            {/if}
            <form
              method="POST"
              use:enhance
            > 
              <button
                type="submit"
                class="mx-auto my-3 py-2 px-6 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Faire une demande
              </button>
            </form>
          </div>
        {/if}
    </article>
  </section>

  <section class="flex flex-col md:my-8 flex-none  md:max-w-[50%] max-[767px]:mx-4 md:mr-6 md:mt-32 py-6">
    <article class="font-body mx-auto w-full bg-zoning rounded-lg shadow my-4">
      <h3 class="font-grands text-3xl text-center my-2 pt-5 w-full">
        {animal.nom}
        <br />
        vous attend chez
        <br />
        {animal.refuge.nom}
      </h3>

      <div class="font-body mx-auto w-[80%] rounded-lg my-4">
        {#if animal.refuge.images_association && animal.refuge.images_association.length}
          <img
            class="mx-auto"
            src={`../src/lib/assets/${animal.refuge.images_association[0].url}`}
            alt={`Logo de ${animal.refuge.nom}`}
          />
        {:else}
          <img
            class="mx-auto"
            src={shelterEmpty}
            alt={`Logo de ${animal.refuge.nom} bientôt visible`}
          />
        {/if}
      </div>

      <div class="text-center w-full py-2">
        <p class="font-body text-texte">
          Adresse : {animal.refuge.rue},<br />
          {animal.refuge.code_postal},&nbsp;{animal.refuge.commune},&nbsp;{animal.refuge.pays}
        </p>
        <p class="font-body text-texte">Téléphone : {animal.refuge.telephone}</p>
        {#if animal.refuge.site}
          <p class="font-body text-texte">E-mail : {animal.refuge.site}</p>
        {/if}
        {#if animal.refuge.description}
          <p class="font-body text-texte">{animal.refuge.description}</p>
        {/if}
      </div>

      <div class="text-center w-full py-2">
        <a
          class="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          href={`/associations/${animal.refuge.id}`}
        >
          En savoir plus
        </a>
      </div>
    </article>
  </section>

  <section class="p-4 py-6 block">
    <h2 class="font-grands text-3xl text-center my-2">
      Ils vous attendent aussi chez {animal.refuge.nom} :
    </h2>
    <Carousel 
      animalId={animal.id}
      data={animal.refuge.animal}
    />
  </section>
</div>