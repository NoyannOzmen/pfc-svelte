import prisma from "$lib/prisma";

export async function load() {
  // Hardcoded for now
  const id = 1;
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