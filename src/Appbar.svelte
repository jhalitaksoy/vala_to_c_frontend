<script>
	import Responsize from './Responsize.svelte';

	export let showOutputPanel;

	function onShowOutputButtonClick() {
		showOutputPanel = !showOutputPanel;
	}
</script>

<div class="appbar">
	<h2>Vala to C</h2>
	<div class="flex right">
		<Responsize>
			<button slot="mobile" class="secondary" on:click={onShowOutputButtonClick}>
				{#if showOutputPanel}
					Show C Code
				{:else}
					Show Output
				{/if}
			</button>
		</Responsize>
	</div>
</div>

<style>
	button {
		padding: 5px;

		border-width: 0;
		outline: none;
		box-shadow: var(--button-box-shadow);
		margin: 0px;
	}

	.right {
		margin-left: auto;
	}

	.appbar {
		color: var(--appbar-color);
		background: var(--appbar-bgcolor);
		box-shadow: var(--appbar-box-shadow);

		height: var(--appbar-height);
		padding: var(--appbar-padding);

		display: flex;
		align-items: center;
	}
</style>
