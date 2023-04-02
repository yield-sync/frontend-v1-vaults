<template>
	<VContainer>
		<VRow>
			contract
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import YieldSyncV1VaultFactory from "../abi/YieldSyncV1VaultFactory";
	import v from "../variables";

	export default defineComponent({
		name: "BalancesView",

		async created() 
		{
			const contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1VaultFactory as AbiItem[],
				v.address.goerli.yieldSyncV1VaultFactory
			);

			console.log(await contract.methods.YieldSyncV1VaultRecord().call());
		}
	});
</script>
