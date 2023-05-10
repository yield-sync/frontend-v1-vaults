<template>
<VCard color="light" class="mb-3 px-6 py-6">
	<h3 class="text-center text-primary">Open Withdrawal Requests</h3>

	<VContainer>
		<VRow>
			<VCol cols="1">
				<h5 class="text-primary">For Vote Count</h5>
			</VCol>

			<VCol cols="1">
				<h5 class="text-primary">Against Vote Count</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">Amount</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-primary">Token</h5>
			</VCol>

			<VCol cols="1">
				<h5 class="text-primary">Token Symbol</h5>
			</VCol>

			<VCol cols="1">
				<h5 class="text-primary">Token Contract</h5>
			</VCol>

			<VCol cols="1">
				<h5 class="text-primary">To</h5>
			</VCol>

			<VCol cols="3">
				<h5 class="text-primary">Voted Members</h5>
			</VCol>
		</VRow>

		<VRow v-for="(w, i) in detailedWithdrawalRequests" :key="i">
			<VCol cols="1">
				<h6>{{ w.forVoteCount }}</h6>
			</VCol>

			<VCol cols="1">
				<h6>{{ w.againstVoteCount }}</h6>
			</VCol>

			<VCol cols="2">
				<h6>{{ w.amount }}</h6>
			</VCol>

			<VCol cols="2">
				<h6>
					{{ w.token }}
				</h6>
			</VCol>

			<VCol cols="1">
				<h6>
					{{ w.tokenSymbol }}
				</h6>
			</VCol>

			<VCol cols="1">
				<a
					:href="`https://etherscan.io/address/${w.tokenAddress}`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h6>
						{{
							w.tokenAddress.substring(0, 4) + "..." + w.tokenAddress.substring(w.tokenAddress.length - 4)
						}}
					</h6>
				</a>
			</VCol>

			<VCol cols="1">
				<a
					:href="`https://etherscan.io/address/${w.to}`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h6>
						{{ w.to.substring(0, 4) + "..." + w.to.substring(w.to.length - 4) }}
					</h6>
				</a>
			</VCol>

			<VCol cols="3">
				<h6>{{ w.votedMembers }}</h6>
			</VCol>
		</VRow>
	</VContainer>
</VCard>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import abiER20 from "../../abi/erc20";
	import yieldSyncV1VaultABI from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "CViewWithdrawalRequest",

		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data()
		{
			return {
				idsOfOpenWithdrawalRequests: [
				],
				detailedWithdrawalRequests: [
				] as {
					againstVoteCount: string
					amount: string
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
				}[]
			};
		},

		async created()
		{
			const contract = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.vaultAddress
			);

			this.idsOfOpenWithdrawalRequests = await contract.methods.idsOfOpenWithdrawalRequests().call();

			for (let i = 0; i < this.idsOfOpenWithdrawalRequests.length; i++)
			{
				const wr = await contract.methods.withdrawalRequestId_withdralRequest(
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

				this.detailedWithdrawalRequests.push({
					againstVoteCount: wr.againstVoteCount,
					amount: wr.amount,
					creator: wr.creator,
					forERC20: wr.forERC20,
					forERC721: wr.forERC721,
					forVoteCount: wr.forVoteCount,
					latestRelevantApproveVoteTime: wr.latestRelevantApproveVoteTime,
					to: wr.to,
					token: name,
					tokenSymbol: symbol,
					tokenAddress: wr.token,
					tokenId: wr.tokenId,
					votedMembers: wr.votedMembers
				});

			}

		},
	});
</script>
