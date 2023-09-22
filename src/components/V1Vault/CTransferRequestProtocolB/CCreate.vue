<template>
	<VRow>
		<VCol cols="12" md="8">
			<fieldset class="border-0">
				<input
					v-model="this.$store.state.pages.RVV1Vault.transferRequestB.for"
					type="radio"
					value="Ether"
					id="Ether"
				/>

				<label for="Ether">Ether</label>

				<input
					v-model="this.$store.state.pages.RVV1Vault.transferRequestB.for"
					type="radio"
					value="ERC 20"
					id="ERC 20"
				/>

				<label for="ERC 20">ERC 20</label>

				<input
					v-model="this.$store.state.pages.RVV1Vault.transferRequestB.for"
					type="radio"
					value="ERC 721"
					id="ERC 721"
				/>

				<label for="ERC 721">ERC 721</label>
			</fieldset>
		</VCol>

		<VCol cols="12" md="4">
			<select
				v-if="this.$store.state.pages.RVV1Vault.transferRequestB.for != 'Ether'"
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.token"
				class="w-100 px-4 py-2 bg-light border rounded"
				@change="this.$store.state.pages.RVV1Vault.transferRequestB.for = 'ERC 20'"
			>
				<option value="">Select ERC 20 Token</option>

				<option v-for="(t, i) in this.$store.state.pages.RVV1Vault.erc20s" :key="i" :value="t.contract">
					{{ t.name }}
				</option>
			</select>
		</VCol>

		<VCol cols="12">
			<!-- TO -->
			<VTextField
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.to"
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
				:disabled="this.$store.state.pages.RVV1Vault.transferRequestB.for == 'Ether'"
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.token"
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
				:disabled="this.$store.state.pages.RVV1Vault.transferRequestB.for != 'ERC 721'"
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.tokenId"
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
				:disabled="this.$store.state.pages.RVV1Vault.transferRequestB.for == 'ERC 721'"
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.amount"
				type="number"
				label="Amount"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="4">
			<!-- Vote Close Time -->
			<VTextField
				v-model="this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp"
				type="number"
				label="Vote Close Time (Seconds From Now)"
				variant="outlined"
				hide-details
				class="mb-3"
				size="small"
			/>
		</VCol>

		<VCol cols="8">
			<h5 class="text-dark">
				Minutes: {{ this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp / 60 }} -
				Hours: {{ this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp / (60 * 60) }}
				<br/>
				Current Block Timestamp + Vote Close Time = Submittable Block Timestamp
				<br/>
				{{ this.currentBlockTimestamp }} + {{
					this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp
				}} = {{
					this.currentBlockTimestamp + this.parseIntoInt(
						this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp
					)
				}}
			</h5>
		</VCol>

		<VCol cols="12">
			<VBtn
				:disabled="this.creating"
				color="primary"
				class="w-100 rounded-xl elevation-0"
				@click="this.createWR()"
			>
				<VProgressCircular
					v-if="this.creating"
					indeterminate
					color="light"
					class=""
				/>

				<span v-else>Create Request</span>
			</VBtn>

			<h6 v-if="this.error" class="text-danger">{{ this.error }}</h6>
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";

	import YieldSyncV1Vault from "../../../abi/YieldSyncV1Vault";
	import yieldSyncV1BTransferRequestProtocol from "../../../abi/YieldSyncV1BTransferRequestProtocol";

	type Block = {
		number: number;
		hash: string;
		parentHash: string;
		nonce: string;
		sha3Uncles: string;
		logsBloom: string;
		transactionsRoot: string;
		stateRoot: string;
		miner: string;
		difficulty: string;
		totalDifficulty: string;
		extraData: string;
		size: number;
		gasLimit: number;
		gasUsed: number;
		timestamp: number;
		transactions: string[];
		uncles: string[];
	};

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

				currentBlockTimestamp: 0 as number,

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1BTransferRequestProtocol,

				creating: false,
				yieldSyncV1Vault: undefined as undefined | Contract,
				error: ""
			};
		},

		methods: {
			parseIntoInt(s: string): number
			{
				return parseInt(s);
			},

			setCurrentBlockTimestamp(): void
			{
				// Get the current block number
				this.$store.state.web3.eth.getBlockNumber((error: string, blockNumber: number) =>
				{
					if (error)
					{
						this.error = "Caught: " + String(error);

						return;
					}

					// Get the block details
					this.$store.state.web3.eth.getBlock(blockNumber, (error: string, block: Block) =>
					{
						if (error)
						{
							this.error = "Caught: " + String(error);

							return;
						}

						// Retrieve the timestamp of the current block
						this.currentBlockTimestamp = block.timestamp;

						console.log("Current block timestamp:", this.currentBlockTimestamp);
					});
				});
			},

			async createWR(): Promise<void>
			{
				const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
					yieldSyncV1BTransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				this.setCurrentBlockTimestamp();

				transferRequestProtocol.methods.yieldSyncV1Vault_transferRequestId_transferRequestCreate(
					this.vaultAddress,
					this.$store.state.pages.RVV1Vault.transferRequestB.for == "ERC 20" ? true : false,
					this.$store.state.pages.RVV1Vault.transferRequestB.for == "ERC 721" ? true : false,
					this.$store.state.pages.RVV1Vault.transferRequestB.to,
					(
						this.$store.state.pages.RVV1Vault.transferRequestB.token
					) ? this.$store.state.pages.RVV1Vault.transferRequestB.token : this.ZERO_ADDRESS,
					(
						this.$store.state.pages.RVV1Vault.transferRequestB.for == "ERC 721"
					) ? BigInt(10 ** 18) : BigInt(this.$store.state.pages.RVV1Vault.transferRequestB.amount * 10 ** 18),
					this.$store.state.pages.RVV1Vault.transferRequestB.tokenId,
					this.currentBlockTimestamp + parseInt(
						this.$store.state.pages.RVV1Vault.transferRequestB.voteCloseTimestamp
					)
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
			this.setCurrentBlockTimestamp();

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
