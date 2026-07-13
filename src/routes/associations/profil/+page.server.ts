import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({locals}) => {

  if (!locals.user?.association || !locals.user) {
			throw redirect(302, "/");
	}

  const id = locals.user.id;

  const shelter = await prisma.association.findUniqueOrThrow({
    where : { utilisateur_id : id },
    include: {
      animal: true,
      images_association: true,
      utilisateur: true
    }
  });
  return {
    shelter
  };
}

export const actions = {
  update: async({request, locals}) => {
    if(!locals.user?.id) {
			return fail(400, {incorrect: true});
		}

    const id = locals.user.id;

    const data = await request.formData();
    
    const nom = data.get("nom");
    const responsable = data.get("responsable");
    const rue = data.get("rue");
    const commune = data.get("commune");
    const code_postal = data.get("code_postal");
    const pays = data.get("pays");
    const telephone = data.get("telephone");
    const siret = data.get("siret");
    const site = data.get("site") || '';
    const description = data.get("description") || '';

    const email = data.get("email");

    const validateZip = (code_postal: string) => {
        return (/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(code_postal))
    }

    const validateEmail = (email: string) => {
        return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }

    const validatePhone = (telephone: string) => {
      return (/^(0|\+33 )[1-9]([-. ]?[0-9]{2} ){3}([-. ]?[0-9]{2})|([0-9]{8})$/.test(telephone))
    }

    const validateSiret = (siret: string) => {
      return (/^(\d{14}|((\d{3}[ ]\d{3}[ ]\d{3})|\d{9})[ ]\d{5})$/.test(siret))
    }

    if (!nom  || !responsable || !rue || !commune || !code_postal || !pays || !telephone || !siret || !email) {
      return fail(400, { nom, rue, commune, code_postal, pays, telephone, siret, email, missing: true });
    }

    if (typeof nom != "string" || typeof responsable != "string" || typeof rue != "string" || typeof commune != "string" || typeof code_postal != "string" || typeof pays != "string" || typeof telephone != "string" || typeof siret != "string" || typeof site != "string" || '' || typeof description != "string" || '' || typeof email != "string") {
      return fail(400, { incorrect: true });
    }

    if (!validateZip(code_postal)) {
      return fail(400, { code_postal, incorrect: true });
    }

    if (!validateEmail(email)) {
      return fail(400, { email, incorrect: true });
    }

    if (!validatePhone(telephone)) {
      return fail(400, {telephone, incorrect: true});
    }

    if (!validateSiret(siret)) {
      return fail(400, {siret, incorrect: true})
    }

    const updateShelter = await prisma.association.update({
      where : { utilisateur_id: id },
      data: {
        nom,
        responsable,
        rue,
        commune,
        code_postal,
        pays,
        telephone,
        siret,
        site,
        description
        },
    });

    const updateUser = await prisma.utilisateur.update({
      where : { id: id },
      data: {
            email
        },
    });

    console.log(updateShelter, updateUser)

    throw redirect(303, "/associations/profil");
    
  },
  delete : async({locals}) => {

    if(!locals.user?.id) {
			return fail(400, {incorrect: true});
		}

    const id = locals.user.id;

    //TODO Add correct check for fostered animals && current requests
    const currentlyFostered = await prisma.association.findUniqueOrThrow({
      where : {
        utilisateur_id : id
      },
      include: {
        animal: true
      }
    });

    if (currentlyFostered.animal.length) {
      return { message : "Certains de vos animaux sont actuellement accueillis. Veuillez prendre contact avec l'administrateur du site avant de supprimer votre compte !"};
    } else {
      const deleteFoster = prisma.association.delete({
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