<template>
	<VContainer>
		<VRow>
			<VCol cols="12" style="min-height: 300px;">
				<VBtn>Go to vaults</VBtn>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Web3 from "web3";
	import { AbiItem } from "web3-utils";

	import JustMallards from "../abi/JustMallards";

	export default defineComponent({
		name: "DashboardView",

		data()
		{
			return {
				contractAddress: "",
				YieldSyncV1VaultRecord: require(
					"../abi/contracts/YieldSyncV1VaultRecord.sol/YieldSyncV1VaultRecord.json"
				)
			};
		},

		async created()
		{
			if (typeof window.ethereum !== "undefined" && this.$store.state.accounts.length <= 1)
			{
				const web3 = new Web3(window.ethereum);

				const justMallardsContract = new web3.eth.Contract(
					JustMallards as AbiItem[],
					"0x7f8162f4ffe3db46cd3b0626dab699506c0ff63a"
				);

				console.log("Connected Address:", this.$store.state.accounts[0]);

				const justMallardsBalance = await justMallardsContract.methods.balanceOf(
					this.$store.state.accounts[0]
				).call();

				console.log(justMallardsBalance);
			}
			else
			{
				console.log("No ethereum account connected..");
			}
		},
	});
</script>
