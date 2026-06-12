<script lang='ts'>
	import ShelterResidentTable from "$lib/components/shelters/shelterResidentTable.svelte";

  let { data = $bindable()} = $props();
  const fostered = $derived(data.fostered);
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
        <li class=" rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor">
          <a href="/associations/profil/animaux">Nos animaux</a>
        </li>
        <li class="dashsubbtn-active block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 ">
          <a href="/associations/profil/animaux/suivi">Suivi accueils</a>
        </li>
        <li class="block grow text-center pr-2 py-2 rounded-tr-lg hover:underline md:grow-0 md:px-4 md:rounded-none md:border-r-solid md:border-r-2 md:border-r-zoning">
          <a href="/associations/profil/animaux/nouveau-profil">Créer un profil</a>
        </li>
      </ul>
    </nav>

    <section class="flex flex-wrap justify-center" id="dashboard-container">
      <h3 class="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">
        Suivi des animaux accueillis
      </h3>

      <div class="w-full mx-4 my-6">
        <table class="text-left w-full">
          <thead>
            <tr class="border-none bg-zoning text-sm font-grands">
              <th>Nom Animal</th>
              <th>Famille d'Accueil</th>
            </tr>
          </thead>

          {#each fostered as animal (animal.id)}
            <ShelterResidentTable animal={animal} />
          {/each}
        </table>
      </div>
    </section>
  </div>
</div>