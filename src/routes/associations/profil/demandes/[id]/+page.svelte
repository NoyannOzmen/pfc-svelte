<script lang='ts'>
  import { enhance } from "$app/forms";
  import animalEmpty from '$lib/assets/images/animal_empty.webp';
  let { data = $bindable(), /* form */} = $props()
  let demande = $derived(data.request);

</script>
  
<h2 class="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>
<div class="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
  <nav class="flex flex-wrap justify-center md:justify-start">
    <ul class="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
      <li>
        <a href="/associations/profil" tabindex="0">
          <button id="dashbtn-1" class="dashbtn" tabindex="-1">
            Profil
          </button>
        </a>
      </li>
      <li>
        <a href="/associations/profil/demandes" tabindex="0">
          <button id="dashbtn-2" class="dashbtn dashbtn-active" tabindex="-1">
            Demandes
          </button>
        </a>
      </li>
      <li>
        <a href="/associations/profil/animaux" tabindex="0">
          <button id="dashbtn-3" class="dashbtn" tabindex="-1">
            Animaux
          </button>
        </a>
      </li>
    </ul>
    <div class="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
  </nav>

  <div class="flex flex-col bg-zoning rounded-lg">
    <nav class="rounded-lg h-9">
      <ul class="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2 pt-2">
        <li>
          <a
            class="flex flex-col justify-center content-center"
            href="/associations/profil/demandes"
          >
            <span class="material-symbols-outlined shrink">arrow_back</span>
          </a>
        </li>
      </ul>
    </nav>

    <section class="flex flex-wrap justify-center" id="dashboard-container">
      <h3 class="font-grands text-3xl text-center my-2 pt-5 w-full">
        Suivi de demande pour {demande.animal.nom}
      </h3>

      <div class="flex flex-wrap p-2 justify-center md:flex-nowrap">
        <div class="w-full md:w-1/2">
          <h4 class="font-body font-bold text-center">Animal</h4>
          <div class="flex p-6 pb-4">
            <div class="flex flex-col gap-2">
              {#if demande.animal.images_animal}
                <img
                  class="w-28 rounded-lg"
                  src={`./src/lib/assets/${demande.animal.images_animal[0].url}`}
                  alt={`Photo de ${demande.animal.nom}`}
                />
              {:else}
                <img
                  class="w-28 rounded-lg"
                  src={animalEmpty}
                  alt="Bientôt visible"
                />
              {/if}
              <a
                class="rounded-full mx-auto block bg-accents1 text-fond w-16 text-center text-xs font-semibold py-1 hover:underline"
                href={`/associations/profil/animaux/${demande.animal.id}`}
              >
                Détails
              </a>
            </div>

            <div class="pl-4">
              <p class="text-base italic leading-3">Nom</p>
              <p class="text-base font-semibold">{demande.animal.nom}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 px-6 gap-y-2">
            <div>
              <p class="text-sm italic leading-3">Age</p>
              <p class="text-base font-semibold">{demande.animal.age} ans</p>
            </div>

            <div>
              <p class="text-sm italic leading-3">Sexe</p>
              <p class="text-base font-semibold">{demande.animal.sexe}</p>
            </div>

            <div class="">
              <p class="text-sm italic leading-3">Espèce</p>
              <p class="text-base font-semibold">{demande.animal.espece.nom}</p>
            </div>

            {#if demande.animal.race}
              <div>
                <p class="text-sm italic leading-3">Race</p>
                <p class="text-base font-semibold">{demande.animal.race}</p>
              </div>
            {/if}
          </div>

          {#if demande.animal.animal_tag.length}
            <div class="flex flex-wrap mt-4 px-6 gap-1">
              {#each demande.animal.animal_tag as tag (tag.id)}
                <p class="group rounded-full block bg-accents1 text-fond text-center text-xs font-semibold py-1 px-2">
                  {tag.tag.nom}
                  <span class="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
                    {tag.tag.description}
                  </span>
                </p>
              {/each}
            </div>
          {/if}
        </div>

        <hr class="border-t-accents2 w-2/4 border-t-2 border-solid justify-self-center my-4 md:hidden" />

        <div class="w-full md:w-1/2">
          <h4 class="font-body font-bold mb-4 text-center">Famille</h4>

          <div class="px-6 mb-3 md:grid md:grid-cols-2 md:gap-2">
            <div class="mb-2 mt-2">
              <p class="text-sm italic leading-3">Nom</p>
              <p class="text-base font-semibold">{demande.famille.nom}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Téléphone</p>
              <p class="text-base font-semibold">{demande.famille.telephone}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-4">Adresse</p>
              <p class="text-base font-semibold leading-3">{demande.famille.rue}</p>
              <p class="text-base font-semibold ">
                {demande.famille.code_postal} {demande.famille.commune}
              </p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Pays</p>
              <p class="text-base font-semibold">{demande.famille.pays}</p>
            </div>
            <div>
              <p class="text-sm italic leading-3">Hébergement</p>
              <p class="text-base font-semibold">{demande.famille.hebergement}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-row flex-wrap md:flex-nowrap justify-center gap-2 items-center">
        <!-- Just in Case -->
        <!-- {#if form?.message}
          <div>
            <p class="font-grands text-accents1 text-center">{form.message}</p>
          </div>
        {/if} -->
        <h4 class="font-body font-bold text-center">Statut de la demande :</h4>
        <p id="request-status" class="font-body text-center">
          {demande.statut_demande}
        </p>
        <form
          class="w-[80%] md:w-[20%]"
          use:enhance
          method="POST"
          action="?/accept"
        >
          <button
            type="submit"
            class="bg-accents1 w-full m-3 py-2 px-4 text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Accepter
          </button>
        </form>
        <form
          class="w-[80%] md:w-[20%]"
          use:enhance
          method="POST"
          action="?/deny"
        >
          <button
            type="submit"
            class="bg-accents2-dark w-full m-3 py-2 px-4 text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Refuser
          </button>
        </form>
      </div>
    </section>
  </div>
</div>