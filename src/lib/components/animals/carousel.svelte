<script lang='ts'>
  import animalEmpty from '$lib/assets/images/animal_empty.webp';
  import left from '$lib/assets/icons/left.svg';
  import right from '$lib/assets/icons/right.svg';
  let innerWidth = $state(0);

  let { data = $bindable(), animalId = $bindable(), shelterId = $bindable()} = $props();
  let animals = [...data];

  // Just in case
  // let sheltered = data.animals?.filter(({ statut }) => statut === 'En refuge');
  let sheltered = $derived(animals.filter(({ statut }) => statut === 'En_refuge'));

  if (shelterId) {
    sheltered = sheltered.filter(
      ({ association_id }) => Number(association_id) === Number(shelterId)
    );
  }

  if (animalId) {
    const baseline = sheltered.find(({ id }) => Number(id) === Number(animalId));

    sheltered = sheltered.filter(
      ({ association_id }) => Number(association_id) === Number(baseline?.association_id)
    );
  }

  let i = 0;

  function getOneNextPic() {
    const carouselPics = document.querySelectorAll('.carousel-img');
    if (i < carouselPics.length - 1) {
      carouselPics[i].classList.toggle('hidden');
      carouselPics[i + 1].classList.toggle('hidden');
      i++;
    }
  }

  function getOnePreviousPic() {
    const carouselPics = document.querySelectorAll('.carousel-img');
    if (i > 0) {
      carouselPics[i].classList.toggle('hidden');
      carouselPics[i - 1].classList.toggle('hidden');
      i--;
    }
  }

  function getThreeNextPic() {
    const carouselPics3 = document.querySelectorAll('.carousel3-img');
    if (i < carouselPics3.length - 3) {
      carouselPics3[i].classList.toggle('hidden');
      carouselPics3[i + 3].classList.toggle('hidden');
      i++;
    }
  }

  function getThreePreviousPic() {
    const carouselPics3 = document.querySelectorAll('.carousel3-img');
    if (i > 0) {
      carouselPics3[i + 2].classList.toggle('hidden');
      carouselPics3[i - 1].classList.toggle('hidden');
      i--;
    }
  }
</script>

<svelte:window bind:innerWidth={innerWidth} />

<section
  id="animal-carousel"
  class=" flex flex-row relative mx-auto w-[90%] h-auto bg-zoning rounded-lg shadow"
>
  <button
    class="absolute top-0 inset-s-0 z-1 flex items-center justify-center h-full pl-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button"
    id="previous3"
    aria-label="Précédent"
    tabIndex="0"
    onclick={innerWidth < 768 ? getOnePreviousPic : getThreePreviousPic}
    onkeydown={innerWidth < 768 ? getOnePreviousPic : getThreePreviousPic}
  >
    <img
      src={left}
      alt=""
      
    />
  </button>

  <div class="h-auto w-auto flex rounded-lg my-6 gap-4 px-8">
    {#each sheltered as animal, index (animal.id)}
      <div 
      class={
        innerWidth < 768
          ? 'carousel-img ' + (index === 0 ? '' : 'hidden')
          : 'carousel3-img place-self-center ' + (index < 3 ? '' : 'hidden')
      }
      >
        <div class="flex bg-fond rounded-lg shadow flex-row md:flex-col p-4">
          <div class="w-full md:w-full flex justify-center items-center">
            {#if animal.images_animal}
              <img
                class="object-contain w-[80%] h-48 md:h-full rounded-lg"
                src={`./src/lib/assets/${animal.images_animal[0].url}`}
                alt={`Photo de ${animal.nom}`}
              />
            {:else}
              <img
                class="object-contain w-[80%] h-48 md:h-full rounded-lg"
                src={animalEmpty}
                alt="Bientôt visible"
              />
            {/if}
          </div>

          <div class="flex-auto text-center">
            <div class="flex flex-wrap my-2">
              <h3 class="flex-auto text-xl font-semibold">{animal.nom}</h3>
              <h4 class="flex-none w-full mt-2 text-sm font-medium text-gray-500">
                {animal.espece.nom}
              </h4>
              <hr />
              <p class="flex-none w-full mt-2 text-sm font-medium text-gray-500">
                Age : {animal.age}
              </p>
              <p class="flex-none w-full mt-2 text-sm font-medium text-gray-500">
                Localisation : {animal.refuge.code_postal}
              </p>
            </div>

            <div class="flex mb-4 text-sm font-medium">
              <a
                class="py-2 px-4 bg-accents1-light text-fond w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                href={`/animaux/${animal.id}`}
              >
                Découvrir
              </a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <button
    class="absolute top-0 inset-e-0 z-1 flex items-center justify-center h-full pr-2 cursor-pointer group focus:outline-none size-10 opacity-75"
    type="button"
    id="next3"
    aria-label="Suivant"
    tabIndex="0"
    onclick={innerWidth < 768 ? getOneNextPic : getThreeNextPic}
    onkeydown={innerWidth <768 ? getOneNextPic : getThreeNextPic}
  >
    <img
      src={right}
      alt=""
    />
  </button>
</section>
