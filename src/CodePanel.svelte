<script>
	import 'codemirror/mode/clike/clike';
	import CodeMirror from '@joshnuss/svelte-codemirror';
	
	export let editor;
	export let options;
	export let editorClassName;
	export let title;
	export let className;

	let codeMirror;
	let editorClassNames = `editor ${editorClassName}`
</script>

<div class={'code-panel ' + className}>
	<div class="code-panel-topbar"><h3>{title}</h3></div>
	<slot/>
	<CodeMirror bind:editor {options} class={editorClassNames} bind:this={codeMirror} />
</div>

<style>
	.code-panel {
		flex: 1;
		color: white;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
		position: relative;
	}

	.code-panel-topbar {
		background: rgb(245, 174, 149);
		height: var(--codepanel-topbar-height);
		padding-left: 25px;
		color: white;
		display: flex;
		align-items: center;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	h3 {
		margin: 0px;
	}

	:global(.editor) {
		font-size: 1.2rem;
		flex: 1;
		border-radius: 10px;
		overflow: auto;
		position: absolute;
		top: var(--codepanel-topbar-height);
		left: 0;
		right: 0;
		bottom: 0;
	}

	:global(.CodeMirror) {
		height: 100% !important;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
</style>
