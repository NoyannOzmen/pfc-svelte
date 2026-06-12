import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcryptjs';

export const actions = {
  default: async( {request}) => {
    const data = await request.formData();
    
    const prenom = data.get("prenom") ||'';
    const nom = data.get("nom");
    const telephone = data.get("telephone");
    const hebergement = data.get("hebergement");
    const terrain = data.get("terrain") || '';
    const rue = data.get("rue");
    const commune = data.get("commune");
    const code_postal = data.get("code_postal");
    const pays = data.get("pays");

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

    if (!nom || !telephone || !hebergement || !rue || !commune || !code_postal || !pays || !email || !mot_de_passe || !confirmation) {
      return fail(400, { nom, hebergement, rue, commune, code_postal, pays, email, mot_de_passe, confirmation, missing: true });
    }

    if (typeof prenom != "string" || '' || typeof nom != "string" || typeof telephone != "string" || typeof hebergement != "string" ||typeof terrain != "string" || '' || typeof rue != "string" || typeof commune != "string" || typeof code_postal != "string" || typeof pays != "string" || typeof email != "string" || typeof mot_de_passe != "string" || typeof confirmation != "string") {
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
            famille : {
              create: {
                prenom,
                nom,
                telephone,
                hebergement,
                terrain,
                rue,
                commune,
                code_postal,
                pays,
              }
            }
        },
        include: {
          famille: true
        }
    });

    console.log(createUser)

    throw redirect(303, "/");
    
  }
}