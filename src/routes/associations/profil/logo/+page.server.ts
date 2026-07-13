import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";

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
  upload: async ({ request, locals }) => {
    if(!locals.user?.association.id) {
      return fail(400, {incorrect: true});
    }
    
    const id = locals.user.association.id;

    const formData = await request.formData();
    const uploadedFile = formData?.get("file") as File;
    const name = uploadedFile?.name;
    const filePath = `src/lib/assets/images/animaux/${name}`;
    await writeFile(filePath, Buffer.from(await uploadedFile?.arrayBuffer()));

    const newMedia = await prisma.media.create({
      data: {
        association_id : id,
        ordre: 1,
        url: "/images/animaux" + name
      }
    })
    console.log(newMedia);
  },
}