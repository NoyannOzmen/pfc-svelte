<script lang='ts'>
	import ShelterRequestTable from "$lib/components/shelters/shelterRequestTable.svelte";

  let { data = $bindable()} = $props();
  let requested = $derived(data.requested);
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
      <ul class="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2"></ul>
    </nav>

    <section class="flex flex-wrap justify-center" id="dashboard-container">
      <h3 class="hidden md:inline font-grands text-3xl text-center my-2 pt-5 w-full">
        Gestion des demandes d'accueil
      </h3>

      <div class="container">
        <div class="row w-full text-center my-6">
          <div class="col w-full text-center my-6 flex justify-center flex-wrap">
            {#if !requested.length}
              <h4 class="w-full text-center font-grands text-2xl my-4">
                Pas de demandes d'accueil en attente
              </h4>
            {:else}
                <h4 class="w-full text-center font-grands text-2xl my-4">
                  Demandes en cours
                </h4>
                <table class="table text-center w-full md:w-5/6">
                  <thead class="border-none bg-zoning text-sm font-grands">
                    <tr>
                      <th colSpan={4} scope="colgroup">
                        Nom Animal
                      </th>
                      <th colSpan={2} scope="colgroup">
                        Nombre de demandes
                      </th>
                    </tr>
                  </thead>
                  {#each requested as animal (animal.id)}
                    <ShelterRequestTable animal={animal} />
                  {/each}
                  </table>
            {/if}
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
