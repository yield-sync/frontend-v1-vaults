<template>
	<VContainer>
		<VRow>
			<VCol cols="4" />

			<VCol cols="4">
				<h3 class="mb-3 text-center text-uppercase text-primary">Membership in V1 Vault</h3>
			</VCol>

			<VCol cols="4">
				<a
					:href="`https://${d}.etherscan.io/address/${record}#readContract`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h6 class="text-right">Access Control Contract</h6>
				</a>
			</VCol>
		</VRow>

		<VRow>
			<VCol cols="2">
				<h4 class="text-primary" style="word-wrap: break-word;">Address</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-primary" style="word-wrap: break-word;">For Vote Required</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-primary" style="word-wrap: break-word;">Against Vote Required</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-primary" style="word-wrap: break-word;">Withdrawal Delay Seconds</h4>
			</VCol>

			<VCol cols="4">
				<h4 class="text-primary" style="word-wrap: break-word;">Etherscan</h4>
			</VCol>
		</VRow>

		<VRow v-for="(v, i) in v1Vaults" :key="i">
			<VCol cols="2">
				<h5 style="word-wrap: break-word;">
					{{ v.address.substring(0, 4) + "..." + v.address.substring(v.address.length - 4) }}
				</h5>
			</VCol>

			<VCol cols="2">
				<h5 style="word-wrap: break-word;">{{ v.forVoteCountRequired }}</h5>
			</VCol>

			<VCol cols="2">
				<h5 style="word-wrap: break-word;">{{ v.againstVoteCountRequired }}</h5>
			</VCol>

			<VCol cols="2">
				<h5 style="word-wrap: break-word;">{{ v.withdrawalDelaySeconds }}</h5>
			</VCol>

			<VCol cols="4">
				<a
					:href="`https://${d}.etherscan.io/address/${v.address}#readContract`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<VBtn variant="tonal" size="sm" class="w-100">🔗</VBtn>
				</a>
			</VCol>
		</VRow>
	</VContainer>
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
				record: "",
				v1Vaults: [
				] as Array<{
					address: string,
					againstVoteCountRequired: number,
					forVoteCountRequired: number,
					withdrawalDelaySeconds: number,
				}>,
				d: this.$store.state.etherscanDomainStart
			};
		},

		async created()
		{
			this.record = await this.$store.state.contract.yieldSyncV1VaultFactory.methods
				.YieldSyncV1VaultAccessControl().call();

			const v1Vaults = await this.$store.state.contract.yieldSyncV1VaultAccessControl.methods
				.member_yieldSyncV1Vaults(this.$store.state.accounts[0]).call();

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
