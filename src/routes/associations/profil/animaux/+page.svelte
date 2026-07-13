<script lang='ts'>
  import animalEmpty from '$lib/assets/images/animal_empty.webp';
  let { data = $bindable() } = $props();
  let species = $derived(data.species);
  let sheltered = $derived(data.shelter.animal);

  function displayDropdown() {
    const searchFilters = document.getElementById('search-filters');
    searchFilters?.classList.toggle('hidden');
    searchFilters?.classList.toggle('flex');
  }

  function filterCards(searchFlag: boolean, animalCards: NodeListOf<HTMLElement>) {
    const speciesFilter: string[] = [];
    const speciesCheckboxes = document.querySelectorAll(
      '.species-checkbox'
    ) as NodeListOf<HTMLInputElement>;
    if (speciesCheckboxes) {
      speciesCheckboxes.forEach(species => {
        if (species.checked) {
          speciesFilter.push(species.value);
        }
      });
    }

    const statutFilter: string[] = [];
    const statutCheckboxes = document.querySelectorAll(
      '.statut-checkbox'
    ) as NodeListOf<HTMLInputElement>;
    statutCheckboxes.forEach(statut => {
      if (statut.checked) {
        statutFilter.push(statut.value);
      }
    });

    const searchBar = document.getElementById('search-bar') as HTMLInputElement;

    const selectedCards = Array.from(animalCards).filter(animalCard => {
      const searchArray = [
        animalCard.dataset.nom?.toLowerCase(),
        animalCard.dataset.statut?.toLowerCase(),
        (animalCard.querySelector('.espece-nom') as HTMLParagraphElement).innerText.toLowerCase(),
      ];

      const F1 = speciesFilter.length ? speciesFilter.includes(animalCard.dataset.espece!) : true;
      const F2 = statutFilter.length ? statutFilter.includes(animalCard.dataset.statut!) : true;
      const F3 = searchArray.some(e => {
        return e!.includes(searchBar!.value.toLowerCase());
      });

      if (!searchFlag) {
        return F1 && F2;
      } else {
        return F1 && F2 && F3;
      }
    });

    return selectedCards;
  }

  function handleSearch() {
    const animalCards = document.querySelectorAll('.animal_card') as NodeListOf<HTMLElement>;
    animalCards.forEach(animalCard => {
      animalCard.classList.add('hidden');
    });
    const searchFlag = (document.getElementById('search-bar') as HTMLInputElement).value.length > 3;

    if (searchFlag) {
      const visibleCards = filterCards(searchFlag, animalCards) as Array<Element>;

      visibleCards.forEach(visibleCard => {
        visibleCard.classList.remove('hidden');
      });
    }
  }

  function handleFilters(event: MouseEvent | KeyboardEvent) {
    const filterTarget = event.target as HTMLInputElement;
    if (filterTarget.classList.contains('species-checkbox')) {
      const allSpeciesCheckbox = document.getElementById('espece_all') as HTMLInputElement;
      allSpeciesCheckbox.checked = false;
    }
    const allStatutCheckbox = document.getElementById('statut_all') as HTMLInputElement;
    if (filterTarget.classList.contains('statut-checkbox')) {
      allStatutCheckbox!.checked = false;
    }

    const animalCards = document.querySelectorAll('.animal_card') as NodeListOf<HTMLElement>;
    animalCards.forEach(animalCard => {
      animalCard.classList.add('hidden');
    });
    const searchFlag = (document.getElementById('search-bar') as HTMLInputElement).value.length > 3;

    const visibleCards = filterCards(searchFlag, animalCards);

    visibleCards.forEach(visibleCard => {
      visibleCard.classList.remove('hidden');
    });
  }
</script>


<h2 class="font-grands text-3xl text-center my-2 pt-5">Mon espace association</h2>

