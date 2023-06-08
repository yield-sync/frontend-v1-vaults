<template>
	<VContainer>
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
				<VBtn
					:disabled="creating"
					color="primary"
					class="w-100" @click="createWR()"
				>
					Create Withdrawal Request
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
				creating: false,
				yieldSyncV1Vault: undefined as undefined | Contract,
				withdrawalRequest: {
					for: "Ether" as string,
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
					await this.yieldSyncV1Vault.methods.createWithdrawalRequest(
						this.withdrawalRequest.for == "ERC 20" ? true : false,
						this.withdrawalRequest.for == "ERC 721" ? true : false,
						this.withdrawalRequest.to,
						this.withdrawalRequest.token ?
							this.withdrawalRequest.token : "0x0000000000000000000000000000000000000000"
						,
						BigInt(this.withdrawalRequest.amount * 10**18),
						this.withdrawalRequest.tokenId
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
							this.$store.state.pages.RVV1Vault.withdrawalRequest.tab = "o";
							this.$store.state.pages.RVV1Vault.withdrawalRequest.key++;
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
			if (this.$route.query.erc20Address)
			{
				this.withdrawalRequest.for = "ERC 20";
				this.withdrawalRequest.token = String(this.$route.query.erc20Address);
			}

			// Governance
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				YieldSyncV1Vault as AbiItem[],
				this.vaultAddress
			);
		},
	});
</script>
