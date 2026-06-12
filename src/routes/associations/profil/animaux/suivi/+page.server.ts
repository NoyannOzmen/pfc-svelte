import prisma from "$lib/prisma";

export async function load() {
  // Hardcoded for now
  const shelterId = 1;
  const fostered = await prisma.animal.findMany({
    where : { association_id : shelterId, statut : 'Accueilli' },
		include: {
      accueillant: true,
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
    fostered
  };
}