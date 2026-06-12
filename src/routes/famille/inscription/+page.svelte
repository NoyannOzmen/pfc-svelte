<script lang="ts">
  import { enhance } from "$app/forms";
  let { form } = $props();
</script>

<h2 class="font-grands text-3xl text-center my-2 pt-5">Création de votre compte</h2>

<div class="font-body mx-auto w-[80%] bg-zoning rounded-lg shadow my-4 py-6">
  <form
    class="flex flex-col flex-wrap content-center justify-around text-texte"
    method="POST"
    use:enhance
  >
    {#if form?.message}
      <div>
        <p class="font-grands text-accents1 text-center">{form.message}</p>
      </div>
    {/if}

    <fieldset class="font-body rounded-lg shadow my-2 py-5">
      <legend class="font-bold text-lg font-grands text-center">Vos informations</legend>
      <div class="mx-auto p-2">
        <label class="text-center w-full" for="prenom">
          Prénom
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Charlotte"
          required
        />
      </div>
      <div class="mx-auto p-2">
        <label class="text-center w-full" for="nom">
          Nom
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="nom"
          name="nom"
          placeholder="Cripan"
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
    </fieldset>

    <fieldset class="font-body rounded-lg shadow my-2 py-5">
      <legend class="font-bold text-lg font-grands text-center">
        Votre capacité d'hébergement
      </legend>

      <!-- <GouvApi /> -->

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="hebergement">
          Type d'hébergement
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="hebergement"
          name="hebergement"
          placeholder="Maison"
          required
        />
      </div>

      <div class="mx-auto p-2">
        <label class="text-center w-full" for="terrain">
          Type de terrain
        </label>
        <input
          class="block bg-fond w-full"
          type="text"
          id="terrain"
          name="terrain"
          placeholder="Jardin de 100m²"
        />
      </div>
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
          class="block bg-fond w-full border-"
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
