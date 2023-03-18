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
	import {ethers} from "ethers";
	import { defineComponent } from "vue";

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

		components: {
		},

		async created()
		{
			if (typeof window.ethereum !== "undefined")
			{
				const contract = new ethers.Contract(
					this.contractAddress,
					this.YieldSyncV1VaultRecord.abi,
					this.$store.state.accounts[0]
				);

				console.log(await contract.admin_yieldSyncV1Vaults(this.$store.state.accounts[0]));

			}
		},
	});
</script>
