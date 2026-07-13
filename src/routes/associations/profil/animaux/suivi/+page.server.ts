import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({locals}) {
	if (!locals.user?.association || !locals.user) {
				throw redirect(302, "/");
		}

  const shelterId = locals.user.association.id;
	
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