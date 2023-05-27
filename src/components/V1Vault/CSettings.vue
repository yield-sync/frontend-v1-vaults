<template>
	<VContainer>
		<VBtn
			color="primary"
			class="w-100"
			@click="renounceMembership()"
		>
			Renounce Membership
		</VBtn>

		<h6 v-if="error">{{ error }}</h6>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CMembers",

		props: {
			vaultAddress: {
				type: String,
				required: true
			}
		},

		data()
		{
			return {
				yieldSyncV1Vault: undefined as undefined | Contract,
				error: "" as string
			};
		},

		methods: {
			async renounceMembership()
			{
				if (this.yieldSyncV1Vault)
				{
					try
					{
						await this.yieldSyncV1Vault.methods.renounceMembership().send({
							from: this.$store.state.wallet.accounts[0]
						});
					}
					catch (e)
					{
						this.error = String(e);
					}
				}
			}
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);
		}
	});
</script>
