import prisma from "$lib/prisma";
import { writeFile } from "node:fs/promises";

export async function load() {
  // Hardcoded for now
  const id = 1;
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
  upload: async ({ request }) => {
    // Hardcoded for now
    const id = 1;

    const formData = await request.formData();
    const uploadedFile = formData?.get("file");
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