import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({locals}) {
	if (!locals.user?.famille || !locals.user) {
			throw redirect(302, "/");
	}
	
  const id = locals.user.famille.id;

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