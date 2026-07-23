<script lang='ts'>
  import DptSelect from '$lib/components/animals/dptSelect.svelte';
  import AnimalCard from '$lib/components/animals/animalCard.svelte';
	import type { animal } from '../../generated/prisma/client.js';

  let { data = $bindable()} = $props();

  let sheltered = $state(data.animals.filter(({ statut }) => statut as string === 'En_refuge'));
  let filtered = $derived(sheltered);

  let sexe: string | undefined = $state();
  let tag : string[] = [];

  function handleCheck(e: Event) {
    const { value, checked } = e.target as HTMLInputElement;
    if (checked) {
      tag = [...tag, value];
    } else {
      tag = tag.filter((e: string) => e !== value);
    }
  }

  function deploySearch() {
    resetSearch()
    const shortSearch = document.getElementById('fullSearch');
    shortSearch?.classList.toggle('hidden');

    const filters = document.getElementById('searchCriterias');
    filters?.classList.toggle('hidden');
    filters?.classList.toggle('grid');
  }

  function resetSearch() {
    const especeDropdownSmall = document.getElementById('espece-dropdown-small') as HTMLInputElement;
    const especeDropdownFull = document.getElementById('espece-dropdown-full') as HTMLInputElement;
    const minAge = document.getElementById('age-min') as HTMLInputElement;
    const maxAge = document.getElementById('age-max') as HTMLInputElement;
    const dptSelect = document.getElementById('dpt-select') as HTMLSelectElement;

    const sexes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="sexe"]');
    const tagSelect: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="tag"]');

    minAge.value = '';
    maxAge.value = '';
    dptSelect.value = 'default';
    especeDropdownFull.value = 'defaultFull';
    especeDropdownSmall.value = 'defaultSmall';

    sexes.forEach(radio => {
      if (radio.checked) {
        radio.checked = !radio.checked;
      }
    });

    tagSelect.forEach(tag => {
      if (tag.checked) {
        tag.checked = !tag.checked;
      }
    });
    sheltered = data.animals.filter(({ statut }) => statut as string === 'En_refuge');
  }

  function filterResultsSmall(event:  MouseEvent) {
    event?.preventDefault();
    filtered = sheltered;
    const especeDropdownSmall = document.getElementById(
      'espece-dropdown-small'
    ) as HTMLInputElement;

    if (especeDropdownSmall.value !== 'defaultSmall') {
      filtered = sheltered.filter(animal =>
        animal?.espece.nom.toLowerCase().includes(especeDropdownSmall.value.toLowerCase())
      );

      sheltered = filtered;
    } else {
      sheltered = sheltered
    }
  }

  function filterResultsFull(event: MouseEvent) {
    event?.preventDefault();
    filtered = sheltered;

    const especeDropdownFull = document.getElementById('espece-dropdown-full') as HTMLInputElement;
    const minAge = document.getElementById('age-min') as HTMLInputElement;
    const maxAge = document.getElementById('age-max') as HTMLInputElement;
    const dptSelect = document.getElementById('dpt-select') as HTMLSelectElement;

    if (especeDropdownFull.value !== 'defaultFull') {
      filtered = filtered.filter(animal =>
        animal.espece.nom.toLowerCase().includes(especeDropdownFull.value.toLowerCase())
      );
    }

    if (sexe) {
      filtered = filtered.filter(animal => animal.sexe.toLowerCase() === sexe?.toLowerCase());
    }

    if (dptSelect.value !== 'default') {
      filtered = filtered.filter(animal => animal.refuge.code_postal.startsWith(dptSelect.value));
    }

    if (minAge.value) {
      filtered = filtered.filter(animal => animal.age > Number(minAge.value));
    }

    if (maxAge.value) {
      filtered = filtered.filter(animal => animal.age < Number(maxAge.value));
    }

    if (tag.length > 0) {
      let tagFilteringArray: animal[] = [];

      filtered.forEach(animal => {
        tag.forEach(identification => {
          const found = animal.animal_tag.some(tag => tag.tag.nom === identification);
  
          if (!found && !tagFilteringArray.includes(animal)) {
            tagFilteringArray.push(animal);
          }
          if (found && tagFilteringArray.includes(animal)) {
            tagFilteringArray = tagFilteringArray.filter((a) => a !== animal);
          }          
        })
      });
      filtered = tagFilteringArray as typeof filtered;
    }

    sheltered = filtered
  }
  
