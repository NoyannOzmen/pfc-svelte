import prisma from "$lib/prisma";

export async function load({params}) {
  const id = Number(params.id);
  const animal = await prisma.animal.findUniqueOrThrow({
    where: { id : id },
		include: {
			refuge: {
        include: {
          images_association: true,
          animal: {
            include: {
              espece: true,
              refuge: true
            }
          }
        }
      },
			images_animal: true,
			espece: true,
      animal_tag: {
        select: {
          tag: true
        }
      }
		}
	});
  return {
    animal
  };
}