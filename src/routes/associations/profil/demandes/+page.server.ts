import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({locals}) {

	if (!locals.user?.association || !locals.user) {
			throw redirect(302, "/");
	}

	const shelterId = locals.user.association.id;

  const requested = await prisma.animal.findMany({
    where : { association_id : shelterId, demande : { some : {}} },
		include: {
			refuge: true,
			images_animal: true,
			espece: true,
      demande: {
				include: {
					famille: true
				}
			},
			animal_tag : {
				select: {
					tag: true
				}
			}
		}
	});
  return {
    requested
  };
}