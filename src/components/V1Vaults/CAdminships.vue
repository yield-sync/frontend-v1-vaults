<template>
	<VRow>
		<VCol cols="12" class="text-right">
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
		<VCol cols="12" md="6">
			<h2 class="text-center text-primary" style="word-wrap: break-word;">Vault Address</h2>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<h2 class="text-center text-primary" style="word-wrap: break-word;">For : Against</h2>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<h2 class="text-center text-primary" style="word-wrap: break-word;">Withdrawal Delay (Sec)</h2>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<h2 class="text-center text-primary" style="word-wrap: break-word;">Etherscan</h2>
		</VCol>
	</VRow>

	<VRow v-for="(v, i) in adminshipYieldSyncV1VaultVaults" :key="i" class="mb-3">
		<VCol cols="12" md="6">
			<RouterLink :to="`/v1-vault/${v.address}?admin=true`">
				<VBtn variant="tonal" color="primary" class="w-100">{{ v.address }}</VBtn>
			</RouterLink>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<h3 class="text-center" style="word-wrap: break-word;">
				{{ v.forVoteCountRequired }} : {{ v.againstVoteCountRequired }}
			</h3>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<h3 class="text-center" style="word-wrap: break-word;">{{ v.withdrawalDelaySeconds }}</h3>
		</VCol>

		<VCol cols="12" md="2" class="d-none d-md-block">
			<a
				:href="`https://${etherscanDomainStart}.etherscan.io/address/${v.address}#readContract`"
				target="_blank"
				rel="noopener noreferrer"
			>
				<VBtn variant="tonal" class="w-100">🔗</VBtn>
			</a>
		</VCol>
	</VRow>
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
