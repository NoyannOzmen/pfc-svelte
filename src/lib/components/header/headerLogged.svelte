<script lang='ts'>
  function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#nav-links');

    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }

  let { user } = $props();
</script>

<li class="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
  
  {#if user.association}
    <a href="/associations/profil" onclick={closeMenu} onkeydown={closeMenu}>Bonjour : {user.association.nom}</a>
  {/if}
  {#if user.famille}
    <a href="/famille/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Bonjour :
      {user.famille.prenom
        ? `${user.famille.prenom}`
        : `${user.famille.nom}`}
    </a>
  {/if} 

</li>
<li class="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
  
  {#if user.famille}
    <a tabindex="0" class="hover:text-accents1-light" href="/famille/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Mon profil
    </a>
  {/if}
  {#if user.association}
    <a tabindex="0" class="hover:text-accents1-light" href="/associations/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Tableau de&nbsp;bord
    </a>
  {/if} 

</li>

<li id="log-out" class="border-2 border-accents2-dark place-self-center md:place-self-start pl-2">
    <form method="POST" action="/connexion?/logout">
        <button class="hover:text-accents1-light" type="submit">
          Se Déconnecter
        </button>
    </form>
</li>
