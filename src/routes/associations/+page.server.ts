import prisma from "$lib/prisma";

export async function load() {
  const shelters = await prisma.association.findMany({
		include: {
			animal: true,
			images_association: true
		}
	});
	const species = await prisma.espece.findMany({});
	const tags = await prisma.tag.findMany({});
  return {
    shelters,
		species,
		tags
  };
}