</script>

<div class="md:my-3 flex flex-wrap font-body w-full bg-zoning rounded-lg shadow justify-around">
  <form class="text-texte justify-around">
    <div
      id="fullSearch"
      class="mx-2 col-span-3 items-center flex flex-wrap justify-around"
    >
      <h2 class="font-grands text-2xl w-full my-2 text-center">Rechercher un animal</h2>
      <label for="espece-dropdown-small">Par espèce</label>
      <select
        tabindex="0"
        class="col-span-3 text-xs block w-[50%] bg-fond"
        id="espece-dropdown-small"
        name="especeDropdownSmall"
        value="defaultSmall"
      >
        <option value="defaultSmall" disabled hidden>
          --Choisissez une espèce--
        </option>
        {#each data.species as espece (espece.id)}
          <option value={espece.nom}>
            {espece.nom}
          </option>
        {/each}
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
        Rechercher un animal
      </h3>

      <div class="col-span-1 mx-auto">
        <h4>Caractéristiques</h4>

        <div class="my-2">
          <label for="espece-dropdown-full">Espèce</label>
          <select
            tabindex="0"
            class="text-xs block bg-fond"
            id="espece-dropdown-full"
            name="especeDropdownFull"
            value="defaultFull"
          >
            <option value="defaultFull" disabled hidden>
              --Choisissez une espèce--
            </option>
            {#each data.species as espece (espece.id)}
              <option value={espece.nom}>
                {espece.nom}
              </option>
            {/each}
          </select>
        </div>

        <div class="my-2">
          <fieldset id="sexe">
            <legend>Sexe</legend>
            <label>
              <input type="radio" name="sexe" value="Mâle" class="mx-1" bind:group={sexe}/>
              Mâle
            </label>
            <label>
              <input type="radio" name="sexe" value="Femelle" class="mx-1" bind:group={sexe}/>
              Femelle
            </label>
            <label>
              <input type="radio" name="sexe" value="Inconnu" class="mx-1" bind:group={sexe}/>
              Inconnu
            </label>
          </fieldset>
        </div>

        <div class="my-2 flex flex-row">
          <p>Age :</p>
          <label for="age-min">De&nbsp;</label>
          <input id="age-min" class="bg-fond" name="minAge" type="number" tabindex="0" min="0" max="3999" />
          <label for="age-max">&nbsp;à&nbsp;</label>
          <input id="age-max" class="bg-fond" name="maxAge" type="number" tabindex="0" min="1" max="4000" />
          <p>&nbsp;ans.</p>
        </div>
      </div>

      <div class="col-span-1">
        <p>Exclure si :</p>
        {#each data.tags as tag (tag.id)}
          <div>
            <label for={`${tag.nom}`}>{tag.nom}</label>
            <input type="checkbox" name="tag" id={tag.nom} value={tag.nom} onchange={handleCheck} />
          </div>
        {/each}
      </div>

      <div class="col-span-1">
        <div class="my-2">
          <label for="dpt-select">Département</label>
          <select
            tabindex="0"
            class="text-xs block bg-fond"
            id="dpt-select"
            name="dptSelect"
            value="default"
          >
            <DptSelect />
          </select>
        </div>
      </div>

      <input
        tabindex="0"
        onclick={filterResultsFull}
        class="col-span-3 w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        type="button"
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

{#if sheltered.length}
  <div class="grid grid-flow-row-dense grid-cols-3 gap-3 m-3">
    {#each sheltered as animal (animal.id)}
    <AnimalCard animal={animal} />
    {/each}
  </div>
{:else}
  <h3 class="font-grands text-2xl w-full my-2 text-center">
    Aucun animal ne correspond à votre recherche
  </h3>
{/if}
