<template>
	<VContainer>
		<VRow>
			<VCol cols="2">
				<h5 class="text-primary">Amount</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">Token</h5>
				<h6 class="text-primary">Token Symbol</h6>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">To</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">For Vote Count</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">Against Vote Count</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">Expand</h5>
			</VCol>
		</VRow>

		<VRow v-for="(w, i) in detailedWithdrawalRequests" :key="i">
			<VCol cols="2">
				<h6>{{ w.amount * 10 ** -18 }}</h6>
			</VCol>

			<VCol cols="2">
				<h6>{{ w.token }}</h6>
				<h6>{{ w.tokenSymbol }}</h6>
			</VCol>

			<VCol cols="2">
				<a :href="`https://etherscan.io/address/${w.to}`" target="_blank" rel="noopener noreferrer">
					<h6>
						{{ w.to.substring(0, 4) + "..." + w.to.substring(w.to.length - 4) }}
					</h6>
				</a>
			</VCol>

			<VCol cols="2">
				<h6>{{ w.forVoteCount }}</h6>
			</VCol>

			<VCol cols="2">
				<h6>{{ w.againstVoteCount }}</h6>
			</VCol>

			<VCol cols="2">
				<VBtn
					variant="tonal"
					color="primary"
					class="rounded-xl elevation-0"
					@click="opened[i] = !opened[i]"
				>Expand</VBtn>
			</VCol>

			<VCol v-if="opened[i]" cols="12">
				<VCard class="mb-6 px-6 py-6 rounded-xl elevation-0 bg-light-frost">
					<VRow>
						<VCol cols="2">
							<h4 class="mb-3 text-primary">WR Id: {{ w.id }}</h4>
						</VCol>

						<VCol cols="10" class="text-right">
							<h4 class="mb-3 text-primary" :title="w.creator">
								Created by
								{{ w.creator.substring(0, 4) + "..." + w.creator.substring(w.to.length - 4) }}
							</h4>
							<h4 class="text-dark"></h4>
						</VCol>

						<VCol cols="4" class="text-left">
							<h4 class="mb-3 text-primary">Asset</h4>
							<h4 v-if="w.forERC20">ERC 20</h4>
							<h4 v-else-if="w.forERC721">ERC 721</h4>
							<h4 v-else>Ether</h4>
						</VCol>

						<VCol cols="4" class="text-center">
							<h4 class="mb-3 text-primary">Amount</h4>
							<h4 class="text-dark">{{ w.amount * 10 ** -18 }}</h4>
						</VCol>

						<VCol cols="4" class="text-right">
							<h4 class="mb-3 text-primary">Token Contract</h4>
							<a
								:href="`https://etherscan.io/address/${w.tokenAddress}`"
								target="_blank"
								rel="noopener noreferrer"
								:title="w.tokenAddress"
							>
								<VBtn color="dark" variant="tonal" class="">
									🔗
									{{
										w.tokenAddress.substring(0, 4) + "..." + w.tokenAddress.substring(
											w.to.length - 4
										)
									}}
								</VBtn>
							</a>
						</VCol>

						<VCol cols="12">
							<h4 class="mb-3 text-primary">To</h4>
							<h4 class="text-dark">{{ w.to }}</h4>
						</VCol>

						<VCol cols="6">
							<h4 class="text-center mb-3 text-primary">For</h4>
							<v-progress-linear
								color="success"
								:model-value="(parseInt(w.forVoteCount) / againstVoteCountRequired * 100)"
								:height="32"
								striped
							>
								<strong>{{ w.forVoteCount }}/{{ againstVoteCountRequired }}</strong>
							</v-progress-linear>
						</VCol>

						<VCol cols="6">
							<h4 class="text-center mb-3 text-primary">Against</h4>
							<v-progress-linear
								color="danger"
								:model-value="(parseInt(w.againstVoteCount) / againstVoteCountRequired * 100)"
								:height="32"
								striped
							>
								<strong>{{ w.againstVoteCount }}/{{ againstVoteCountRequired }}</strong>
							</v-progress-linear>
						</VCol>

						<VCol cols="12">
							<h4 class="mb-3 text-primary">
								Latest Relevant For Vote Time: {{ w.latestRelevantApproveVoteTime }}
							</h4>
						</VCol>

						<VCol v-if=false cols="12">
							<h4 class="mb-3 text-primary">Voted Voter</h4>
							<h4 v-for="(v, i) in w.votedMembers" :key="i">
								{{ i + 1 }}. {{ v.substring(0, 4) + "..." + v.substring(v.length - 4) }}
							</h4>
						</VCol>

						<VCol cols="4">
							<VBtn
								:disabled="voting[w.id]"
								color="success"
								class="w-100 rounded-xl elevation-0"
								@click="voteOnWithdrawalRequest(w.id, true)"
							>
								Vote For
							</VBtn>
						</VCol>

						<VCol cols="4">
							<VBtn
								:disabled="voting[w.id]"
								color="danger"
								class="w-100 rounded-xl elevation-0"
								@click="voteOnWithdrawalRequest(w.id, false)"
							>
								Vote Against
							</VBtn>
						</VCol>

						<VCol cols="4">
							<VBtn
								:disabled="
									(
										parseInt(w.forVoteCount) < forVoteCountRequired &&
										parseInt(w.againstVoteCount) < againstVoteCountRequired
									) ||
										processing[w.id]
								"
								color="primary"
								class="w-100 rounded-xl elevation-0"
								@click="processWithdrawalRequest(w.id)"
							>
								Proccess Request
							</VBtn>
						</VCol>

						<VCol cols="12">
							<h6 v-if="error" class="text-danger">{{ error }}</h6>
						</VCol>
					</VRow>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
	import yieldSyncV1VaultABI from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CWithdrawalRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data()
		{
			return {
				voting: {
				} as {
					[key: string]: boolean
				},
				processing: {
				} as {
					[key: string]: boolean
				},
				yieldSyncV1Vault: undefined as undefined | Contract,
				againstVoteCountRequired: 0 as number,
				forVoteCountRequired: 0 as number,
				opened: {
				} as {
					[key: string]: boolean
				},
				idsOfOpenWithdrawalRequests: [
				],
				detailedWithdrawalRequests: [
				] as {
					id: number
					againstVoteCount: string
					amount: number
					creator: string
					forERC20: boolean
					forERC721: boolean
					forVoteCount: string
					latestRelevantApproveVoteTime: string
					to: string
					token: string
					tokenSymbol: string
					tokenAddress: string
					tokenId: string
					votedMembers: string[]
				}[],

				error: "" as string
			};
		},

		methods: {
			async getWithdrawalRequestData()
			{
				if (!this.yieldSyncV1Vault)
				{
					return;
				}

				this.detailedWithdrawalRequests = [
				];

				this.againstVoteCountRequired = await this.yieldSyncV1Vault.methods.againstVoteCountRequired().call();

				this.forVoteCountRequired = await this.yieldSyncV1Vault.methods.forVoteCountRequired().call();

				this.idsOfOpenWithdrawalRequests = await this.yieldSyncV1Vault.methods.idsOfOpenWithdrawalRequests()
					.call();

				for (let i = 0; i < this.idsOfOpenWithdrawalRequests.length; i++)
				{
					const wr = await this.yieldSyncV1Vault.methods.withdrawalRequestId_withdralRequest(
						this.idsOfOpenWithdrawalRequests[i]
					).call();

					// Get token details
					const erc20Contract = new this.$store.state.web3.eth.Contract(
						abiER20 as AbiItem[],
						wr.token
					);

					let name = "N.A.";
					let symbol = "N.A.";

					try
					{
						name = await erc20Contract.methods.name().call();
						symbol = await erc20Contract.methods.symbol().call();
					}
					catch (e)
					{
						console.log(e);
					}

					// Create a new Date object using the JavaScript timestamp
					const date = new Date(wr.latestRelevantApproveVoteTime * 1000);

					// Get the individual components of the date and time
					const year = date.getFullYear();
					const month = date.getMonth() + 1;
					const day = date.getDate();
					const hours = date.getHours();
					const minutes = date.getMinutes();
					const seconds = date.getSeconds();

					this.detailedWithdrawalRequests.push({
						id: this.idsOfOpenWithdrawalRequests[i],
						againstVoteCount: wr.againstVoteCount,
						amount: wr.amount,
						creator: wr.creator,
						forERC20: wr.forERC20,
						forERC721: wr.forERC721,
						forVoteCount: wr.forVoteCount,
						latestRelevantApproveVoteTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
						to: wr.to,
						token: !wr.forERC20 && !wr.forERC721 ? "Ether" : name,
						tokenSymbol: !wr.forERC20 && !wr.forERC721 ? "ETH" : symbol,
						tokenAddress: wr.token,
						tokenId: wr.tokenId,
						votedMembers: wr.votedMembers
					});
				}
			},

			async processWithdrawalRequest(wId: number)
			{
				if (!this.yieldSyncV1Vault)
				{
					return;
				}

				await this.yieldSyncV1Vault.methods.processWithdrawalRequest(wId).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.processing[wId] = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);

					if (confirmationNumber == 0)
					{
						this.processing[wId] = false;

						await this.getWithdrawalRequestData();
					}

				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.processing[wId] = false;
				});
			},

			async voteOnWithdrawalRequest(wId: number, vote: boolean)
			{
				if (!this.yieldSyncV1Vault)
				{
					return;
				}

				await this.yieldSyncV1Vault.methods.voteOnWithdrawalRequest(
					wId, vote
				).send({
					from: this.$store.state.wallet.accounts[0]
				}).on("sent", async () =>
				{
					this.voting[wId] = true;
				}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
				{
					console.log(`Confirmation #${confirmationNumber}`, receipt);
					if (confirmationNumber == 0)
					{
						await this.getWithdrawalRequestData();

						this.voting[wId] = false;
					}
				}).on("error", async (error: Error) =>
				{
					this.error = String(error);

					this.voting[wId] = false;
				});
			},
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.vaultAddress
			);

			await this.getWithdrawalRequestData();
		},
	});
</script>
