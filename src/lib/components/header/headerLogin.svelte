<script lang="ts">
  function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#nav-links');

    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  }
</script>

<li
  id="log-in"
  class="border-2 border-accents2-dark max-[767px]:border-b-fond md:mr-4 md:border-r-fond px-8 max-[767px]:pb-2 place-self-center pl-2"
>
  <a href="/connexion" class="hover:text-accents1-light item-link" onclick={closeMenu} onkeydown={closeMenu}>
    Se Connecter
  </a>
</li>

<li id="register" class="md:mr-4 px-4 max-[767px]:pb-2 place-self-center pl-2">
  <a href="/inscription" class="hover:text-accents1-light item-link" onclick={closeMenu} onkeydown={closeMenu}>
    S'inscrire
  </a>
</li>