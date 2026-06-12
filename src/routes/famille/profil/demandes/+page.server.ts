import prisma from "$lib/prisma";

export async function load() {
  // Hardcoded for now
  const id = 2;
  const animals = await prisma.animal.findMany({
    where: { demande: { some: { famille_id: { equals: id } } } },
		include: {
      demande: true,
			refuge: true,
			images_animal: true,
			espece: true,
			animal_tag : {
				select: {
					tag: true
				}
			}
		}
	});
  return {
    animals
  };
}