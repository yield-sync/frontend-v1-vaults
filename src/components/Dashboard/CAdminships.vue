<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow class="mt-3 mb-6">
				<VCol cols="12" md="4">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">Vault Address</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">For : Against</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">Delay</h3>
				</VCol>
			</VRow>

			<RouterLink
				v-for="(v, i) in adminshipYieldSyncV1VaultVaults"
				:key="i"
				:to="`/v1-vault/${v.address}?admin=true`"
				class="text-decoration-none"
			>
				<div class="py-6 mb-6 rounded-xl vault">
					<VRow>
						<VCol cols="12" md="4">
							<h3 class="text-decoration-none text-center">
								{{
									v.address ?
										v.address.substring(0, 4) +
										"..." +
										v.address.substring($store.state.wallet.accounts[0].length - 4)
										:
										""
								}}
							</h3>
						</VCol>

						<VCol cols="12" md="4" class="d-none d-md-block">
							<h3 class="text-center" style="word-wrap: break-word;">
								{{ v.forVoteCountRequired }} : {{ v.againstVoteCountRequired }}
							</h3>
						</VCol>

						<VCol cols="12" md="4" class="d-none d-md-block">
							<h3 class="text-center" style="word-wrap: break-word;">{{ v.withdrawalDelaySeconds }}s</h3>
						</VCol>
					</VRow>
				</div>
			</RouterLink>
		</VCardText>
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
