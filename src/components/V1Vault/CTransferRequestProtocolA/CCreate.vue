<template>
	<VRow>
		<VCol cols="12" md="8">
			<fieldset class="border-0">
				<input
					v-model="$store.state.pages.RVV1Vault.transferRequestA.for"
					type="radio"
					value="Ether"
					id="Ether"
				/>

				<label for="Ether">Ether</label>

				<input
					v-model="$store.state.pages.RVV1Vault.transferRequestA.for"
					type="radio"
					value="ERC 20"
					id="ERC 20"
				/>

				<label for="ERC 20">ERC 20</label>

				<input
					v-model="$store.state.pages.RVV1Vault.transferRequestA.for"
					type="radio"
					value="ERC 721"
					id="ERC 721"
				/>

				<label for="ERC 721">ERC 721</label>
			</fieldset>
		</VCol>

		<VCol cols="12" md="4">
			<select
				v-if="$store.state.pages.RVV1Vault.transferRequestA.for != 'Ether'"
				v-model="$store.state.pages.RVV1Vault.transferRequestA.token"
				class="w-100 px-4 py-2 bg-light border rounded"
				@change="$store.state.pages.RVV1Vault.transferRequestA.for = 'ERC 20'"
			>
				<option value="">Select ERC 20 Token</option>

				<option v-for="(t, i) in $store.state.pages.RVV1Vault.erc20s" :key="i" :value="t.contract">
					{{ t.name }}
				</option>
			</select>
		</VCol>

		<VCol cols="12">
			<!-- TO -->
			<VTextField
				v-model="$store.state.pages.RVV1Vault.transferRequestA.to"
				type="text"
				label="To Address"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="6">
			<!-- TOKEN ADDRESS -->
			<VTextField
				:disabled="$store.state.pages.RVV1Vault.transferRequestA.for == 'Ether'"
				v-model="$store.state.pages.RVV1Vault.transferRequestA.token"
				type="text"
				label="Token Address"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="2">
			<!-- TOKEN ID -->
			<VTextField
				:disabled="$store.state.pages.RVV1Vault.transferRequestA.for != 'ERC 721'"
				v-model="$store.state.pages.RVV1Vault.transferRequestA.tokenId"
				type="number"
				label="Token Id"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="4">
			<!-- AMOUNT -->
			<VTextField
				:disabled="$store.state.pages.RVV1Vault.transferRequestA.for == 'ERC 721'"
				v-model="$store.state.pages.RVV1Vault.transferRequestA.amount"
				type="number"
				label="Amount"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="12">
			<VBtn
				:disabled="creating"
				color="primary"
				class="w-100 rounded-xl elevation-0"
				@click="createWR()"
			>
				<VProgressCircular
					v-if="creating"
					indeterminate
					color="light"
					class=""
				/>

				<span v-else>Create Request</span>
			</VBtn>

			<h6 v-if="error" class="text-danger">{{ error }}</h6>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../../abi/YieldSyncV1Vault";
	import YieldSyncV1ATransferRequestProtocol from "../../../abi/YieldSyncV1ATransferRequestProtocol";

	export default defineComponent({
		name: "CCreate",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data()
		{
			return {
				ZERO_ADDRESS: this.$store.state.ZERO_ADDRESS,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,

				creating: false,
				yieldSyncV1Vault: undefined as undefined | Contract,

				error: ""
			};
		},

		methods: {
			async createWR(): Promise<void>
			{
				const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1ATransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				transferRequestProtocol.methods.yieldSyncV1Vault_transferRequestId_transferRequestCreate(
					this.vaultAddress,
					this.$store.state.pages.RVV1Vault.transferRequestA.for == "ERC 20" ? true : false,
					this.$store.state.pages.RVV1Vault.transferRequestA.for == "ERC 721" ? true : false,
					this.$store.state.pages.RVV1Vault.transferRequestA.to,
					(
						this.$store.state.pages.RVV1Vault.transferRequestA.token
					) ? this.$store.state.pages.RVV1Vault.transferRequestA.token : this.ZERO_ADDRESS,
					(
						this.$store.state.pages.RVV1Vault.transferRequestA.for == "ERC 721"
					) ? BigInt(10 ** 18) : BigInt(this.$store.state.pages.RVV1Vault.transferRequestA.amount * 10 ** 18),
					this.$store.state.pages.RVV1Vault.transferRequestA.tokenId
				).send({
					from: this.$store.state.wallet.accounts[0]
				}).on(
					"sent",
					async () =>
					{
						this.creating = true;
					}
				).on(
					"confirmation",
					async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							this.$store.state.pages.RVV1Vault.transferRequests.tab = "o";
							this.$store.state.pages.RVV1Vault.transferRequests.key++;
						}

						this.creating = false;
					}
				).on(
					"error",
					async (error: Error) =>
					{
						this.error = String(error);

						this.creating = false;
					}
				);
			}
		},

		async created(): Promise<void>
		{
			if (this.yieldSyncV1Vault)
			{
				this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.vaultAddress
				);
			}
		},
	});
</script>

<style scoped>
p, label {
    font: 1rem 'Fira Sans', sans-serif;
}

input {
    margin: 0.4rem;
}
</style>