<div class="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
  <nav class="flex flex-wrap justify-center md:justify-start">
    <ul class="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-end md:ml-10 text-xl">
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

  <div class="flex flex-col bg-zoning rounded-lg relative">
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

    <section id="dahboard-container" class="flex flex-col justify-center content-center">
      <h3 class="text-center hidden md:inline font-grands text-4xl font-extrabold mt-4">
        Animaux
      </h3>

      <form
        autoComplete="off"
        class="my-4 px-4 flex flex-wrap gap-3 justify-center md:w-1/4 md:absolute md:top-0 md:right-5 md:my-2 md:p-0 md:pr-4 md:justify-end z-10"
      >
        <div class=" flex gap-x-1.5 text-center h-5">
          <label for="search-bar" class="hidden">Recherche</label>
          <input
            oninput={handleSearch}
            id="search-bar"
            class="bg-fond rounded-full block pl-2 md:w-32 lg:w-full shrink-0"
            type="text"
            placeholder="Rechercher"
          />
          <button
            onclick={displayDropdown} onkeydown={displayDropdown}
            id="search-dropdown-button"
            class="material-symbols-outlined bg-fond rounded-full"
          >
            arrow_drop_down
          </button>
        </div>

        <div
          id="search-filters"
          class="gap-4 hidden md:bg-fond p-4 rounded-lg border-accents2 md:border-4"
        >
          <fieldset>
              {#each species as espece (espece.id)}
                <div class="flex gap-x-1.5 content-center mb-1">
                  <input
                    onclick={handleFilters} onkeydown={handleFilters}
                    type="checkbox"
                    id={`${espece.id}`}
                    name={espece.nom}
                    value={espece.id}
                    class="species-checkbox checkbox leading-3"
                  />
                  <label
                    for={espece.nom}
                    class="font-grands font-semibold text-xs leading-3 self-center"
                  >
                    {espece.nom}
                  </label>
                </div>
              {/each}
            <div class="flex gap-x-1.5 content-center">
              <input
                type="checkbox"
                id="espece_all"
                name="espece_all"
                value="all"
                defaultChecked
                class="leading-3"
              />
              <label
                for="espece_all"
                class=" font-grands font-semibold text-xs leading-3 self-center"
              >
                Tous
              </label>
            </div>
          </fieldset>

          <fieldset>
            <div class="flex gap-x-1.5 content-center">
              <input
                onclick={handleFilters} onkeydown={handleFilters}
                type="checkbox"
                id="satut_En_refuge"
                name="satut_En_refuge"
                value="En_refuge"
                class="mb-1 statut-checkbox checkbox leading-3"
              />
              <label
                for="satut_En_refuge"
                class=" font-grands font-semibold text-xs leading-3 self-center"
              >
                En refuge
              </label>
            </div>

            <div class="flex gap-x-1.5 content-center">
              <input
                onclick={handleFilters} onkeydown={handleFilters}
                type="checkbox"
                id="satut_Accueilli"
                name="satut_Accueilli"
                value="Accueilli"
                class="mb-1 statut-checkbox checkbox leading-3"
              />
              <label
                for="satut_Accueilli"
                class=" font-grands font-semibold text-xs leading-3 self-center"
              >
                Accueilli
              </label>
            </div>

            <div class="flex gap-x-1.5 content-center">
              <input
                onclick={handleFilters} onkeydown={handleFilters}
                type="checkbox"
                id="satut_Adopté"
                name="satut_Adopté"
                value="Adopté"
                class="mb-1 statut-checkbox checkbox leading-3"
              />
              <label
                for="satut_Adopté"
                class=" font-grands font-semibold text-xs leading-3 self-center"
              >
                Adopté
              </label>
            </div>

            <div class="flex gap-x-1.5 content-center">
              <input
                onclick={handleFilters} onkeydown={handleFilters}
                type="checkbox"
                id="statut_all"
                name="statut_all"
                value="all"
                defaultChecked
                class="leading-3"
              />
              <label
                for="statut_all"
                class=" font-grands font-semibold text-xs leading-3 self-center"
              >
                Tous
              </label>
            </div>
          </fieldset>
        </div>
      </form>

      <div class=" self-center flex flex-wrap p-4 justify-center gap-3.5">
        {#each sheltered as animal (animal.id)}
          <a
            data-animalid={animal.id}
            data-nom={animal.nom}
            data-espece={animal.espece.id}
            data-statut={animal.statut}
            class="animal_card animal_card--visible flex flex-col justify-between content-center relative bg-fond rounded-xl w-36 h-36 shrink-0 md:size-60"
            href={`/associations/profil/animaux/${animal.id}`}
          >
            {#if animal.images_animal && animal.images_animal.length}
              <img
                class="rounded-t-xl"
                src={`../../src/lib/assets/${animal.images_animal[0].url}`}
                alt={`Photo de ${animal.nom}`}
              />
            {:else}
              <img class="rounded-t-xl" src={animalEmpty} alt="Bientôt visible" />
            {/if}

            <p class="text-sm text-center font-semibold md:text-base">{animal.nom}</p>
            <div class="flex flex-wrap justify-between px-2 pt-0.5">
              <div class="w-full flex justify-around content-center">
                <p class="espece-nom text-xs italic md:text-base">{animal.espece.nom}</p>
                <p class="text-xs italic md:text-base">{animal.statut}</p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>