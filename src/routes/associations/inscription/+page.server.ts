import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcryptjs';

export const actions = {
  default: async( {request} ) => {
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
    const mot_de_passe = data.get("mot_de_passe")
    const confirmation = data.get("confirmation")

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

    if (!nom  || !responsable || !rue || !commune || !code_postal || !pays || !telephone || !siret || !email || !mot_de_passe || !confirmation) {
      return fail(400, { nom, rue, commune, code_postal, pays, telephone, siret, email, mot_de_passe, confirmation, missing: true });
    }

    if (typeof nom != "string" || typeof responsable != "string" || typeof rue != "string" || typeof commune != "string" || typeof code_postal != "string" || typeof pays != "string" || typeof telephone != "string" || typeof siret != "string" || typeof site != "string" || '' || typeof description != "string" || '' || typeof email != "string" || typeof mot_de_passe != "string" || typeof confirmation != "string") {
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

    const existing = await prisma.utilisateur.findUnique({
      where : { email : email }
    })

    if (existing) {
      return fail(400, { user: true })
    }

    if (mot_de_passe !== confirmation) {
     return { message : "Merci de vérifier que votre mot de passe est identique dans les deux champs prévus"}
    }

    const passwordHash = await bcrypt.hash(mot_de_passe, 8);

    const createUser = await prisma.utilisateur.create({
      data: {
            email,
            mot_de_passe : passwordHash,
            association : {
              create: {
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
              }
            }
        },
        include: {
          association: true
        }
    });

    console.log(createUser)

    throw redirect(303, "/");
    
  }
}