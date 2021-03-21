<script>
	import CodePanel from './CodePanel.svelte';
	import Icon from 'svelte-awesome';
	import { play } from 'svelte-awesome/icons';
	import Responsize from './Responsize.svelte';

	export let showOutputPanel;

	const codevala = `void main (string[] args) {
	stdout.printf ("Hello world!");
}`;
	let c_code = ``;
	let output = ``;

	let valaeditor;
	let ceditor;
	let outputeditor;

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
</script>

<Responsize>
	<div slot="desktop" class="container">
		<CodePanel className="vala-code-panel" title="Vala Code" bind:editor={valaeditor} options={optionsvala}>
			<div class="floating" style="right:10px;top: 50px; z-index : 3;">
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

	<div slot="mobile" class="container container-mobile">
		<CodePanel className="vala-code-panel" title="Vala Code" bind:editor={valaeditor} options={optionsvala}>
			<div class="floating" style="right:10px;top: 50px; z-index : 3;">
				<button class="circular primary center" on:click={onConvertClick}>
					<Icon data={play} scale="1" />
				</button>
			</div>
		</CodePanel>
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
</Responsize>

<style>
	.container {
		color: var(--ground-color);
		background: var(--ground-bgcolor);
		padding: var(--container-padding);

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
</style>
