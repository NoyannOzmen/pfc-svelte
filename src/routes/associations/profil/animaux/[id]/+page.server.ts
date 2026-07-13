import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import { writeFile } from "node:fs/promises";

export async function load({params, locals}) {
  if (!locals.user?.association || !locals.user) {
      throw redirect(302, "/");
  }
  const id = Number(params.id);
  const animal = await prisma.animal.findUniqueOrThrow({
    where: { id : id },
		include: {
      accueillant: true,
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
      demande: {
        include: {
          famille: true
        }
      },
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
  upload: async ({ request, params }) => {
    const id = Number(params.id);

    const formData = await request.formData();
    const uploadedFile = formData?.get("file") as File;
    const name = uploadedFile?.name;
    const filePath = `src/lib/assets/images/animaux/${name}`;
    await writeFile(filePath, Buffer.from(await uploadedFile?.arrayBuffer()));


    const newMedia = await prisma.media.create({
      data: {
        animal_id : id,
        ordre: 1,
        url: "/images/animaux" + name
      }
    })
    console.log(newMedia);
  },
}