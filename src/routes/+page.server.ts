import prisma from "$lib/prisma";

export async function load({locals}) {

  const animals = await prisma.animal.findMany({
		include: {
			refuge: true,
			images_animal: true,
			espece: true,
		}
	});
  return {
		user : locals.user,
    animals
  };
}