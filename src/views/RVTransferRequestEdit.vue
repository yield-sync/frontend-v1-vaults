<template>
	<VContainer class="py-16">
		<div class="w-100 mx-auto" style="max-width: 1000px;">
			<VCard class="mb-6 rounded-xl elevation-0 bg-light-frost">
				<VCardTitle class="bg-primary text-light">
					<h4 class="m-0 text-center text-uppercase">Edit Transfer Request</h4>
				</VCardTitle>

				<VCardText class="mt-4">
					<VRow>
						<VCol sm="12">
							<!-- CREATOR -->
							<VTextField
								v-model="transferRequest.creator"
								type="text"
								label="Creator"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol cols="12">
							<VRadioGroup v-model="transferRequest.for" :label="'For: ' + transferRequest.for" inline>
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

						<VCol sm="12">
							<!-- TO -->
							<VTextField
								v-model="transferRequest.to"
								type="text"
								label="To"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>

						</VCol>
						<VCol sm="6">
							<!-- TOKEN -->
							<VTextField
								v-model="transferRequest.token"
								:disabled="transferRequest.for == 'Ether'"
								type="text"
								label="Token"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>

						</VCol>

						<VCol sm="2">
							<!-- TOKEN ID -->
							<VTextField
								v-model="transferRequest.tokenId"
								:disabled="transferRequest.for != 'ERC 721'"
								type="number"
								label="Token Id"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol sm="4">
							<!-- AMOUNT -->
							<VTextField
								v-model="transferRequest.amount"
								type="number"
								label="Amount"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol sm="6">
							<!-- For Vote Count -->
							<VTextField
								v-model="transferRequest.forVoteCount"
								type="number"
								label="For Vote Count"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol sm="6">
							<!-- Against Vote Count -->
							<VTextField
								v-model="transferRequest.againstVoteCount"
								type="number"
								label="Against Vote Count"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol sm="12">
							<!-- Latest Relevant For Vote Time -->
							<VTextField
								v-model="transferRequest.latestRelevantForVoteTime"
								type="number"
								label="Latest Relevant For Vote Time"
								variant="outlined"
								hide-details
								class="mb-3"
								size="small"
							/>
						</VCol>

						<VCol cols="12">
							<VRow
								v-for="(m, i) in transferRequest.votedMembers" :key="i"
								class="mb-3"
							>
								<VCol md="10">
									<h5 class="member-or-admin my-2">{{ m }}</h5>
								</VCol>
								<VCol md="2">
									<VBtn
										variant="tonal"
										color="danger"
										class="w-100 rounded-xl elevation-0 border"
										@click="removeVotedMember(i)"
									>
										✕
									</VBtn>
								</VCol>
							</VRow>

							<VRow>
								<VCol md="10">
									<VTextField v-model="addVotedMemberField" label="Address" variant="outlined" />
								</VCol>

								<VCol md="2">
									<VBtn
										variant="tonal"
										color="success"
										class="w-100 rounded-xl elevation-0 border"
										@click="addVotedMember()"
									>
										Add
									</VBtn>
								</VCol>
							</VRow>
						</VCol>

						<VCol sm="12">
							<VBtn
								:disabled="updating"
								color="success"
								variant="tonal"
								class="w-100 rounded-xl border"
								@click="updateWR()"
							>
								Update
							</VBtn>
						</VCol>
					</VRow>
				</VCardText>
			</VCard>
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { TransactionReceipt } from "web3-core";
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import yieldSyncV1VaultABI from "../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				updating: false,
				yieldSyncV1Vault: undefined as undefined | Contract,
				transferRequest: {
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					creator: "" as string,
					token: "" as string,
					tokenId: 0 as number,
					amount: 0 as number,
					to: "" as string,
					forVoteCount: 0 as number,
					againstVoteCount: 0 as number,
					latestRelevantForVoteTime: 0 as number,
					votedMembers: [
					] as string[],
				},
				error: "",
				addVotedMemberField: "",
			};
		},

		methods: {
			addVotedMember()
			{
				if (this.$store.state.web3.utils.isAddress(this.addVotedMemberField))
				{
					// Add member
					this.transferRequest.votedMembers = [
						...this.transferRequest.votedMembers,
						this.addVotedMemberField,
					];

					// Clear field
					this.addVotedMemberField = "";
				}
			},

			removeVotedMember(i: number)
			{
				console.log(i);

				if (i > -1)
				{
					this.transferRequest.votedMembers = this.transferRequest.votedMembers.filter(
						(m) =>
						{
							return m !== this.transferRequest.votedMembers[i];
						}
					);
				}
			},

			async updateWR()
			{
				if (this.yieldSyncV1Vault)
				{
					await this.yieldSyncV1Vault.methods.updateTransferRequest(
						this.$route.params.transferrequestid,
						[
							this.transferRequest.for == "ERC 20" ? true : false,
							this.transferRequest.for == "ERC 721" ? true : false,
							this.transferRequest.creator,
							this.transferRequest.token ?
								this.transferRequest.token : "0x0000000000000000000000000000000000000000"
							,
							this.transferRequest.tokenId,
							BigInt(this.transferRequest.amount * 10**18),
							this.transferRequest.to,
							this.transferRequest.forVoteCount,
							this.transferRequest.againstVoteCount,
							this.transferRequest.latestRelevantForVoteTime,
							this.transferRequest.votedMembers,
						]
					).send({
						from: this.$store.state.wallet.accounts[0]
					}).on("sent", async () =>
					{
						this.updating = true;
					}).on("confirmation", async (confirmationNumber: number, receipt: TransactionReceipt) =>
					{
						console.log(`Confirmation #${confirmationNumber}`, receipt);

						if (confirmationNumber == 0)
						{
							this.$store.state.pages.RVV1Vault.transferRequest.tab = "o";
							this.$store.state.pages.RVV1Vault.transferRequest.key++;
						}

						this.updating = false;
					}).on("error", async (error: Error) =>
					{
						this.error = String(error);

						this.updating = false;
					});
				}
			}
		},

		async created()
		{
			this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.$route.params.vaultaddress
			);

			if (this.yieldSyncV1Vault)
			{
				const transferRequest = await this.yieldSyncV1Vault.methods.transferRequestId_transferRequest(
					this.$route.params.transferrequestid
				).call();

				if (this.transferRequest)
				{
					if (transferRequest.forERC20 && !transferRequest.forERC721)
					{
						this.transferRequest.for = "ERC 20";
					}

					if (!transferRequest.forERC20 && transferRequest.forERC721)
					{
						this.transferRequest.for = "ERC 721";
					}

					this.transferRequest.creator = String(transferRequest.creator);
					this.transferRequest.token =  String(transferRequest.token);
					this.transferRequest.tokenId =  parseInt(transferRequest.tokenId);
					this.transferRequest.amount = parseInt(transferRequest.amount) * 10 ** -18;
					this.transferRequest.to = String(transferRequest.to);
					this.transferRequest.forVoteCount =  parseInt(transferRequest.forVoteCount);
					this.transferRequest.againstVoteCount =  parseInt(transferRequest.againstVoteCount);
					this.transferRequest.latestRelevantForVoteTime = parseInt(
						transferRequest.latestRelevantForVoteTime
					);
					this.transferRequest.votedMembers = transferRequest.votedMembers;
				}
			}
		},
	});
</script>
