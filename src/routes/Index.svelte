<script>
	import Nav from "../components/Nav.svelte";
	import Footer from "../components/Footer.svelte";

	const QUERY = `
		query {
			books {
				authors {
					name
				}
				cover {
					medium
				}
				title
				url
			}
		}
	`;
	const QUERYRES = {};
	console.log(QUERYRES.books);

	const joinAuthorNames = (arr) => {
		return arr.map((author) => author.name).join(", ");
	}
</script>

<svelte:head>
	<title>Reading List - Example JungleJS App</title>
</svelte:head>

<Nav page="/"/>
<main class="p-4 mx-auto max-w-3xl lg:max-w-5xl">
	<h1 class="text-green-500 font-bold mb-6 text-4xl md:text-6xl">My Reading List</h1>
	<section class="now-container grid">
		<h2 class="now-title font-bold">now reading ↴</h2>
		{#each QUERYRES.books as {authors, cover, subtitle, title, url}}
			<article class="p:2 sm:p-6">
				<img src={cover.medium} alt="" width="180" height="270" class="book-cover rounded-lg shadow-md w-full object-cover" />
				<div class="mt-4">
					<h3 class="font-bold text-md mb-1 leading-tight">{`${title}${subtitle ? `: ${subtitle}` : ''}`}</h3>
					<span class="text-gray-600 text-sm">
						{joinAuthorNames(authors)}
					</span>
				</div>
			</article>
		{:else}
			<p>Not reading any books</p>
		{/each}
	</section>
</main>
<Footer />

<style>
	.now-container {
		--book-min-width: calc(8rem + 8vw);
		grid-template-columns: repeat(auto-fit, minmax(var(--book-min-width), 1fr));
	}
	@media (min-width: 768px) {
		.now-container {
			--book-min-width: 14rem;
		}
	}
	.now-title {
		grid-column: 1 / -1;
	}
</style>