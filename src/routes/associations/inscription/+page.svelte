<script lang='ts'>
  import { enhance } from "$app/forms";
  let { form } = $props();
</script>

<h2 class="font-grands text-3xl text-center my-2 pt-5">Création de votre compte</h2>

<div class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4">
  <form
    class="flex flex-col flex-wrap content-center justify-around text-texte"
    method="POST"
    use:enhance
  >
    <fieldset class="font-body rounded-lg shadow my-2 py-5">
      <legend class="font-bold text-lg font-grands text-center">Votre organisme</legend>

      {#if form?.message}
        <div>
          <p class="font-grands text-accents1 text-center">{form.message}</p>
        </div>
      {/if}

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="nom">
          Nom
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="nom"
          name="nom"
          placeholder="PetSmart"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="responsable">
          Président
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="responsable"
          name="responsable"
          placeholder="D. Recteur"
          required
        />
      </div>

      <!-- <GouvApi /> -->

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="rue">
          Rue
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="rue"
          name="rue"
          placeholder="45, rue de la Boustifaille"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="commune">
          Ville
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="commune"
          name="commune"
          placeholder="Paris"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="code_postal">
          Code Postal
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="code_postal"
          name="code_postal"
          placeholder="75020"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="pays">
          Pays
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="pays"
          name="pays"
          placeholder="France"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="telephone">
          N° telephone
        </label>
        <input
          class="block bg-fond w-full"
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="01 23 45 67 89"
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="siret">
          N° SIRET
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="siret"
          name="siret"
          placeholder="732829320 00074"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="email">
          Email
        </label>
        <input
          class="block bg-fond w-full"
          type="email"
          id="email"
          name="email"
          placeholder="chacripan@domain-expansion.io"
          autoComplete="email"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="site">
          Site Web
        </label>
        <input
          class="block bg-fond w-full"
          type="url"
          name="site"
          id="site"
          placeholder="https://exemple.com"
          size="40"
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="description">
          Description
        </label>
        <textarea
          class="block bg-fond w-full"
          rows="5"
          cols="33"
          id="description"
          name="description"
          placeholder="Une courte description de votre refuge !"
        ></textarea>
      </div>
    </fieldset>

    <fieldset class="font-body rounded-lg shadow my-2 py-5">
      <legend class="font-bold text-lg font-grands text-center">Mot de passe</legend>
      <div class="mx-auto p-2">
        <label class="text-center w-full" for="mot_de_passe">
          Créez votre mot de passe
        </label>
        <input
          class="block bg-fond w-full"
          type="password"
          id="mot_de_passe"
          name="mot_de_passe"
          placeholder="*********"
          autoComplete="new-password"
          required
        />
      </div>
      <div class="mx-auto p-2">
        <label class="text-center w-full" for="confirmation">
          Confirmez votre mot de passe
        </label>
        <input
          class="block bg-fond w-full"
          type="password"
          id="confirmation"
          name="confirmation"
          placeholder="*********"
          autoComplete="new-password"
          required
        />
      </div>
    </fieldset>

    <button
      class="w-[60%] mx-auto my-3 py-2 px-4 bg-accents1-light text-fond transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      type="submit"
    >
      Valider votre inscription
    </button>
  </form>
</div>