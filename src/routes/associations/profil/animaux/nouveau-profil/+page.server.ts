import prisma from "$lib/prisma";
import { fail, /* redirect */ } from "@sveltejs/kit";
import type { sexe } from "../../../../../../prisma/src/generated/prisma/enums.js";
//TODO Correct this horrendous path

export async function load() {
	const species = await prisma.espece.findMany({});
	const tags = await prisma.tag.findMany({});
  return {
		species,
		tags
  };
}

export const actions = {
  createAnimal: async( {request}) => {
		// Harcoded for now
		const shelterId = 1;
    const data = await request.formData();

		//TODO Leanify names
    const nom_animal = data.get("nom_animal");
		const sexe_animal = data.get("sexe_animal");
		const age_animal = data.get("age_animal");
		const espece_animal = data.get("espece_animal");
		const race_animal = data.get("race_animal") || '';
		const couleur_animal = data.get("couleur_animal");
		const description_animal = data.get("description_animal");
    /* const tags_animal = data.get("tags_animal") || []; */

    if (!nom_animal  || !sexe_animal || !age_animal || !espece_animal || !couleur_animal || !description_animal) {
      return fail(400, { nom_animal, sexe_animal, age_animal, espece_animal, couleur_animal, description_animal, missing: true });
    }

		//TODO Add Tags back to typecheck
    if (typeof nom_animal != "string" || typeof sexe_animal != "string" || typeof age_animal != "string" || typeof espece_animal != "string" || typeof couleur_animal != "string" || typeof description_animal != "string" || typeof race_animal != "string" || '' ) {
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
						/* tags: tags_animal, */
						association_id : shelterId,
						statut: "En_refuge"
        }
    });

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