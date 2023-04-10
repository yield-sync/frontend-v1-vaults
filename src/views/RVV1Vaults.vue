<template>
	<VContainer>
		<VRow>
			<VCol cols="12">
				<h2 class="text-center text-uppercase">V1 Vaults</h2>
			</VCol>

			<VCol cols="12">
				<h3 class="mb-3 text-center text-uppercase">V1 Vault Memberships</h3>

				<h5 class="text-center">{{ v1Vaults }}</h5>

				<h6 class="text-center">Record Contract: {{ record }}</h6>
			</VCol>

			<VCol cols="12">
				<h3 class="mb-3 text-center text-uppercase">Deploy a Vault</h3>
			</VCol>

			<VCol cols="12" md="6">
				<div class="mb-4 px-3 py-3 border">
					<h5>Admins</h5>

					<div
						v-for="(a, i) in deployParams.admins" :key="i"
						class="mb-3"
					>
						<VRow>
							<VCol>
								<h5 class="my-2">{{ a }}</h5>
							</VCol>
							<VCol>
								<VBtn color="warning" size="small" variant="outlined" class="w-100">Remove</VBtn>
							</VCol>
						</VRow>
					</div>

					<VBtn color="success" class="w-100" size="small">+ Admin</VBtn>
				</div>

				<div class="mb-4 px-3 py-3 border">
					<h5>Members</h5>

					<div
						v-for="(m, i) in deployParams.members" :key="i"
						class="mb-3"
					>
						<VRow>
							<VCol>
								<h5 class="my-2">{{ m }}</h5>
							</VCol>
							<VCol>
								<VBtn color="warning" size="small" variant="outlined" class="w-100">Remove</VBtn>
							</VCol>
						</VRow>
					</div>

					<VBtn color="success" class="w-100" size="small">+ Memver</VBtn>
				</div>
			</VCol>

			<VCol cols="12" md="6">
				<VTextField
					v-model="deployParams.signatureManager"
					type="text"
					label="Signature Manager"
					variant="outlined"
					hide-details
					class="mb-3"
				/>

				<VTextField
					v-model="deployParams.againstVoteCountRequired"
					type="number"
					label="Against Vote Count"
					variant="outlined"
					hide-details
					class="mb-3"
				/>

				<VTextField
					v-model="deployParams.forVoteCountRequired"
					type="number"
					label="For Vote Count"
					variant="outlined"
					hide-details
					class="mb-3"
				/>

				<VTextField
					v-model="deployParams.withdrawalDelaySeconds"
					type="number"
					label="Withdrawal Delay (Seconds)"
					variant="outlined"
					hide-details
					class="mb-3"
				/>
			</VCol>

			<VCol cols="12">
				<VBtn color="primary" class="w-100 mb-3" @click="deployYieldSyncV1Vault()">
					Deploy
				</VBtn>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { ethers } from "ethers";


	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				record: "",
				v1Vaults: [
				],

				deployParams: {
					admins: [
						this.$store.state.accounts[0],
					] as string[],
					members: [
						this.$store.state.accounts[0],
					] as string[],
					signatureManager: ethers.ZeroAddress as string,
					useDefaultSignatureManager: false as boolean,
					againstVoteCountRequired: undefined as number | undefined,
					forVoteCountRequired: undefined as number | undefined,
					withdrawalDelaySeconds: undefined as number | undefined
				},
			};
		},

		methods: {
			async deployYieldSyncV1Vault()
			{
				try
				{
					await this.$store.state.contract.yieldSyncV1VaultFactory.methods.deployYieldSyncV1Vault(
						this.deployParams.admins,
						this.deployParams.members,
						this.deployParams.signatureManager,
						this.deployParams.useDefaultSignatureManager,
						this.deployParams.againstVoteCountRequired,
						this.deployParams.forVoteCountRequired,
						this.deployParams.withdrawalDelaySeconds
					).send({
						from: this.$store.state.accounts[0]
					});
				}
				catch (e)
				{
					console.error(e);
				}
			}
		},

		async created()
		{
			this.record = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.YieldSyncV1VaultRecord()
				.call();

			this.v1Vaults = await this.$store.state.contract.yieldSyncV1VaultRecord.methods.member_yieldSyncV1Vaults(
				this.$store.state.accounts[0]
			).call();
		},
	});
</script>
