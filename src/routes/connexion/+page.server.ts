import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcryptjs';

export const actions = {
  login: async ({cookies, request}) => {
    const data = await request.formData();
    
    const email = data.get("email") as string;
    const mot_de_passe = data.get("mot_de_passe") as string;

    const validateEmail = (email: string) => {
      return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    }

    if (!validateEmail(email)) {
      return fail(400, { email, incorrect: true });
    }

    if ( !email || !mot_de_passe ) {
      return fail(400, { email, mot_de_passe, missing: true });
    }

    const user = await prisma.utilisateur.findUnique({
      where : { email : email },
      include: { 
        association : true,
        famille: true
      }
    })

    if (!user) {
     return { message : "Merci de vérifier que les informations entrées sont correctes"}
    }

    const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

    if (!valid) {
     return { message : "Merci de vérifier que les informations entrées sont correctes"}
    }

    // Context-sensitive JWT payload definition
    // Tentative ternary operator -> migh be hard to read

    const payload = 
      user.famille ? {
          id: user.id,
          email: user.email,
          nom: user.famille.nom,
          prenom: user.famille?.prenom ? user.famille.prenom : '',
          fosterId: user.famille.id
        } : {
          id: user.id,
          email: user.email,
          nom: user.association!.nom,
          shelterId: user.association!.id
        };

    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '1d'}
      )

    cookies.set('AuthorizationToken', `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    throw redirect(302, "/")
  },
  //TODO Delete token when user closes window without logging out
  logout: async ({cookies, locals}) => {
    cookies.delete("AuthorizationToken", { path : "/"});
    locals.user = null;
    throw  redirect(302, "/");
  }
}