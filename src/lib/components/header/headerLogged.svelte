<script>
  function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#nav-links');

    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }

  /* 
    function logOut() {
      // ...
    } 
  */
</script>

<li class="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-4 max-[767px]:pb-2 place-self-center md:place-self-start pl-2">
<!--   
  {#if auth.user.refuge}
    <a href="/associations/profil" onclick={closeMenu} onkeydown={closeMenu}>Bonjour : {auth.user.refuge.nom}</a>
  {/if}
  {#if auth.user?.accueillant && (
    <a href="/famille/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Bonjour :{' '}
      {auth.user.accueillant.prenom
        ? `${auth.user.accueillant.prenom}`
        : `${auth.user.accueillant.nom}`}
    </a>
  {/if} 
-->
</li>
<li class="border-2 border-accents2-dark mr-0 max-[767px]:border-b-fond  md:border-r-fond px-4 pr-6 max-[767px]:pb-2 place-self-center md:place-self-start">
<!--   
  {#if auth.user.accueillant}
    <a tabIndex="0" class="hover:text-accents1-light" href="/famille/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Mon profil
    </a>
  {/if}
  {#if auth.user.refuge}
    <a tabIndex="0" class="hover:text-accents1-light" href="/associations/profil" onclick={closeMenu} onkeydown={closeMenu}>
      Tableau de&nbsp;bord
    </a>
  {/if} 
-->
</li>

<li id="log-out" class="border-2 border-accents2-dark place-self-center md:place-self-start pl-2">
  <button class="hover:text-accents1-light" /* onclick={logOut} */ onclick={closeMenu} onkeydown={closeMenu}>
    Se Déconnecter
  </button>
</li>
