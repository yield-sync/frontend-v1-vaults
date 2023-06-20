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

						<VCol sm="12">
							<VBtn
								color="success"
								variant="tonal"
								class="w-100 rounded-xl"
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
	import { Contract } from "web3-eth-contract";
	import { AbiItem } from "web3-utils";

	import yieldSyncV1VaultABI from "../abi/YieldSyncV1Vault";

	export default defineComponent({
		name: "RVV1Vault",

		data()
		{
			return {
				yieldSyncV1Vault: undefined as undefined | Contract,
				transferRequest: {
					for: "Ether" as "Ether" | "ERC 20" | "ERC 721",
					creator: "" as string,
					token: "" as string,
					tokenId: 0 as number,
					to: "" as string,
					amount: 0 as number,
				}
			};
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
					this.transferRequest.to = String(transferRequest.to);
					this.transferRequest.amount = parseInt(transferRequest.amount) * 10 ** -18;
				}
			}
		},
	});
</script>
