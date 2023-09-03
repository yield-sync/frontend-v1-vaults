<template>
	<VCard class="mb-3 rounded-xl elevation-0 bg-transparent border border-dark">
		<VCardText>
			<VRow>
				<VCol cols="12" sm="3">
					<h6 class="text-center text-uppercase text-dark">
						🗳️ Voting in Progress
					</h6>
				</VCol>

				<VCol cols="12" sm="3">
					<h6 class="text-center text-uppercase text-dark">
						⏳ Waiting Delay
					</h6>
				</VCol>

				<VCol cols="12" sm="3">
					<h6 class="text-center text-uppercase text-dark">
						✅ Approved
					</h6>
				</VCol>

				<VCol cols="12" sm="3">
					<h6 class="text-center text-uppercase text-dark">
						❌ Denied
					</h6>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<VCard class="m-0 rounded-xl elevation-0 clear">
		<VCardText>
			<VRow>
				<VCol cols="1">
					<h6 class="text-center text-uppercase text-primary">Status</h6>
				</VCol>

				<VCol cols="3">
					<h6 class="text-center text-uppercase text-primary">Type | Token Symbol</h6>
				</VCol>

				<VCol cols="2">
					<h6 class="text-center text-uppercase text-primary">Amount / ID</h6>
				</VCol>

				<VCol cols="2">
					<h6 class="text-center text-uppercase text-primary">To</h6>
				</VCol>

				<VCol cols="2">
					<h6 class="text-center text-uppercase text-primary">For : Against</h6>
				</VCol>

				<VCol cols="2">
					<h6 class="text-center text-uppercase text-primary">View</h6>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>

	<div v-if="loading" class="text-center">
		<VProgressCircular
			class=""
			indeterminate
			color="primary"
		/>
	</div>

	<div v-if="!loading">
		<VCard v-if="detailedTransferRequests.length == 0" class="my-3 rounded-xl elevation-0 bg-transparent">
			<VCardText class="text-center">
				<h3 class="mb-6 text-uppercase text-primary">No Open Transfer Requests</h3>

				<VBtn
					variant="tonal"
					color="success"
					class="rounded-xl"
					@click="$store.state.pages.RVV1Vault.transferRequests.tab = 'c'"
				>
					Create
				</VBtn>
			</VCardText>
		</VCard>

		<VCard
			v-for="(dTR, i) in detailedTransferRequests"
			:key="i"
			class="my-3 rounded-xl elevation-0 bg-light-frost"
		>
			<VCardText>
				<VRow>
					<VCol v-if="!opened[i]" cols="1">
						<h4 class="mt-2 text-center">
							{{
								getTransferRequestStatus(dTR)
							}}
						</h4>
					</VCol>

					<VCol v-if="!opened[i]" cols="3">
						<h4 v-if="dTR.forERC20" class="mt-2 text-center text-primary">
							ERC 20 | {{ dTR.tokenSymbol }}
						</h4>

						<h4 v-else-if="dTR.forERC721" class="mt-2 text-center text-primary">
							ERC 721 | {{ dTR.tokenSymbol }}
						</h4>

						<h4 v-else class="mt-2 text-center text-primary">
							Ether | {{ dTR.tokenSymbol }}
						</h4>
					</VCol>

					<VCol v-if="!opened[i]" cols="2">
						<h4 v-if="!dTR.forERC721" class="mt-2 text-center">{{ dTR.amount * 10 ** -18 }}</h4>

						<h4 v-if="dTR.forERC721" class="mt-2 text-center">#{{ dTR.tokenId }}</h4>
					</VCol>

					<VCol v-if="!opened[i]" cols="2">
						<a
							:href="`https://etherscan.io/address/${dTR.to}`"
							target="_blank"
							rel="noopener noreferrer"
							:title="dTR.to"
							class="text-center text-dark"
						>
							<VBtn variant="plain" class="w-100 rounded-xl">
								🔗 {{ dTR.to.substring(0, 4) + "..." + dTR.to.substring(dTR.to.length - 4) }}
							</VBtn>
						</a>
					</VCol>

					<VCol v-if="!opened[i]" cols="2">
						<h3 class="mt-2 text-center">
							<span class="text-success">{{ dTR.voteForMembers.length }}</span>
							:
							<span class="text-danger">{{ dTR.voteAgainstMembers.length }}</span>
						</h3>
					</VCol>

					<VCol v-if="!opened[i]" cols="2">
						<VBtn
							variant="flat"
							color="primary"
							class="w-100 rounded-xl elevation-0"
							@click="opened[i] = true"
						>
							<h1 class="m-0">+</h1>
						</VBtn>
					</VCol>

					<VCol v-if="opened[i]" cols="12">
						<VRow>
							<VCol cols="1">
								<h4 class="mt-2 text-center">
									{{ getTransferRequestStatus(dTR) }}
								</h4>
							</VCol>

							<VCol cols="1">
								<RouterLink
									v-if="$route.query.admin == 'true'"
									:to="`/transfer-request-edit/${vaultAddress}/${dTR.id}`"
								>
									<VBtn color="admin" variant="flat" class="w-100 rounded-xl">
										Edit
									</VBtn>
								</RouterLink>
							</VCol>

							<VCol cols="8">
								<h3 class="mt-2 text-center text-uppercase text-primary">
									Transfer Request {{ dTR.id }}
								</h3>
							</VCol>

							<VCol cols="2">
								<VBtn
									variant="flat"
									color="primary"
									class="w-100 rounded-xl elevation-0"
									@click="opened[i] = false"
								>
									<h1 class="m-0">-</h1>
								</VBtn>
							</VCol>

							<VCol cols="4" class="text-left">
								<h4 v-if="dTR.forERC20" class="mb-3 text-center text-uppercase text-primary">
									ERC 20
								</h4>

								<h4 v-else-if="dTR.forERC721" class="mb-3 text-center text-uppercase text-primary">
									ERC 721
								</h4>

								<h4 v-else class="mb-3 text-center text-uppercase text-primary">
									Ether
								</h4>

								<a
									v-if="dTR.forERC20"
									:href="`https://etherscan.io/address/${dTR.tokenAddress}`"
									target="_blank"
									rel="noopener noreferrer"
									:title="dTR.tokenAddress"
								>
									<VBtn color="primary" variant="tonal" class="w-100 rounded-xl">
										🔗 {{ dTR.tokenSymbol }}
									</VBtn>
								</a>

								<a
									v-else-if="dTR.forERC721"
									:href="`https://etherscan.io/address/${dTR.tokenAddress}`"
									target="_blank"
									rel="noopener noreferrer"
									:title="dTR.tokenAddress"
								>
									<VBtn color="primary" variant="tonal" class="w-100 rounded-xl">
										🔗 {{ dTR.tokenSymbol }}
									</VBtn>
								</a>

								<a
									v-else
									href="https://etherscan.io/"
									target="_blank"
									rel="noopener noreferrer"
									class="text-decoration-none"
									:title="dTR.tokenAddress"
								>
									<VBtn color="primary" variant="tonal" class="w-100 rounded-xl">
										🔗 ETH
									</VBtn>
								</a>
							</VCol>

							<VCol v-if="!dTR.forERC721" cols="4" class="text-center">
								<h4 class="mb-3 text-uppercase text-primary">Amount</h4>

								<h3 class="text-dark">{{ dTR.amount * 10 ** -18 }}</h3>
							</VCol>

							<VCol v-if="dTR.forERC721" cols="4" class="text-center">
								<h4 class="mb-3 text-uppercase text-primary">Token Id</h4>

								<h3 class="text-dark">{{ dTR.tokenId }}</h3>
							</VCol>

							<VCol cols="4" class="text-center">
								<h4 class="mb-3 text-uppercase text-primary">Created By</h4>

								<a
									:href="`https://etherscan.io/address/${dTR.creator}`"
									target="_blank"
									rel="noopener noreferrer"
									class="text-decoration-none"
									:title="dTR.tokenAddress"
								>
									<h3 class="text-center text-uppercase text-dark" :title="dTR.creator">
										{{
											dTR.creator.substring(0, 4) + "..." + dTR.creator.substring(
												dTR.creator.length - 4
											)
										}}
									</h3>
								</a>
							</VCol>

							<VCol cols="12" class="text-center">
								<h4 class="mb-3 text-center text-uppercase text-primary">Transfer To</h4>

								<a
									:href="`https://etherscan.io/address/${dTR.to}`"
									target="_blank"
									rel="noopener noreferrer"
									class="text-decoration-none"
									:title="dTR.tokenAddress"
								>
									<h3 class="text-center text-uppercase text-dark">{{ dTR.to }}</h3>
								</a>
							</VCol>

							<VCol cols="6" class="text-center">
								<h4 class="text-center mb-3 text-success text-uppercase">For</h4>

								<VProgressLinear
									color="success"
									:model-value="(dTR.voteForMembers.length / voteForRequired * 100)"
									:height="36"
									striped
									class="mb-3 rounded-xl"
								>
									<strong>{{ dTR.voteForMembers.length }}/{{ voteForRequired }}</strong>
								</VProgressLinear>

								<VBtn
									v-if="(
										dTR.voteForMembers.length < voteForRequired &&
										dTR.voteAgainstMembers.length < voteAgainstRequired
									)"
									:disabled="
										voting[dTR.id] ||
											dTR.voteAgainstMembers.some(
												a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
											) ||
											dTR.voteForMembers.some(
												a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
											)
									"
									variant="flat"
									color="success"
									class="w-100 px-6 rounded-xl elevation-0"
									style="max-width: 200px;"
									@click="voteOnTransferRequest(dTR.id, true)"
								>
									<VProgressCircular
										v-if="voting[dTR.id]"
										indeterminate
										color="light"
										class=""
									/>

									<span v-else>Vote For</span>
								</VBtn>
							</VCol>

							<VCol cols="6" class="text-center">
								<h4 class="text-center mb-3 text-danger text-uppercase">Against</h4>

								<VProgressLinear
									color="danger"
									:model-value="(dTR.voteAgainstMembers.length / voteAgainstRequired * 100)"
									:height="36"
									striped
									class="mb-3 rounded-xl"
								>
									<strong>{{ dTR.voteAgainstMembers.length }}/{{ voteAgainstRequired }}</strong>
								</VProgressLinear>

								<VBtn
									v-if="(
										dTR.voteForMembers.length < voteForRequired &&
										dTR.voteAgainstMembers.length < voteAgainstRequired
									)"
									:disabled="
										voting[dTR.id] ||
											dTR.voteAgainstMembers.some(
												a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
											) ||
											dTR.voteForMembers.some(
												a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
											)
									"
									variant="flat"
									color="danger"
									class="w-100 px-6 rounded-xl elevation-0"
									style="max-width: 200px;"
									@click="voteOnTransferRequest(dTR.id, false)"
								>
									<VProgressCircular
										v-if="voting[dTR.id]"
										indeterminate
										color="light"
										class=""
									/>

									<span v-else>Vote Against</span>
								</VBtn>
							</VCol>

							<VCol
								v-if="
									dTR.voteAgainstMembers.some(
										a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
									) || dTR.voteForMembers.some(
										a => a.toLowerCase() == $store.state.wallet.accounts[0].toLowerCase()
									)
								"
								cols="12"
							>
								<h6 class="text-center text-dark">You have voted already</h6>
							</VCol>

							<VCol cols="6" class="text-center">
								<h4 class="mb-3 text-primary">Voted For Members</h4>

								<h4 v-for="(v, i) in dTR.voteForMembers" :key="i">
									{{ i + 1 }}. {{ v.substring(0, 4) + "..." + v.substring(v.length - 4) }}
								</h4>
							</VCol>

							<VCol cols="6" class="text-center">
								<h4 class="mb-3 text-primary">Voted Against Member</h4>

								<h4 v-for="(v, i) in dTR.voteAgainstMembers" :key="i">
									{{ i + 1 }}. {{ v.substring(0, 4) + "..." + v.substring(v.length - 4) }}
								</h4>
							</VCol>

							<!-- Time passed -->
							<VCol
								v-if="dTR.voteForMembers.length > 0 || asAdmin"
								cols="12"
								:sm="dTR.voteForMembers.length >= voteForRequired || asAdmin ? 6: 12"
							>
								<h4 class="mb-3 text-center text-primary">
									Latest Relevant For Vote Time
								</h4>

								<h3 class="mb-3 text-center text-dark">
									{{ dTR.latestForVoteTime }}
								</h3>
							</VCol>

							<!-- Time passed -->
							<VCol v-if="dTR.voteForMembers.length >= voteForRequired || asAdmin" cols="12" sm="6">
								<h4 class="mb-3 text-center text-primary">
									Time Passed / Transfer Delay (s)
								</h4>

								<h3 class="mb-3 text-center text-dark">
									{{ currentBlockTimestamp - dTR.latestRelevantForVoteBlockTimestamp }} /
									{{ transferDelaySeconds }}
								</h3>
							</VCol>

							<!-- Process TransferRequest Button -->
							<VCol
								v-if="getTransferRequestStatus(dTR) == '✅' || getTransferRequestStatus(dTR) == '❌'"
								cols="12"
							>
								<VBtn
									:disabled="processing[dTR.id]"
									color="primary"
									class="w-100 rounded-xl elevation-0"
									@click="processTransferRequest(dTR.id)"
								>
									<VProgressCircular
										v-if="processing[dTR.id]"
										indeterminate
										color="light"
										class=""
									/>

									<span v-else>Process Request</span>
								</VBtn>
							</VCol>

							<VCol v-if="transactionError[dTR.id]" cols="12">
								<h6 class="text-danger">{{ transactionError[dTR.id] }}</h6>
							</VCol>
						</VRow>
					</VCol>
				</VRow>
			</VCardText>
		</VCard>
	</div>

	<div v-if="error" cols="12">
		<h6 class="text-danger">{{ error }}</h6>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../../abi/erc20";
	import YieldSyncV1Vault from "../../../abi/YieldSyncV1Vault";
	import YieldSyncV1ATransferRequestProtocol from "../../../abi/YieldSyncV1ATransferRequestProtocol";

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

	type DetailedTransferRequest = {
		// Standard Transfer Request
		forERC20: boolean,
		forERC721: boolean,
		creator: string,
		to: string,
		token: string,
		amount: number,
		tokenId: string,
		// TRP Specific
		voteAgainstMembers: string[],
		voteForMembers: string[],
		latestRelevantForVoteBlockTimestamp: number,
		// Meta Data
		id: number,
		tokenSymbol: string,
		tokenAddress: string,
		latestForVoteTime: string,
	};

	export default defineComponent({
		name: "COpen",

		props: {
			vaultAddress: {
				required: true,
				type: String
			},

			asAdmin: {
				type: Boolean,
				default: false
			},
		},

		data()
		{
			return {
				loading: true as boolean,

				currentBlockTimestamp: 0 as number,

				voting: {
				} as {
					[key: string]: boolean,
				},

				processing: {
				} as {
					[key: string]: boolean,
				},

				yieldSyncV1Vault: undefined as undefined | Contract,

				voteAgainstRequired: 0 as number,

				voteForRequired: 0 as number,

				transferDelaySeconds: 0 as number,

				opened: {
				} as {
					[key: string]: boolean,
				},

				idsOfOpenTransferRequests: [
				] as number[],

				detailedTransferRequests: [
				] as DetailedTransferRequest[],

				error: "" as string,

				transactionError: {
				} as {
					[key: string]: string,
				},

				transferRequestProtocol: this.$store.state.config.networkChain[
					this.$store.state.currentChain.name
				].yieldSyncV1ATransferRequestProtocol,
			};
		},

		methods: {
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

			async getTransferRequestData(): Promise<void>
			{
				this.loading = true;

				const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1ATransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				this.detailedTransferRequests = [
				];

				this.voteAgainstRequired = (
					await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
						this.vaultAddress
					).call()
				)[0];

				this.voteForRequired = (
					await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
						this.vaultAddress
					).call()
				)[1];

				this.transferDelaySeconds = (
					await transferRequestProtocol.methods.yieldSyncV1Vault_yieldSyncV1VaultProperty(
						this.vaultAddress
					).call()
				)[2];

				this.idsOfOpenTransferRequests = (
					await transferRequestProtocol.methods.yieldSyncV1Vault_openTransferRequestIds(
						this.vaultAddress
					).call()
				);

				for (let i = 0; i < this.idsOfOpenTransferRequests.length; i++)
				{
					const tR = await transferRequestProtocol.methods
						.yieldSyncV1Vault_transferRequestId_transferRequest(
							this.vaultAddress,
							this.idsOfOpenTransferRequests[i]
						).call()
					;

					const tRP = await transferRequestProtocol.methods
						.yieldSyncV1Vault_transferRequestId_transferRequestPoll(
							this.vaultAddress,
							this.idsOfOpenTransferRequests[i]
						).call()
					;

					let name = "N.A.";
					let symbol = "N.A.";

					if (tR.token !== this.$store.state.ZERO_ADDRESS)
					{
						// Get token details
						const erc20Contract = new this.$store.state.web3.eth.Contract(
							abiER20 as AbiItem[],
							tR.token
						);

						try
						{
							name = await erc20Contract.methods.name().call();
							symbol = await erc20Contract.methods.symbol().call();
						}
						catch (e)
						{
							this.error = "erc20 Error: " + String(e);
						}
					}

					// Create a new Date object using the JavaScript timestamp
					const date = new Date(tRP.latestForVoteTime * 1000);

					// Get the individual components of the date and time
					const year = date.getFullYear();
					const month = date.getMonth() + 1;
					const day = date.getDate();
					const hours = date.getHours();
					const minutes = date.getMinutes();
					const seconds = date.getSeconds();

					this.detailedTransferRequests.push({
						id: this.idsOfOpenTransferRequests[i],
						amount: tR.amount,
						creator: tR.creator,
						forERC20: tR.forERC20,
						forERC721: tR.forERC721,
						latestForVoteTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
						latestRelevantForVoteBlockTimestamp: tRP.latestForVoteTime,
						to: tR.to,
						token: !tR.forERC20 && !tR.forERC721 ? "Ether" : name,
						tokenSymbol: !tR.forERC20 && !tR.forERC721 ? "ETH" : symbol,
						tokenAddress: tR.token,
						tokenId: tR.tokenId,
						voteAgainstMembers: tRP.voteAgainstMembers,
						voteForMembers: tRP.voteForMembers,
					});
				}

				this.loading = false;
			},

			getTransferRequestStatus(dTR: DetailedTransferRequest): "🗳️" | "❌" | "✅" | "⏳"
			{
				return (
					dTR.voteForMembers.length < this.voteForRequired &&
					dTR.voteAgainstMembers.length < this.voteAgainstRequired
				) ? "🗳️" : (
					dTR.voteAgainstMembers.length >= this.voteAgainstRequired
				) ? "❌" : (
					this.currentBlockTimestamp - dTR.latestRelevantForVoteBlockTimestamp >= this.transferDelaySeconds
				) ?  "✅" : "⏳";
			},

			async voteOnTransferRequest(tRId: number, vote: boolean): Promise<void>
			{
				if (!this.vaultAddress || !this.transferRequestProtocol)
				{
					return;
				}

				const transferRequestProtocol: Contract = new this.$store.state.web3.eth.Contract(
					YieldSyncV1ATransferRequestProtocol as AbiItem[],
					this.transferRequestProtocol
				);

				transferRequestProtocol.methods.yieldSyncV1Vault_transferRequestId_transferRequestPollVote(
					this.vaultAddress,
					tRId,
					vote
				).send({
					from: this.$store.state.wallet.accounts[0]
				}).on(
					"sent",
					async () =>
					{
						this.voting[tRId] = true;
					}
				).on(
					"confirmation",
					async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							await this.getTransferRequestData();

							this.voting[tRId] = false;
						}
					}
				).on(
					"error",
					async (error: Error) =>
					{
						this.transactionError[tRId] = error.message ? error.message : "Something went wrong!";

						this.voting[tRId] = false;
					}
				);
			},

			async processTransferRequest(tRId: number): Promise<void>
			{
				if (!this.vaultAddress)
				{
					return;
				}

				const yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
					YieldSyncV1Vault as AbiItem[],
					this.vaultAddress
				);

				if (!yieldSyncV1Vault)
				{
					return;
				}

				yieldSyncV1Vault.methods.yieldSyncV1Vault_transferRequestId_transferRequestProcess(
					tRId
				).send({
					from: this.$store.state.wallet.accounts[0]
				}).on(
					"sent",
					async () =>
					{
						this.processing[tRId] = true;
					}
				).on(
					"confirmation",
					async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							this.processing[tRId] = false;

							await this.getTransferRequestData();
						}

					}
				).on(
					"error",
					async (error: Error) =>
					{
						this.transactionError[tRId] = error.message ? error.message : "Something went wrong!";

						this.processing[tRId] = false;
					}
				);
			},
		},

		async created(): Promise<void>
		{
			this.setCurrentBlockTimestamp();
			await this.getTransferRequestData();
		}
	});
</script>

<style lang="scss" scoped>
	.clear {
		background-color: rgba(255, 255, 255, 0);
	}
</style>
