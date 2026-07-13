import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export const load = async ({locals}) => {
  if (!locals.user?.association || !locals.user) {
			throw redirect(302, "/");
	}

  const id = locals.user.id;

	const species = await prisma.espece.findMany({});
  const shelter = await prisma.association.findUniqueOrThrow({
    where : { utilisateur_id : id },
    include: {
      animal: {
        include : {
          espece: true,
          images_animal: true
        }
      },
      images_association: true,
      utilisateur: true
    }
  });
  return {
    shelter,
    species
  };
}