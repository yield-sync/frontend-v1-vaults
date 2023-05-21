<template>
	<VCard color="light" class="mb-3 px-6 py-6">
		<VRow>
			<VCol cols="4" />

			<VCol cols="4">
				<h3 class="mb-3 text-center text-uppercase text-primary">Admin of V1 Vault</h3>
			</VCol>

			<VCol cols="4" class="text-right">
				<a
					:href="`https://${etherscanDomainStart}.etherscan.io/address/${accessControl}#readContract`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<VBtn variant="plain" size="sm"><h6>🔗 Access Control Contract</h6></VBtn>
				</a>
			</VCol>
		</VRow>

		<VRow>
		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">Address</h4>
		</VCol>

		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">View</h4>
		</VCol>

		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">For Votes Required</h4>
		</VCol>

		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">Against Votes Required</h4>
		</VCol>

		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">Withdrawal Delay (Sec)</h4>
		</VCol>

		<VCol cols="2">
			<h4 class="text-center text-primary" style="word-wrap: break-word;">Etherscan</h4>
		</VCol>
	</VRow>

	<VRow v-for="(v, i) in adminshipYieldSyncV1VaultVaults" :key="i" class="mb-3">
		<VCol cols="2">
			<h5 class="text-center" style="word-wrap: break-word;">
				{{ v.address.substring(0, 4) + "..." + v.address.substring(v.address.length - 4) }}
			</h5>
		</VCol>

		<VCol cols="2">
			<RouterLink :to="`/v1-vault-admin/${v.address}`">
				<VBtn variant="tonal" size="sm" class="w-100">View</VBtn>
			</RouterLink>
		</VCol>

		<VCol cols="2">
			<h5 class="text-center" style="word-wrap: break-word;">{{ v.forVoteCountRequired }}</h5>
		</VCol>

		<VCol cols="2">
			<h5 class="text-center" style="word-wrap: break-word;">{{ v.againstVoteCountRequired }}</h5>
		</VCol>

		<VCol cols="2">
			<h5 class="text-center" style="word-wrap: break-word;">{{ v.withdrawalDelaySeconds }}</h5>
		</VCol>

		<VCol cols="2">
			<a
				:href="`https://${etherscanDomainStart}.etherscan.io/address/${v.address}#readContract`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VBtn variant="tonal" size="sm" class="w-100">🔗</VBtn>
			</a>
		</VCol>
	</VRow>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				accessControl: this.$store.state.config.address[
					this.$store.state.chainName
				].yieldSyncV1VaultAccessControl,

				etherscanDomainStart: this.$store.state.etherscanDomainStart,

				adminshipYieldSyncV1VaultVaults: [
				] as {
					address: string;
					againstVoteCountRequired: number;
					forVoteCountRequired: number;
					withdrawalDelaySeconds: number;
				}[],
			};
		},

		components: {
		},

		async created()
		{
			const v1Vaults = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
				.admin_yieldSyncV1Vaults(this.$store.state.wallet.accounts[0]).call()
			;

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					v1Vaults[i]
				);

				this.adminshipYieldSyncV1VaultVaults.push({
					address: v1Vaults[i],
					againstVoteCountRequired: await yieldSyncV1Vault.methods.againstVoteCountRequired().call(),
					forVoteCountRequired: await yieldSyncV1Vault.methods.forVoteCountRequired().call(),
					withdrawalDelaySeconds: await yieldSyncV1Vault.methods.withdrawalDelaySeconds().call(),
				});
			}
		},
	});
</script>
