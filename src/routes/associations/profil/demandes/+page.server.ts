import prisma from "$lib/prisma";

// Temp while figuring out contexts

export async function load() {
  // Hardcoded for now
  const id = 1;
  const requested = await prisma.animal.findMany({
    where : { association_id : id, demande : { some : {}} },
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