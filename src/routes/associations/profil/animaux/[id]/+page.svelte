<script lang='ts'>
  import { enhance } from "$app/forms";
  import animalEmpty from '$lib/assets/images/animal_empty.webp';
  let { data = $bindable(), /* form */ } = $props();
  let animal = $derived(data.animal);
  const url = $derived(data.animal.images_animal[0].url);
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
          <button id="dashbtn-2" class="dashbtn" tabindex="-1">
            Demandes
          </button>
        </a>
      </li>
      <li>
        <a href="/associations/profil/animaux" tabindex="0">
          <button id="dashbtn-3" class="dashbtn dashbtn-active" tabindex="-1">
            Animaux
          </button>
        </a>
      </li>
    </ul>
    <div class="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
  </nav>

  <div class="flex flex-col bg-zoning rounded-lg">
    <nav class="rounded-lg">
      <ul class="rounded-t-lg flex bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start md:pl-8">
        <li class="dashsubbtn-active rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor">
          <a href="/associations/profil/animaux">Nos animaux</a>
        </li>
        <li class="block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4">
          <a href="/associations/profil/animaux/suivi">Suivi accueils</a>
        </li>
        <li class="block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning">
          <a href="/associations/profil/animaux/nouveau-profil">Créer un profil</a>
        </li>
      </ul>
    </nav>

    <section
      id="dahboard-container"
      class="flex justify-center flex-wrap gap-x-6 gap-y-4 p-6"
    >

      <div class="w-60 md:w-auto">
        <h3 class="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">
          Fiche de suivi d'un animal
        </h3>
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
              {#each animal.animal_tag as tag (tag.tag.id)}
                <p class="group rounded-full block bg-accents1 text-fond text-center text-xs font-semibold py-1 px-2">
                  {tag.tag.nom}
                  <span class="group-hover:block hidden z-10 bg-accents2-dark text-fond absolute px-2 py-2 text-xs rounded-b-xl rounded-tr-xl">
                    {tag.tag.description}
                  </span>
                </p>
              {/each}
          </div>
        {/if}

        <div class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
          <form
            method="POST"
            action="?/upload"
            enctype="multipart/form-data"
            use:enhance
          >
            <!-- {#if form?.message}
              <div>
                <p class="font-grands text-accents1 text-center">{form.message}</p>
              </div>
            {/if} -->
            <div class="flex flex-col">
              <label for="file">Importer une image</label>
              <input
                id="file"
                type="file"
                name="file"
                accept=".png,.jpg,.jpeg,.webp"
                required
              />
            </div>
            <div class="w-full">
              <input
                type="submit"
                value="Importer"
                class="hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-xs py-0.5 px-4"
              />
            </div>
          </form>
        </div>
      </div>

      {#if animal.accueillant}
        <div class="w-60 md:w-auto">
          <h3 class="font-body font-bold mb-4">Famille d'accueil</h3>

          <div class="px-6 mb-3 md:grid-cols-2 md:grid md:max-w-96">
            <div class="mb-2 mt-2">
              <p class="text-sm italic leading-3">Nom</p>
              <p class="text-sm font-semibold">{animal.accueillant.nom}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Téléphone</p>
              <p class="text-sm font-semibold">{animal.accueillant.telephone}</p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-4">Adresse</p>
              <p class="text-sm font-semibold leading-3">{animal.accueillant.rue}</p>
              <p class="text-sm font-semibold ">
                {animal.accueillant.code_postal} {animal.accueillant.commune}
              </p>
            </div>
            <div class="mb-2">
              <p class="text-sm italic leading-3">Pays</p>
              <p class="text-sm font-semibold">{animal.accueillant.pays}</p>
            </div>
            <div>
              <p class="text-sm italic leading-3">Hébergement</p>
              <p class="text-sm font-semibold">{animal.accueillant.hebergement}</p>
            </div>
          </div>
        </div>
      {/if}

      {#if animal.demande.length}
        <div class="px-4">
          <h3 class="font-body font-bold mb-4">Historique des demandes d'accueil</h3>

          <table class="mb-3 rounded-b-lg rounded-lg border-separate ">
            <thead class=" text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border">
              <tr>
                <th class="px-2 pt-2  border-accents2-light border-solid border text-center">
                  Famille
                </th>
                <th class="px-2 pt-2  border-accents2-light border-solid border text-center">
                  Date de demande
                </th>
                <th class="px-2 pt-2  border-accents2-light border-solid border text-center">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody class="rounded-lg border-separate ">
                {#each animal.demande as demande (demande.id)}
                  <tr class="odd:bg-accents2-light even:bg-fond odd:text-fond text-sm font-body font-semibold p-4 rounded-lg">
                    <td class="text-center p-2 rounded-lg ">{demande.famille.nom}</td>
                    <td class="text-center p-2 rounded-lg ">{demande.date_debut}</td>
                    <td class="text-center p-2 rounded-lg hover:underline">
                      <a href={`/associations/profil/demandes/${demande.id}`}>
                        {demande.statut_demande}
                      </a>
                    </td>
                  </tr>
                {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </section>
  </div>
</div>