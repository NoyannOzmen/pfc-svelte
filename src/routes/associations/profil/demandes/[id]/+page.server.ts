import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";

export async function load({params, locals}) {
  if (!locals.user?.association || !locals.user) {
			throw redirect(302, "/");
	}

  const id = Number(params.id);
  
  const request = await prisma.demande.findUniqueOrThrow({
    where: { id : id },
		include: {
			animal: {
        include: {
          espece: true,
          refuge: true,
          images_animal: true,
          animal_tag: {
            include: {
              tag: true
            }
          }
        }
      },
			famille: true
		}
	});
  return {
    request
  };
}

export const actions = {
  accept: async({params}) => {
    const requestId = Number(params.id);

    const accepted = await prisma.demande.update({
      where : { id : requestId},
      data: {
        statut_demande : "Validee",
      }
      
    });

    console.log(accepted);
  },
  deny: async({params}) => {
    const requestId = Number(params.id);
    
    const denied = await prisma.demande.update({
      where : { id : requestId},
      data : {
        statut_demande : "Refusee"
      }
    });

    console.log(denied);
  }
}