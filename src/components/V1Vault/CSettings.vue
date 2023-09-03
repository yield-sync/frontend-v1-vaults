<template>
	<CTRPASettings
		:vaultAddress="this.vaultAddress"
		:asAdmin="this.asAdmin"
	/>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import CTRPASettings from "./CTransferRequestProtocolA/CSettings.vue";

	export default defineComponent({
		name: "CSettings",

		props: {
			vaultAddress: {
				type: String,
				required: true
			},
			asAdmin: {
				type: Boolean,
				default: false
			},
		},

		data()
		{
			return {
				yieldSyncV1ATransferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,

				yieldSyncV1BTransferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1BTransferRequestProtocol,
			};
		},

		components: {
			CTRPASettings
		},
	});
</script>
