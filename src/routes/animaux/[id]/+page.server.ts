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

export const actions = {
  default: async({params}) => {
    // Hardcoded for now
    const fosterId = 1;
    const animalId = Number(params.id);

    //TODO Fix formatting of Date
    const now = new Date();
    const date_debut = now/* .toLocaleDateString() */;
    const date_fin = new Date(now.getTime() + (1000 * 60 * 60 * 24 * 30))/* .toLocaleDateString() */;

    const existing = await prisma.demande.findFirst({
      where : { animal_id : animalId, famille_id : fosterId}
    })

    if (existing) {
      return { message : "Vous avez déjà effectué une demande pour cet animal !"}
    }

    const newRequest = await prisma.demande.create({
      data: {
            date_debut,
            date_fin,
            animal_id : animalId,
            famille_id : fosterId,
            statut_demande : "En_attente"
        }
    });

    console.log(newRequest)

    return { message : "Votre demande a bien été prise en compte ! Merci !"}
  }
}