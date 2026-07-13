import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({locals}) => {
  if (!locals.user?.famille || !locals.user) {
			throw redirect(302, "/");
	}
  const id = locals.user.id;
  const famille = await prisma.famille.findUniqueOrThrow({
    where : { utilisateur_id : id },
    include: {
      animal: true,
      demande: true,
      utilisateur: true
    }
  });
  return {
    famille
  };
};

export const actions = {
  update : async( {request, locals}) => {
    if(!locals.user?.id) {
			return fail(400, {incorrect: true});
		}

    const id = locals.user.id;

    const data = await request.formData();
    
    const prenom = data.get("prenom") ||'';
    const nom = data.get("nom");
    const email = data.get("email");
    const hebergement = data.get("hebergement");
    const terrain = data.get("terrain") || '';
    const rue = data.get("rue");
    const commune = data.get("commune");
    const code_postal = data.get("code_postal");

    const validateZip = (code_postal: string) => {
        return (/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(code_postal))
    }

    const validateEmail = (email: string) => {
        return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }

    if (!nom || !email || !hebergement || !rue || !commune || !code_postal) {
      return fail(400, { nom, email, hebergement, rue, commune, code_postal, missing: true });
    }

    if (typeof prenom != "string" || '' || typeof nom != "string" || typeof email != "string" || typeof hebergement != "string" ||typeof terrain != "string" || '' || typeof rue != "string" || typeof commune != "string" || typeof code_postal != "string") {
      return fail(400, { incorrect: true });
    }

    if (!validateZip(code_postal)) {
      return fail(400, { code_postal, incorrect: true });
    }

    if (!validateEmail(email)) {
      return fail(400, { email, incorrect: true });
    }

    const updateFoster = await prisma.famille.update({
      where : { utilisateur_id: id },
      data: {
            prenom,
            nom,
            hebergement,
            terrain,
            rue,
            commune,
            code_postal
        },
    });

    const updateUser = await prisma.utilisateur.update({
      where : { id: id },
      data: {
            email
        },
    });

    console.log(updateFoster, updateUser)

    throw redirect(303, "/famille/profil");
    
  },
  delete : async({locals}) => {
    if(!locals.user?.id) {
			return fail(400, {incorrect: true});
		}

    const id = locals.user.id;

    const currentFoster = await prisma.famille.findUniqueOrThrow({
      where : {
        utilisateur_id : id
      },
      include: {
        animal: true
      }
    });

    if (currentFoster.animal.length) {
      return { message : "Vous accueillez actuellement un animal. Veuillez prendre contact avec son refuge d'origine avant de supprimer votre compte !"};
    } else {
      const deleteFoster = prisma.famille.delete({
        where: {
          utilisateur_id: id,
        },
      });

      const deleteUser = prisma.utilisateur.delete({
        where: {
          id: id,
        },
      });

      const transaction = await prisma.$transaction([deleteFoster, deleteUser]);

      console.log(transaction)

      throw redirect(303, "/");
    }
  }
}