<script>
	import CodePanel from './CodePanel.svelte';
	import Icon from 'svelte-awesome';
	import { play } from 'svelte-awesome/icons';
	import Responsize from './Responsize.svelte';
	import { EditorUtil } from './util/EditorUtil.js';
	import { Store } from './store/Store.js';
	import MessageBox from './MessageBox.svelte';

	export let showOutputPanel;

	let valacode = Store.getValaCode();
	let c_code = ``;
	let output = ``;

	let valaeditor;
	let ceditor;
	let outputeditor;

	let optionsvala = EditorUtil.getOptionsVala(valacode);
	let optionsc = EditorUtil.getOptionsC(c_code);
	let optionsoutput = EditorUtil.getOptionsOutput(output);

	let message = undefined;

	async function onConvertClick() {
		try {
			//const url = 'http://localhost:8000/vala_to_c';
			const url = 'https://halitaksoy.com/valatoc/vala_to_c';
			const data = {
				method: 'POST',
				body: valaeditor.getValue(),
			};
			let response = await fetch(url, data);
			if (response.ok) {
				const json = await response.json();
				c_code = json.c_code;
				showOutputPanel = json.has_error;
				output = json.stdout + json.stderr;
				optionsc = EditorUtil.getOptionsC(c_code);
				optionsoutput = EditorUtil.getOptionsOutput(output);
			} else {
			}
		} catch (error) {
			console.log(error);
			console.log('Network Error');
			message = 'Network Error!';
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

	<div slot="mobile" class="container">
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
			<CodePanel title="C Code" bind:editor={ceditor} options={optionsc} />
		{/if}
	</div>
</Responsize>

<MessageBox bind:message />

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

	:global(.c-code-panel) {
		grid-column: 2/3;
		grid-row: 1/3;
	}

	@media only screen and (max-width: 767px) {
		.container {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		:global(.c-code-panel) {
			grid-column: auto;
			grid-row: auto;
		}
	}
</style>
