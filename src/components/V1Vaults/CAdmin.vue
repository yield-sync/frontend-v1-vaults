<template>
	<VContainer>
		<VCard color="light" class="mb-3 px-6 py-6">
			<VRow>
				<VCol cols="4" />

				<VCol cols="4">
					<h3 class="mb-3 text-center text-uppercase text-primary">Admin of V1 Vault</h3>
				</VCol>

				<VCol cols="4" class="text-right">
					<a
						:href="`https://${d}.etherscan.io/address/${accessControl}#readContract`"
						target="_blank"
						rel="noopener noreferrer"
					>
						<VBtn variant="plain" size="sm"><h6>🔗 Access Control Contract</h6></VBtn>
					</a>
				</VCol>
			</VRow>

			<CVaultBreakdown :v1Vaults="v1Vaults" />
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import CVaultBreakdown from "./CVaultBreakdown.vue";
	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				accessControl: "",
				v1Vaults: [
				] as Array<{
					address: string;
					againstVoteCountRequired: number;
					forVoteCountRequired: number;
					withdrawalDelaySeconds: number;
				}>,
				d: this.$store.state.etherscanDomainStart
			};
		},

		components: {
			CVaultBreakdown
		},

		async created()
		{
			this.accessControl = await this.$store.state.contract.yieldSyncV1VaultFactory.methods
				.YieldSyncV1VaultAccessControl().call();

			const v1Vaults = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
				.admin_yieldSyncV1Vaults(this.$store.state.wallet.accounts[0]).call();

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					v1Vaults[i]
				);

				this.v1Vaults.push({
					address: v1Vaults[i],
					againstVoteCountRequired: await yieldSyncV1Vault.methods.againstVoteCountRequired().call(),
					forVoteCountRequired: await yieldSyncV1Vault.methods.forVoteCountRequired().call(),
					withdrawalDelaySeconds: await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call(),
				});
			}
		},
	});
</script>
