import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { sexe } from "../../../../../generated/prisma/enums.ts";
// Path is a bit hard to look at

export async function load({locals}) {
	if (!locals.user?.association|| !locals.user) {
			throw redirect(302, "/");
	}

	const species = await prisma.espece.findMany({});

	const tags = await prisma.tag.findMany({});
  return {
		species,
		tags
  };
}

export const actions = {
  createAnimal: async( {request, locals}) => {
		if(!locals.user?.association.id) {
			return fail(400, {incorrect: true});
		}
		const shelterId = locals.user.association.id;

    const data = await request.formData();

    const nom_animal = data.get("nom_animal");
		const sexe_animal = data.get("sexe_animal");
		const age_animal = data.get("age_animal");
		const espece_animal = data.get("espece_animal");
		const race_animal = data.get("race_animal") || '';
		const couleur_animal = data.get("couleur_animal");
		const description_animal = data.get("description_animal");
    const tags_animal = data.getAll("tags") || [];

    if (!nom_animal  || !sexe_animal || !age_animal || !espece_animal || !couleur_animal || !description_animal) {
      return fail(400, { nom_animal, sexe_animal, age_animal, espece_animal, couleur_animal, description_animal, missing: true });
    }

    if (typeof nom_animal != "string" || typeof sexe_animal != "string" || typeof age_animal != "string" || typeof espece_animal != "string" || typeof couleur_animal != "string" || typeof description_animal != "string" || typeof race_animal != "string" || typeof tags_animal != "object") {
      return fail(400, { incorrect: true });
    }
		
    const newAnimal = await prisma.animal.create({
      data: {
            nom : nom_animal,
						sexe: sexe_animal as sexe,
						age: Number(age_animal),
						espece_id: Number(espece_animal),
						race:	race_animal || '',
						couleur : couleur_animal,
						description: description_animal,
						association_id : shelterId,
						statut: "En_refuge"
        }
    });


		tags_animal.forEach((tag: FormDataEntryValue) => {
			assignTag(tag)
		});

				
		async function assignTag(tag : FormDataEntryValue) {
			const newAnimalTag = await prisma.animal_tag.create({
				data : {
					animal_id : newAnimal.id,
					tag_id: Number(tag)
				}
			})

			return newAnimalTag;
		};

    console.log(newAnimal)
  },
	createTag: async({request}) => {
		const data = await request.formData();
    
    const nom = data.get("tag_name");
		const description = data.get("tag_description");


    if (!nom  || !description) {
      return fail(400, { nom, description, missing: true });
    }

    if (typeof nom != "string" || typeof description != "string") {
      return fail(400, { incorrect: true });
    }

		const newTag = await prisma.tag.create({
			data : {
				nom,
				description
			}
		})

		console.log(newTag)
	}
}