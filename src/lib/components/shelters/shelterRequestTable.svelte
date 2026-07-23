<script lang='ts'>
  let { animal = $bindable() } = $props();

  function handleClick(e: MouseEvent) {
    const row = e.currentTarget as HTMLTableRowElement;
    const fold = row.nextElementSibling;
    fold?.classList.toggle('hidden');

    let content = fold?.nextElementSibling;

    while (content && !content.classList.contains('font-grands')) {
      content.classList.toggle('hidden');
      content = content.nextElementSibling;
    }
  }
</script>

<tbody>
  <tr
    onclick={handleClick}
    tabindex="0"
    class="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border hover:bg-accents2-dark"
  >
    <td
      colSpan="4"
      class="px-2 pt-2 border-accents2-dark border-solid border"
    >
      {animal.nom}
    </td>
    <td
      colSpan="2"
      class="px-2 pt-2 border-accents2-dark border-solid border"
    >
      {animal.demande.length}
    </td>
  </tr>
  <tr class="fold text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border hidden">
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Famille
    </td>
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Date de demande
    </td>
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Statut
    </td>
  </tr>
  {#each animal.demande as demande, index (demande.id) }
    <tr
      class={'fold text-sm font-body font-semibold hidden ' + (index % 2 > 0 ? 'text-fond bg-accents2-light' : 'bg bg-fond') }>
      <td colSpan="2">{demande.famille.nom}</td>
      <td colSpan="2">{demande.date_debut.toLocaleDateString()}</td>
      <td colSpan="2">
        <a
          tabindex="0"
          class="hover:underline"
          href={`/associations/profil/demandes/${demande.id}`}
        >
          {demande.statut_demande}
        </a>
      </td>
    </tr>
  {/each}
</tbody>