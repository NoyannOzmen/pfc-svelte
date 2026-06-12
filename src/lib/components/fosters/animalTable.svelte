<script lang='ts'>
 let { animal } = $props();

 function handleClick(e: MouseEvent) {
    const fold = e.currentTarget?.nextElementSibling;
    fold?.classList.toggle('hidden');

    const content = fold?.nextElementSibling;
    content?.classList.toggle('hidden');
  }

</script>

<tbody>
  <tr
    onclick={handleClick}
    tabindex="0"
    class="view text-fond text-sm bg-accents2 font-grands font-semibold p-3 border-accents2-dark border-solid border hover:bg-accents2-dark"
  >
    <td
      colSpan="3"
      class="px-2 pt-2  border-accents2-dark border-solid border"
    >
      {animal.nom}
    </td>
    <td
      colSpan="3"
      class="px-2 pt-2  border-accents2-dark border-solid border"
    >
      Demande
    </td>
  </tr>
  <tr class="text-fond text-sm bg-accents2-light font-grands font-semibold p-3 border-accents2-dark border-solid border hidden">
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Refuge
    </td>
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Date de demande
    </td>
    <td colSpan="2" class="px-2 pt-2  border-accents2-light border-solid border">
      Statut
    </td>
  </tr>
  <tr class="text-sm font-body font-semibold bg bg-fond hidden">
    <td colSpan="2">{animal.refuge.nom}</td>
    <td colSpan="2">{animal.demande[0].date_debut}</td>
    <td colSpan="2">{animal.demande[0].statut_demande}</td>
  </tr>
</tbody>
