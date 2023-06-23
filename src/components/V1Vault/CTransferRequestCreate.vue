<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<VRadioGroup
					v-model="$store.state.pages.RVV1Vault.transferRequest.for"
					:label="'For: ' + $store.state.pages.RVV1Vault.transferRequest.for"
					inline
				>
					<VRadio
						label="Ether"
						value="Ether"
						color="primary"
					/>
					<VRadio
						label="ERC 20"
						value="ERC 20"
						color="primary"
					/>
					<VRadio
						label="ERC 721"
						value="ERC 721"
						color="primary"
					/>
				</VRadioGroup>
			</VCol>

			<VCol cols="12">
				<!-- TO -->
				<VTextField
					v-model="$store.state.pages.RVV1Vault.transferRequest.to"
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
					:disabled="$store.state.pages.RVV1Vault.transferRequest.for == 'Ether'"
					v-model="$store.state.pages.RVV1Vault.transferRequest.token"
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
					:disabled="$store.state.pages.RVV1Vault.transferRequest.for != 'ERC 721'"
					v-model="$store.state.pages.RVV1Vault.transferRequest.tokenId"
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
					:disabled="$store.state.pages.RVV1Vault.transferRequest.for == 'ERC 721'"
					v-model="$store.state.pages.RVV1Vault.transferRequest.amount"
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
					class="w-100"
					@click="createWR()"
				>
					Create Request
				</VBtn>
				<h6 v-if="error" class="text-danger">{{ error }}</h6>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CTransferRequestCreate",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data()
		{
			return {
				ZeroAddress: "0x0000000000000000000000000000000000000000",
				creating: false,
				yieldSyncV1Vault: undefined as undefined | Contract,
				transferRequest: {
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					to: "" as string,
					token: "" as string,
					amount: 0 as number,
					tokenId: 0 as number,
				},
				error: ""
			};
		},

		methods: {
			async createWR()
			{
				if (this.yieldSyncV1Vault)
				{
					await this.yieldSyncV1Vault.methods.createTransferRequest(
						this.$store.state.pages.RVV1Vault.transferRequest.for == "ERC 20" ? true : false,
						this.$store.state.pages.RVV1Vault.transferRequest.for == "ERC 721" ? true : false,
						this.$store.state.pages.RVV1Vault.transferRequest.to,
						(
							this.$store.state.pages.RVV1Vault.transferRequest.token
						) ? this.$store.state.pages.RVV1Vault.transferRequest.token : this.ZeroAddress,
						(
							this.$store.state.pages.RVV1Vault.transferRequest.for == "ERC 721"
						) ?  BigInt(10**18) : BigInt(this.$store.state.pages.RVV1Vault.transferRequest.amount * 10**18),
						this.$store.state.pages.RVV1Vault.transferRequest.tokenId
					).send({
						from: this.$store.state.wallet.accounts[0]
					}).on("sent", async () =>
					{
						this.creating = true;
					}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							this.$store.state.pages.RVV1Vault.transferRequests.tab = "o";
							this.$store.state.pages.RVV1Vault.transferRequests.key++;
						}

						this.creating = false;
					}).on("error", async (error: Error) =>
					{
						this.error = String(error);

						this.creating = false;
					});
				}
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
