import prisma from "$lib/prisma";
import {JWT_SECRET} from '$env/static/private';
import jwt, { type JwtPayload } from 'jsonwebtoken';

interface IJwtPayload extends JwtPayload {
  id: number
}

export const handle = async ({event, resolve}) => {
  const authCookie = event.cookies.get('AuthorizationToken');

  if (authCookie) {
    const token = authCookie.split(' ')[1];
    try {
      const jwtUser = jwt.verify(token, JWT_SECRET) as IJwtPayload;
      const user = await prisma.utilisateur.findUnique({
        where: {
          id: jwtUser.id
        },
        select: {
          id: true,
          email: true,
          association: {
            select: {
              id: true,
              nom: true
            }
          },
          famille: {
            select: {
              id: true,
              nom: true,
              prenom: true
            }
          }
        }
      });
      if (user) {
        event.locals.user = user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return await resolve(event);
};