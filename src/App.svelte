<script>
	import CodePanelGrid from './CodePanelGrid.svelte';
	import Appbar from './Appbar.svelte';

	let showOutputPanel;
</script>

<Appbar bind:showOutputPanel/>
<CodePanelGrid {showOutputPanel} />

<style>
	:global(:root) {
		--appbar-bgcolor: coral;
		--appbar-color: white;
		--appbar-height: 50px;
		--appbar-padding: 0 20px 0 20px;
		--appbar-box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);

		--container-bgcolor: transparent;
		--container-color: black;
		--container-margin: 10px;
		--container-gap: 10px;

		--codepanel-topbar-height: 40px;

		--primary-bgcolor: blueviolet;
		--primary-color: white;

		--secondary-bgcolor: lightblue;
		--secondary-color: red;

		--ground-color: white;
		--ground-text-color: black;

		--button-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
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
	}

	:global(.center) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
