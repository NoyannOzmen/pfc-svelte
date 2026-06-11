<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/icons/iconv2.png';
	import Footer from '$lib/components/footer/footer.svelte';
	import Header from '$lib/components/header/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta
		name="description"
		content="Pet Foster Connect, mise en relations entre refuges de protection animale et familles d'accueil"
	/>
	<title>Pet Foster Connect</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main class="w-screen min-h-screen h-full font-body flex flex-col bg-fond justify-self-stretch flex-1">
	{@render children()}
</main>

<Footer/>