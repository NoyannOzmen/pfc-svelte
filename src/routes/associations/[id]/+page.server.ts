import prisma from "$lib/prisma";

export async function load({params}) {
  const id = Number(params.id);
  const shelter = await prisma.association.findUniqueOrThrow({
    where: { id : id },
		include: {
			animal: {
        include: {
          espece: true,
          refuge: true
        }
      },
			images_association: true
		}
	});
  return {
    shelter
  };
}