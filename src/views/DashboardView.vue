<template>
	<VContainer>
		<VRow>
			<VCol cols="12" style="min-height: 300px;">
				<VSheets>
					<VBtn>Go to vaults</VBtn>
				</VSheets>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Web3 from "web3";
	import { AbiItem } from "web3-utils";

	export default defineComponent({
		name: "DashboardView",

		data()
		{
			return {
				contractAddress: "",
				justMallardsABI: require("../abi/JustMallards.json"),
				YieldSyncV1VaultRecord: require(
					"../abi/contracts/YieldSyncV1VaultRecord.sol/YieldSyncV1VaultRecord.json"
				),
				erc20: require("../abi/erc20.json")
			};
		},

		components: {
		},

		async created()
		{
			if (typeof window.ethereum !== "undefined")
			{
				const web3 = new Web3(window.ethereum);

				// Just Mallards Contract
				const justMallardsContract = new web3.eth.Contract(
					this.justMallardsABI as AbiItem[],
					"0x7F8162f4FfE3DB46CD3B0626daB699506C0FF63a"
				);


				const jMC = await justMallardsContract.methods.balanceOf(
					this.$store.state.accounts[0]
				).call();

				console.log("jMC:", jMC);
			}
		},
	});
</script>
