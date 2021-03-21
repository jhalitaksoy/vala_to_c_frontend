<script>
	import CodePanel from './CodePanel.svelte';
	import Icon from 'svelte-awesome';
	import { beer, refresh, comment, codeFork, camera, play } from 'svelte-awesome/icons';

	import Media from './Media.svelte';
	let width = 600;

	const codevala = `void main (string[] args) {
	stdout.printf ("Hello world!");
}`;
	let c_code = ``;
	let output = ``;

	let valaeditor;
	let ceditor;
	let outputeditor;

	let showOutputPanel;

	const getOptionsvala = () => {
		return {
			mode: 'text/x-csrc',
			lineNumbers: true,
			value: codevala,
			viewportMargin: 0,
		};
	};
	const getOptionsc = () => {
		return {
			mode: 'text/x-csrc',
			lineNumbers: true,
			value: c_code,
			readOnly: true,
		};
	};

	const getOptionsOutput = () => {
		return {
			lineNumbers: true,
			value: output,
			readOnly: true,
		};
	};

	let optionsvala = getOptionsvala();
	let optionsc = getOptionsc();
	let optionsoutput = getOptionsOutput();

	async function onConvertClick() {
		const url = 'http://localhost:8000/vala_to_c';
		const data = {
			method: 'POST',
			body: valaeditor.getValue(),
		};
		let response = await fetch(url, data);
		if (response.ok) {
			// if HTTP-status is 200-299
			// get the response body (the method explained below)
			const _c_code = await response.text();
			showOutputPanel = false;
			output = '';
			c_code = _c_code;
			optionsc = getOptionsc();
			optionsoutput = getOptionsOutput();
		} else {
			if (response.status == 409) {
				const erroutput = await response.text();
				showOutputPanel = true;
				output = erroutput;
				c_code = '';
				optionsc = getOptionsc();
				optionsoutput = getOptionsOutput();
			}
		}
	}

	function onShowOutputButtonClick() {
		showOutputPanel = !showOutputPanel;
	}
</script>

<div class="appbar">
	<h2>Vala to C</h2>
	<div class="flex right">
		<Media query={'(min-width: ' + width + 'px)'} let:matches>
			{#if !matches}
				<button class="secondary" on:click={onShowOutputButtonClick}>
					{#if showOutputPanel}
						Show C Code
					{:else}
						Show Output
					{/if}
				</button>
			{/if}
		</Media>
	</div>
</div>

<Media query={'(min-width: ' + width + 'px)'} let:matches>
	{#if matches}
		<div class="container">
			<CodePanel
				className="vala-code-panel"
				title="Vala Code"
				bind:editor={valaeditor}
				options={optionsvala}
			>
				<div class="floating" style="right:10px;top: 50px;">
					<button class="circular primary center" on:click={onConvertClick}>
						<Icon data={play} scale="1" />
					</button>
				</div>
			</CodePanel>
			<CodePanel className="c-code-panel" title="C Code" bind:editor={ceditor} options={optionsc} />
			<CodePanel
				className="output-code-panel"
				title="Compiler Output"
				bind:editor={outputeditor}
				options={optionsoutput}
			/>
		</div>
	{:else}
		<div class="container container-mobile">
			<CodePanel className="vala-code-panel" title="Vala Code" bind:editor={valaeditor} options={optionsvala}>
				<div class="floating" style="right:10px;top: 50px;">
					<button class="circular primary center" on:click={onConvertClick}>
						<Icon data={play} scale="1" />
					</button>
				</div></CodePanel
			>
			{#if showOutputPanel}
				<CodePanel
					className="output-code-panel"
					title="Compiler Output"
					bind:editor={outputeditor}
					options={optionsoutput}
				/>
			{:else}
				<CodePanel title="C Code" bind:editor={ceditor} options={optionsc} editorClassName="c-editor" />
			{/if}
		</div>
	{/if}
</Media>

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

	.flex {
		display: flex;
		align-items: center;
	}

	:global(.primary) {
		color: var(--primary-color);
		background-color: var(--primary-bgcolor);
	}

	.secondary {
		background-color: var(--secondary-bgcolor);
		color: var(--secondary-color);
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

	.container {
		color: var(--container-color);
		background: var(--container-bgcolor);
		margin: var(--container-margin);

		flex: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: var(--container-gap);
	}

	.container-mobile {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
	}

	:global(.c-code-panel) {
		grid-column: 2/3;
		grid-row: 1/3;
	}

	:global(.floating) {
		position: absolute;
		z-index: 3;
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
