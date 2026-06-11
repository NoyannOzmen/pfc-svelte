import prisma from "$lib/prisma";

export async function load() {
  const animals = await prisma.animal.findMany({
		include: {
			refuge: true,
			images_animal: true,
			espece: true,
		}
	});
  return {
    animals
  };
}