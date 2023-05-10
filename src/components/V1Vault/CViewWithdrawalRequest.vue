<template lang="">
	<VContainer>
		<div v-for="(w, i) in detailedWithdrawalRequests" :key="i">
			{{ w }}
		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { AbiItem } from "web3-utils";

	import yieldSyncV1VaultABI from "../../abi/YieldSyncV1Vault";

	export default defineComponent({
		props: {
			vaultAddress: {
				required: true,
				type: String
			}
		},

		data() {
			return {
				idsOfOpenWithdrawalRequests: [],
				detailedWithdrawalRequests: [] as {
					againstVoteCount: string
					amount: string
					creator: string
					forERC20: boolean
					forERC721: boolean
					forVoteCount: string
					latestRelevantApproveVoteTime: string
					to: string
					token: string
					tokenId: string
					votedMembers: string[]
				}[]
			}
		},

		async created() {
			const contract = new this.$store.state.web3.eth.Contract(
				yieldSyncV1VaultABI as AbiItem[],
				this.vaultAddress
			);

			this.idsOfOpenWithdrawalRequests = await contract.methods.idsOfOpenWithdrawalRequests().call();

			for (let i = 0; i < this.idsOfOpenWithdrawalRequests.length; i++) {
				const wr = await contract.methods.withdrawalRequestId_withdralRequest(
					this.idsOfOpenWithdrawalRequests[i]
				).call();

				this.detailedWithdrawalRequests.push({
					againstVoteCount: wr.againstVoteCount,
					amount: wr.amount,
					creator: wr.creator,
					forERC20: wr.forERC20,
					forERC721: wr.forERC721,
					forVoteCount: wr.forVoteCount,
					latestRelevantApproveVoteTime: wr.latestRelevantApproveVoteTime,
					to: wr.to,
					token: wr.token,
					tokenId: wr.tokenId,
					votedMembers: wr.votedMembers
				});

			}

		},
	})
</script>
