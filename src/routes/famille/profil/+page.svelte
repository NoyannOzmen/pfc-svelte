<script lang="ts">
  import { enhance } from "$app/forms";
  let { data = $bindable(), form } = $props();
  let famille = $derived(data.famille);

  function allowEdit(e) {
    const field = e.currentTarget?.closest('fieldset');
    const inputs = field?.querySelectorAll('input');
    const validate = document.getElementById('validate');

    if (validate && validate.classList.contains('hidden')) {
      validate.classList.toggle('hidden');
    }

    inputs?.forEach((input: HTMLInputElement) => {
      input.disabled = false;
      input.required = true;
      input.classList.add('bg-fond');
      if (input.id === 'terrain' || input.id === 'prenom') {
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

<h2 class="font-grands text-3xl text-center my-2 py-6">
  Bienvenue sur votre espace personnel
</h2>
<div class="flex flex-col content-center justify-center mx-auto mb-4 w-[80%]">
  <nav class="flex flex-wrap justify-center md:justify-start">
    <ul class="flex flex-wrap-reverse gap-x-2 mx-3 justify-center font-semibold md:justify-start md:ml-10 text-xl">
      <li>
        <a href="/famille/profil" tabindex="0">
          <button id="dashbtn-1" class="dashbtn dashbtn-active" tabindex="-1">
            Mon profil
          </button>
        </a>
      </li>
      <li>
        <a href="/famille/profil/demandes" tabindex="0">
          <button id="dashbtn-2" class="dashbtn" tabindex="-1">
            Demandes
          </button>
        </a>
      </li>
    </ul>
    <div class="mx-2 grow w-[90%] h-2 bg-accents1-dark rounded-t-lg"></div>
  </nav>

  <div class="font-body bg-zoning rounded-lg shadow mb-4">
    <section class="flex flex-wrap justify-center" id="dashboard-container">
      <h3 class="font-grands text-3xl text-center my-2 pt-5 w-full">Mon profil</h3>

      {#if form?.message}
        <div>
          <p class="font-grands text-accents1 text-center">{form.message}</p>
        </div>
      {/if}

      <form
        class="flex flex-col flex-wrap content-center justify-around text-texte w-full"
        method="POST"
        action="?/update"
        use:enhance
      >
        <fieldset class="w-[60%] font-body rounded-lg shadow my-2 py-5">
          <legend class="text-center">
            Mes informations&nbsp;
            <span tabindex="0" class="material-symbols-outlined" role="menu" onclick={allowEdit} onkeydown={allowEdit}>
              edit
            </span>
          </legend>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="prenom">
              Prénom
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="prenom"
              name="prenom"
              defaultValue={famille?.prenom == null ? '' : famille?.prenom}
              disabled
            />
          </div>
          <div class="mx-auto p-2">
            <label class="text-center w-full" for="nom">
              Nom
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="nom"
              name="nom"
              defaultValue={famille?.nom}
              disabled
            />
          </div>
          <div class="mx-auto p-2">
            <label class="text-center w-full" for="email">
              Email
            </label>
            <input
              class="block w-full bg-fond"
              type="email"
              id="email"
              name="email"
              // defaultValue={user.email}
              autoComplete="email"
              disabled
            />
          </div>
        </fieldset>

        <fieldset class="font-body rounded-lg shadow my-2 py-5">
          <legend class="text-center">
            Mon accueil&nbsp;
            <span tabindex="0" class="material-symbols-outlined" role="menu" onclick={allowEdit} onkeydown={allowEdit}>
              edit
            </span>
          </legend>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="hebergement">
              Type
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="hebergement"
              name="hebergement"
              defaultValue={famille?.hebergement}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="terrain">
              Terrain
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="terrain"
              name="terrain"
              defaultValue={famille?.terrain == null ? '' : famille?.terrain}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="rue">
              Rue
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="rue"
              name="rue"
              defaultValue={famille?.rue}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="commune">
              Commune
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="commune"
              name="commune"
              defaultValue={famille?.commune}
              disabled
            />
          </div>

          <div class="mx-auto p-2">
            <label class="text-center w-full" for="code_postal">
              Code Postal
            </label>
            <input
              class="block w-full bg-fond"
              type="text"
              id="code_postal"
              name="code_postal"
              defaultValue={famille?.code_postal}
              disabled
            />
          </div>
        </fieldset>

        <button
          id="validate"
          class="hidden w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Valider les modifications
        </button>
      </form>
      <div class="flex flex-col flex-wrap content-center justify-around text-texte">
        <button
          onclick={displayModal} onkeydown={displayModal}
          id="deleteAccount"
          class="w-[60%] mx-auto my-3 py-2 px-4 bg-accents2-dark text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Supprimer mon profil
        </button>
        <p class="text-center w-full">ATTENTION ! Cette suppression est définitive !</p>
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
