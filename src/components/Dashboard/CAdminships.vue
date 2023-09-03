<template>
	<VCard class="mb-4 rounded-xl bg-light-frost elevation-0">
		<VCardText class="px-6 py-6">
			<VRow class="mt-3 mb-6">
				<VCol cols="12" md="4">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">
						Vault Address
					</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">
						For : Against
					</h3>
				</VCol>

				<VCol cols="12" md="4" class="d-none d-md-block">
					<h3 class="text-center text-primary text-uppercase" style="word-wrap: break-word;">Delay</h3>
				</VCol>
			</VRow>

			<div v-if="this.loading" class="text-center">
				<VProgressCircular
					class=""
					indeterminate
					color="primary"
				/>
			</div>

			<div v-if="!this.loading">
				<RouterLink
					v-for="(v, i) in this.adminshipYieldSyncV1VaultVaults"
					:key="i"
					:to="`/v1-vault/${v.address}?admin=true`"
					class="text-decoration-none"
				>
					<div class="py-6 mb-6 rounded-xl vault">
						<VRow>
							<VCol cols="12" md="4">
								<h3 class="text-decoration-none text-center text-primary">
									{{
										v.address ?
											v.address.substring(0, 4) +
											"..." +
											v.address.substring(this.$store.state.wallet.accounts[0].length - 4)
											: ""
									}}
								</h3>
							</VCol>

							<VCol cols="12" md="4" class="d-none d-md-block">
								<h3 class="text-center text-primary" style="word-wrap: break-word;">
									{{ v.voteForRequired }} : {{ v.voteAgainstRequired }}
								</h3>
							</VCol>

							<VCol cols="12" md="4" class="d-none d-md-block">
								<h3 class="text-center text-primary" style="word-wrap: break-word;">
									{{ v.transferDelaySeconds }}s
								</h3>
							</VCol>
						</VRow>
					</div>
				</RouterLink>
			</div>

			<div v-if="!this.loading && this.adminshipYieldSyncV1VaultVaults.length == 0" class="text-center">
				<h5>No adminships found</h5>
			</div>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1ATransferRequestProtocol from "../../abi/YieldSyncV1ATransferRequestProtocol";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				loading: true as boolean,
				registry: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1VaultRegistry,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,

				etherscanDomainStart: this.$store.state.etherscanDomainStart,

				adminshipYieldSyncV1VaultVaults: [
				] as {
					address: string;
					voteAgainstRequired: number;
					voteForRequired: number;
					transferDelaySeconds: number;
				}[],
			};
		},

		components: {
		},

		async created(): Promise<void>
		{
			this.loading = true;

			const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
				YieldSyncV1ATransferRequestProtocol as AbiItem[],
				this.transferRequestProtocol
			);

			const v1Vaults = await this.$store.state.contract.yieldSyncV1VaultRegistry.methods
				.admin_yieldSyncV1Vaults(this.$store.state.wallet.accounts[0]).call()
			;

			for (let i = 0; i < v1Vaults.length; i++)
			{
				const vaultProperties = await transferRequestProtocol.methods
					.yieldSyncV1Vault_yieldSyncV1VaultProperty(
						this.$store.state.wallet.accounts[0]
					).call()
				;

				this.adminshipYieldSyncV1VaultVaults.push({
					address: v1Vaults[i],
					voteAgainstRequired: vaultProperties[0],
					voteForRequired: vaultProperties[1],
					transferDelaySeconds: vaultProperties[2],
				});
			}

			this.loading = false;
		},
	});
</script>
