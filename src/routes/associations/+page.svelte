<script lang='ts'>
  import DptSelect from '$lib/components/animals/dptSelect.svelte';
  import ShelterCard from '$lib/components/shelters/shelterCard.svelte';
  let { data = $bindable()} = $props();

  // Displays only shelters with animals up for adoption
  // Deactivated for now, since there would be only one
  /* let shelters = $state(data.shelters.filter(({ pensionnaires }) => pensionnaires.some(({ statut }) => statut === "En refuge"))) */

  let shelters = $state(data.shelters);
  let filtered =  $derived(shelters);

  let espece : string[] = []

  function handleCheck(e : Event) {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked) {
      espece = [...espece, value];
    } else {
      espece = espece.filter(e => e !== value);
    }
  }

  function filterResultsSmall(event: MouseEvent) {
    event?.preventDefault();
    filtered = shelters;
    const dptSelectSmall = document.getElementById('dpt-select-small') as HTMLInputElement;

    if (dptSelectSmall.value !== 'default') {
      filtered = shelters.filter(shelter =>
        shelter?.code_postal.toLowerCase().startsWith(dptSelectSmall.value.toLowerCase())
      );

      shelters = filtered;
    } else {
      shelters = shelters;
    }
  }

  function filterResultsFull(event: MouseEvent) {
    event?.preventDefault();
    filtered = shelters;

    const dptSelectFull = document.getElementById('dpt-select-full') as HTMLInputElement;
    const shelterNom = document.getElementById('shelter-nom') as HTMLSelectElement;

    if (dptSelectFull.value !== 'default') {
      filtered = filtered.filter(shelter =>
        shelter.code_postal.toLowerCase().startsWith(dptSelectFull.value.toLowerCase())
      );
    }

    if (shelterNom.value) {
      filtered = filtered.filter(shelter =>
        shelter.nom.toLowerCase().includes(shelterNom.value.toLowerCase())
      );
    }
    //TODO Fix this
    /* if (espece.length > 0) {
      let filteringArray = [];

      filtered.forEach(shelter =>
        espece.forEach(identification => {
          const found = shelter.pensionnaires.find(animal => animal.espece.nom === identification);

          if (found && !filteringArray.includes(shelter)) {
            filteringArray.push(shelter);
          }
          if (!found && filteringArray.includes(shelter)) {
            filteringArray = filteringArray.filter((a: IAssociation) => a !== shelter);
          }
        })
      );
      filtered = filteringArray;
    } */

    shelters = filtered;
  }

  function deploySearch() {
    const shortSearch = document.getElementById('fullSearch');
    shortSearch?.classList.toggle('hidden');

    const filters = document.getElementById('searchCriterias');
    filters?.classList.toggle('hidden');
    filters?.classList.toggle('grid');
  }

  function resetSearch() {
    const dptSelectSmall = document.getElementById('dpt-select-small') as HTMLInputElement;
    const dptSelectFull = document.getElementById('dpt-select-full') as HTMLInputElement;
    const shelterNom = document.getElementById('shelter-nom') as HTMLSelectElement;
    const animalSelect: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="espece"]');

    shelterNom.value = '';
    dptSelectFull.value = 'default';
    dptSelectSmall.value = 'default';

    animalSelect.forEach(radio => {
      if (radio.checked) {
        radio.checked = !radio.checked;
      }
    });
    shelters = data.shelters;
  }
</script>

<div class="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow justify-around">
  <form class="text-texte justify-around">
    <div
      id="fullSearch"
      class="mx-2 col-span-3 items-center flex flex-wrap justify-around"
    >
      <h2 class="font-grands text-2xl w-full my-2 text-center">
        Rechercher une association
      </h2>
      <label for="dpt-select-small">Par département</label>
      <select
        tabindex="0"
        class="col-span-3 text-xs block w-[50%] bg-fond"
        id="dpt-select-small"
        name="dptSelectSmall"
        value="default"
      >
        <DptSelect />
      </select>
      <input
        tabindex="0"
        onclick={deploySearch}
        id="deploy"
        class="w-[20%] col-span-1 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        type="button"
        value="Filtres"
      />
      <input
        tabindex="0"
        onclick={filterResultsSmall}
        class="w-1/3 col-span-1 mx-auto my-3 py-2 px-2 bg-accents1-light text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        type="button"
        value="Rechercher"
      />
      <div class="w-full mx-auto flex justify-center">
        <input
          tabindex="0"
          onclick={resetSearch}
          class="w-[20%] self-center col-span-3 my-1 py-2 px-2 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="button"
          value="Réinitialiser"
        />
      </div>
    </div>

    <div id="searchCriterias" class="hidden grid-cols-3 gap-1 mx-auto my-3 text-texte">
      <h3 class="col-span-3 font-grands text-3xl text-center my-2">
        Rechercher une association
      </h3>
      <div class="col-span-1 mx-auto">
        <fieldset class="mx-auto p-2 my-2">

          <label for="shelter-nom">Nom du refuge</label>
          <input
            class="text-xs block bg-fond"
            type="text"
            id="shelter-nom"
            name="shelterNom"
            placeholder="--Entrez un nom--"
          />
        </fieldset>
      </div>

      <div class="col-span-1">
        <fieldset class="mx-auto p-2 my-2">
          <legend>Animaux</legend>
          {#each data.species as espece (espece.id)}
            <div>
              <label for={`${espece.nom}`}>{espece.nom}</label>
              <input
                onchange={handleCheck}
                type="checkbox"
                name="espece"
                id={espece.nom}
                value={espece.nom}
              />
            </div>
          {/each}
        </fieldset>
      </div>

      <div class="col-span-1">
        <fieldset class="mx-auto p-2 my-2">
          <label for="dpt-select-full">Département</label>
          <select
            tabindex="0"
            class="text-xs block bg-fond"
            id="dpt-select-full"
            name="dptSelectFull"
            value="default"
          >
            <DptSelect />
          </select>
        </fieldset>
      </div>

      <input
        tabindex="0"
        onclick={filterResultsFull}
        class="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        type="submit"
        value="Rechercher"
      />
      <input
        tabindex="0"
        onclick={resetSearch}
        class="col-span-3 w-[40%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        type="button"
        value="Réinitialiser"
      />
    </div>
  </form>
</div>

<div class="flex flex-wrap content-center justify-around my-8">
  <section class="mx-auto w-[80%]">
    <h2 class="font-grands text-3xl text-center my-2">Nos partenaires</h2>
    <p class="mx-auto text-l font-body text-center">
      Pet Foster Connect a l'honneur de travailler main dans la main avec des refuges et
      associations de protection animale sur tout le territoire Français.
      <br />
      Retrouvez-les toutes ci-dessous. Vous pouvez également faire une recherche pour trouver
      les plus proches de chez vous !
    </p>
  </section>
</div>

{#if shelters.length}
  <div class="grid grid-cols-3 gap-3 m-3">
    {#each shelters as shelter (shelter.id)}
      <ShelterCard shelter={shelter} />
    {/each}
  </div>
{:else}
  <h3 class="font-grands text-2xl w-full my-2 text-center">
    Aucun refuge ne correspond à votre recherche
  </h3>
{/if}