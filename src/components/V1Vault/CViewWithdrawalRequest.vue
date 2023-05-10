<template lang="">
	<div>
		{{ idsOfOpenWithdrawalRequests }}
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import yieldSyncV1VaultABI from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		props: {
			v1VaultAddress: {
				required: true,
				type: String
			}
		},

		data() {
			return {
				idsOfOpenWithdrawalRequests: []
			}
		},

		async created() {
			const contract = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.v1VaultAddress
			);


			this.idsOfOpenWithdrawalRequests = await contract.methods.idsOfOpenWithdrawalRequests().call();
		},
	})
</script>
