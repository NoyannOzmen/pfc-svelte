
<script lang='ts'>
  import { enhance } from "$app/forms";
  let { data = $bindable(), form } = $props();
  let shelter = $derived(data.shelter);

  function allowEdit(e) {
    const field = e.currentTarget.closest('fieldset');
    const inputs = field?.querySelectorAll('input');
    const validate = document.getElementById('validateBtn');
    const area = field?.querySelector('textarea');

    if (validate && validate.classList.contains('hidden')) {
      validate.classList.toggle('hidden');
    }

    if (area) {
      area.disabled = false;
      area.required = false;
      area.classList.add('bg-fond');
    }

    inputs?.forEach((input: HTMLInputElement) => {
      input.disabled = false;
      input.required = true;
      input.classList.add('bg-fond');
      if (input.id === 'site' || input.id === 'description') {
        input.required = false;
      }
    });
  }

  function displayModal() {
    const addTagModal = document.getElementById('delete-account-modal');
    addTagModal?.classList.toggle('hidden');
    addTagModal?.classList.toggle('flex');
  }
</script>


<h2 class="font-grands text-3xl text-center my-2 pt-5">
  Bienvenue sur votre espace personnel
</h2>
<div class="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
  <nav class="flex flex-wrap justify-center md:justify-start">
    <ul class="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
      <li>
        <a href="/associations/profil" tabindex="0">
          <button id="dashbtn-1" class="dashbtn dashbtn-active" tabindex="-1">
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
          <button id="dashbtn-3" class="dashbtn" tabindex="-1">
            Animaux
          </button>
        </a>
      </li>
    </ul>
    <div class="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
  </nav>

  <div class="font-body bg-zoning rounded-lg shadow mb-4">
    <nav class="rounded-lg h-9">
      <ul class="rounded-t-lg flex h-9 content-center bg-accents2 justify-stretch font-semibold text-fond text-sm md:justify-start pl-2">
        <li class="dashsubbtn-active rounded-tl-lg block grow text-center pl-2 border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4 md:rounded-none md:border-l-2 md:border-l-zoning bor">
          <a href="/associations/profil/">Mes informations</a>
        </li>
        <li class="block grow text-center border-r-solid border-r-2 border-r-zoning py-2 hover:underline md:grow-0 md:px-4">
          <a href="/associations/profil/logo">Ajouter une image</a>
        </li>
      </ul>
    </nav>

    <section class="flex flex-wrap justify-center" id="dashboard-container">
      <h3 class="font-grands text-3xl text-center my-2 pt-5 w-full">Mon profil</h3>
      
      {#if form?.message}
        <div>
          <p class="font-grands text-accents1 text-center">{form.message}</p>
        </div>
      {/if}

      <form
        class="flex flex-col flex-wrap content-center justify-center text-texte w-full"
        method="POST"
        action="?/update"
        use:enhance
      >
        <fieldset class="shrink font-body rounded-lg shadow my-2 py-5 w-[60%]">
          <legend class="text-center">
            Mon organisme&nbsp;
            <span tabindex="0" class="material-symbols-outlined" role="menu" onclick={allowEdit} onkeydown={allowEdit}>
              edit
            </span>
          </legend>

          <div class="mx-auto p-2">
            <label class="text-center" for="nom">
              Nom
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="nom"
              name="nom"
              defaultValue={shelter?.nom}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="responsable">
              Président
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="responsable"
              name="responsable"
              defaultValue={shelter?.responsable}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="rue">
              Rue
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="rue"
              name="rue"
              defaultValue={shelter?.rue}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="commune">
              Commune
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="commune"
              name="commune"
              defaultValue={shelter?.commune}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="code_postal">
              Code Postal
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="code_postal"
              name="code_postal"
              defaultValue={shelter?.code_postal}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="pays">
              Pays
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="pays"
              name="pays"
              defaultValue={shelter?.pays}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="telephone">
              N° Téléphone
            </label>
            <input
              class="block w-full bg-fond"
              type="tel"
              id="telephone"
              name="telephone"
              defaultValue={shelter?.telephone}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center" for="siret">
              N° SIRET
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="siret"
              name="siret"
              defaultValue={shelter?.siret}
              disabled
            />
          </div>

          <div class="mx-auto p-2 flex flex-wrap">
            <label class="w-full" for="site">
              Site Web
            </label>
            <input
              class="w-full bg-fond"
              type="url"
              name="site"
              id="site"
              defaultValue={shelter?.site == null ? '' : shelter?.site}
              pattern="https://.*"
              disabled
            />
          </div>

          <div class="flex flex-wrap mx-auto p-2">
            <label class="place-items-start pr-1 w-full" for="description">
              Description
            </label>
            <textarea
              rows="5"
              class="w-full bg-fond"
              name="description"
              id="description"
              defaultValue={shelter?.description == null ? '' : shelter?.description}
              disabled
            ></textarea>
          </div>
        </fieldset>

        <button
          id="validateBtn"
          class="hidden md:w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Valider les modifications
        </button>
      </form>
    </section>
    <section class="flex flex-wrap justify-center">
      <div class="flex flex-col flex-wrap content-center justify-around text-texte">
        <button
          onclick={displayModal} onkeydown={displayModal}
          id="deleteAccount"
          class="w-full md:w-[60%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Supprimer mon profil
        </button>
        <p class="text-center">ATTENTION ! Cette suppression est définitive !</p>
      </div>
    </section>
  </div>
</div>

<div
  id="delete-account-modal"
  class="hidden justify-center content-center fixed bg-texte/20 inset-0"
>
  <div class="self-center bg-zoning p-6 rounded-lg">
    <div class="flex justify-between">
      <h3 class="font-grands text-lg font-extrabold mb-4">Supprimer votre compte</h3>
      <button
        role="dialog"
        tabindex="0"
        onclick={displayModal} onkeydown={displayModal}
        class="cancel material-symbols-outlined text-texte cursor-pointer"
      >
        close
      </button>
    </div>
    <form
      id="delete-container"
      class=""
      method="POST"
      action="?/delete"
      use:enhance
    >
      <div class="mb-2">
        <p class="block text-texte font-grands font-bold text-base">
          ATTENTION ! <br /> Êtes-vous sûrs et certains de vouloir supprimer votre compte ?
          <br /> Cette suppression est définitive !
        </p>
      </div>
      <div>
        <input
          tabindex="0"
          onclick={displayModal} onkeydown={displayModal}
          class="cursor-pointer hover:bg-accents1-dark rounded-full hover:underline bg-accents1 text-center font-grands text-fond font-semibold text-base py-1 px-4"
          type="submit"
          value="Valider"
        />
        <button
          role="dialog"
          tabindex="0"
          onclick={displayModal} onkeydown={displayModal}
          class="hover:bg-accents2-dark rounded-full hover:underline bg-accents2-dark text-center font-grands text-fond font-semibold text-base py-1 px-4 cancel"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</div>
