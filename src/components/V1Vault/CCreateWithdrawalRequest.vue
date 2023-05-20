<template>
	<VRow>
		<VCol cols="12" class="">
			<VRadioGroup v-model="withdrawalRequest.for" :label="'For: ' + withdrawalRequest.for " inline>
				<VRadio
					label="Ether"
					value="Ether"
					color="primary"
				/>
				<VRadio
					label="ERC 20"
					value="ERC 20"
				/>
				<VRadio
					label="ERC 721"
					value="ERC 721"
				/>
			</VRadioGroup>
		</VCol>

		<VCol cols="8" class="">
			<VTextField
				:disabled="withdrawalRequest.for == 'Ether'"
				v-model="withdrawalRequest.token"
				type="text"
				label="ERC Token Address"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="4" class="">
			<VTextField
				:disabled="withdrawalRequest.for != 'ERC 721'"
				v-model="withdrawalRequest.tokenId"
				type="number"
				label="Token Id"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="8" class="">
			<VTextField
				v-model="withdrawalRequest.to"
				type="text"
				label="To Address"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="4" class="">
			<VTextField
				v-model="withdrawalRequest.amount"
				type="number"
				label="Amount"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="12" class="">
			<VBtn color="primary" class="w-100" @click="createWR()">Create Withdrawal Request</VBtn>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CCreateWithdrawalRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data()
		{
			return {
				yieldSyncV1Vault: undefined as any | undefined,
				withdrawalRequest: {
					for: "Ether",
					to: "",
					token: "",
					amount: 0,
					tokenId: 0,
				}
			};
		},

		methods: {
			async createWR()
			{
				await this.yieldSyncV1Vault.methods.createWithdrawalRequest(
					this.withdrawalRequest.for == "ERC 20" ? true : false,
					this.withdrawalRequest.for == "ERC 721" ? true : false,
					this.withdrawalRequest.to,
					this.withdrawalRequest.token ?
						this.withdrawalRequest.token : "0x0000000000000000000000000000000000000000"
					,
					this.withdrawalRequest.amount,
					this.withdrawalRequest.tokenId
				).send({
					from: this.$store.state.wallet.accounts[0]
				});
			}
		},

		async created()
		{
			// Governance
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);
		},
	});
</script>
