<script>
	import CodePanelGrid from './CodePanelGrid.svelte';
	import Appbar from './Appbar.svelte';

	let showOutputPanel;
</script>

<Appbar bind:showOutputPanel />
<CodePanelGrid {showOutputPanel} />

<style>
	:global(:root) {
		--codepanel-topbar-height: 40px;

		--primary-bgcolor: blueviolet;
		--primary-color: white;

		--primary-variant-bgcolor: rgb(171, 91, 246);
		--primary-variant-color: white;

		--secondary-bgcolor: coral;
		--secondary-color: white;

		--ground-bgcolor: rgb(251, 245, 245);
		--ground-color: black;

		--button-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);

		--appbar-height: 50px;
		--appbar-padding: 0 10px 0 10px;
		--appbar-box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);

		--container-padding: 10px;
		--container-gap: 10px;
		
		--cm-border-color: #ccc !important;
		--cm-background-color: white !important;
		--cm-medium-color: #ccc !important;
		--cm-text-color: #222 !important;
	}

	:global(body) {
		padding: 0px;
		display: flex;
		flex-direction: column;
	}

	:global(.flex) {
		display: flex;
		align-items: center;
	}

	:global(.primary) {
		color: var(--primary-color);
		background-color: var(--primary-bgcolor);
	}

	:global(.secondary) {
		background-color: var(--secondary-bgcolor);
		color: var(--secondary-color);
	}

	:global(.floating) {
		position: absolute;
	}

	:global(.circular) {
		border-radius: 50px;
		width: 50px;
		height: 50px;

		border-width: 0;
		outline: none;
	}

	:global(.center) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
