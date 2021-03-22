<script>
	import Icon from 'svelte-awesome';
	import { close, infoCircle } from 'svelte-awesome/icons';

	export let message;

    function onCloseClick(){
        message = undefined
    }
</script>

{#if message}
	<div class="floating message-panel-container center">
		<div class="message-panel flex">
			<div class="flex">
				<Icon data={infoCircle} scale="2" />
                <div style="width:10px;"></div>
				{message}
			</div>
                <button class="center" on:click={onCloseClick}>
                    <Icon data={close} scale="1" />
                </button>
		</div>
	</div>
{/if}

<style>
	.message-panel-container {
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		z-index: 10;
        background: rgba(100, 100, 100, 0.5);
	}

	.message-panel {
		border-radius: 10px;
		background-color: var(--primary-color);
		width: 400px;
		box-shadow: var(--common-box-shadow);
		padding: 20px;
		justify-content: space-between;
        margin:10px;
	}

	button {
		outline: none;
		background-color: transparent;
		border: none;
		padding: 0px;
	}
</style>
