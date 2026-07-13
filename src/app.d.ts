// See https://svelte.dev/docs/kit/types#app.d.ts

import type { IUtilisateur } from "$lib/ambient";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: IUtilisateur | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
