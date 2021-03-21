<script>
	import Media from './Media.svelte';
	let width = 600;
</script>

<Media query={'(min-width: ' + width + 'px)'} let:matches>
	{#if matches}
		<slot name="desktop" />
	{:else}
		<slot name="mobile" />
	{/if}
</Media>
