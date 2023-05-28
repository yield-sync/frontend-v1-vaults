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
				<h6>{{ w.amount }}</h6>
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
				<VBtn variant="tonal" color="primary" @click="opened[i] = !opened[i]">Expand</VBtn>
			</VCol>

			<VCol v-if="opened[i]" cols="12" class="bg-light">
				<VRow>
					<VCol cols="3">
						<h4 class="text-primary">WR Id</h4>
						<h4 class="text-dark">{{ w.id }}</h4>
					</VCol>

					<VCol cols="3">
						<h4 class="text-primary">For Votes</h4>
						<h4 class="text-dark">{{ w.forVoteCount }}/{{ againstVoteCountRequired }}</h4>
					</VCol>

					<VCol cols="3">
						<h4 class="text-primary">Against Votes</h4>
						<h4 class="text-dark">{{ w.againstVoteCount }}/{{ againstVoteCountRequired }}</h4>
					</VCol>

					<VCol cols="3">
						<h4 class="text-primary">Latest Relevant Approve Vote Time</h4>
						<h4 class="text-dark">{{ w.latestRelevantApproveVoteTime }}</h4>
					</VCol>

					<VCol cols="3">
						<h4 class="text-primary">Asset</h4>
						<h4 v-if="w.forERC20">ERC 20</h4>
						<h4 v-else-if="w.forERC721">ERC 721</h4>
						<h4 v-else>Ether</h4>
					</VCol>

					<VCol cols="6">
						<h4 class="text-primary">Token Contract</h4>
						<h4>{{ w.creator }}</h4>
					</VCol>

					<VCol cols="3">
						<h4 class="text-primary">Amount</h4>
						<h4 class="text-dark">{{ w.amount }}</h4>
					</VCol>

					<VCol cols="6">
						<h4 class="text-primary">Creator</h4>
						<h4 class="text-dark">{{ w.creator }}</h4>
					</VCol>

					<VCol cols="6">
						<h4 class="text-primary">To</h4>
						<h4 class="text-dark">{{ w.to }}</h4>
					</VCol>

					<VCol cols="4">
						<VBtn color="success" class="w-100" @click="voteOnWithdrawalRequest(w.id, true)">
							Vote For
						</VBtn>
					</VCol>

					<VCol cols="4">
						<VBtn color="danger" class="w-100" @click="voteOnWithdrawalRequest(w.id, false)">
							Vote Against
						</VBtn>
					</VCol>

					<VCol cols="4">
						<h6>{{ w.votedMembers }}</h6>
					</VCol>

					<VCol cols="12">
						<VBtn
							:disabled="
								parseInt(w.forVoteCount) >= forVoteCountRequired ||
								parseInt(w.againstVoteCount) >= againstVoteCountRequired
							"
							color="success"
							class="w-100"
							@click="processWithdrawalRequest(w.id)"
						>
							Proccess Withdrawal Request
						</VBtn>
					</VCol>
				</VRow>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Contract } from "web3-eth-contract";
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

	data() {
		return {
			yieldSyncV1Vault: undefined as undefined | Contract,
			againstVoteCountRequired: 0 as number,
			forVoteCountRequired: 0 as number,
			opened: {} as {
				[key: string]: boolean
			},
			idsOfOpenWithdrawalRequests: [
			],
			detailedWithdrawalRequests: [
			] as {
				id: number
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

	methods: {
		async processWithdrawalRequest(wId: number) {
			if (!this.yieldSyncV1Vault) {
				return
			}

			this.againstVoteCountRequired = await this.yieldSyncV1Vault.methods.processWithdrawalRequest(wId).send({
				from: this.$store.state.wallet.accounts[0]
			});
		},

		async voteOnWithdrawalRequest(wId: number, vote: boolean) {
			if (!this.yieldSyncV1Vault) {
				return
			}

			this.againstVoteCountRequired = await this.yieldSyncV1Vault.methods.voteOnWithdrawalRequest(
				wId, vote
			).send({
				from: this.$store.state.wallet.accounts[0]
			});
		},
	},

	async created() {
		this.yieldSyncV1Vault = new this.$store.state.web3.eth.Contract(
			yieldSyncV1VaultABI as AbiItem[],
			this.vaultAddress
		);

		if (!this.yieldSyncV1Vault) {
			return
		}

		this.againstVoteCountRequired = await this.yieldSyncV1Vault.methods.againstVoteCountRequired().call();
		this.forVoteCountRequired = await this.yieldSyncV1Vault.methods.forVoteCountRequired().call();

		this.idsOfOpenWithdrawalRequests = await this.yieldSyncV1Vault.methods.idsOfOpenWithdrawalRequests().call();

		for (let i = 0; i < this.idsOfOpenWithdrawalRequests.length; i++) {
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

			try {
				name = await erc20Contract.methods.name().call();
				symbol = await erc20Contract.methods.symbol().call();
			}
			catch (e) {
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
});
</script>
