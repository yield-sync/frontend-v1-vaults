<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<h2 class="text-center">V1 Vaults</h2>
			</VCol>

			<VCol cols="12">
				<h6 class="text-center">Record Contract: {{ record }}</h6>
			</VCol>
			<VCol cols="12">
				{{ v1Vaults }}

				<VBtn @click="w_deployYieldSyncV1Vault()">Deploy a Vault</VBtn>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ethers } from "ethers";


export default defineComponent({
	name: "RVGovernance",

	data() {
		return {
			record: "",
			v1Vaults: [],

			deployParams: {
				admins: [] as string[],
				members: [] as string[],
				signatureManager: ethers.ZeroAddress as string,
				useDefaultSignatureManager: false as boolean,
				againstVoteCountRequired: undefined as number | undefined,
				forVoteCountRequired: undefined as number | undefined,
				withdrawalDelaySeconds: undefined as number | undefined
			},
		}
	},

	methods: {
		async w_deployYieldSyncV1Vault()
		{
			try
			{
				await this.$store.state.contract.yieldSyncV1VaultFactory.methods.deployYieldSyncV1Vault(
					this.deployParams.admins,
					this.deployParams.members,
					this.deployParams.signatureManager,
					this.deployParams.useDefaultSignatureManager,
					this.deployParams.againstVoteCountRequired,
					this.deployParams.forVoteCountRequired,
					this.deployParams.withdrawalDelaySeconds
				).send({ from: this.$store.state.accounts[0] });
			}
			catch (e)
			{
				console.error(e);
			}
		}
	},

	async created() {
		this.record = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.YieldSyncV1VaultRecord().call();

		this.v1Vaults = await this.$store.state.contract.yieldSyncV1VaultRecord.methods.member_yieldSyncV1Vaults(
			this.$store.state.accounts[0]
		).call();
	},
})
</script>
