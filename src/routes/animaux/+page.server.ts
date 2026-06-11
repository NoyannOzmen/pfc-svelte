import prisma from "$lib/prisma";

export async function load() {
  const animals = await prisma.animal.findMany({
		include: {
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
	const species = await prisma.espece.findMany({});
	const tags = await prisma.tag.findMany({});
  return {
    animals,
		species,
		tags
  };
}