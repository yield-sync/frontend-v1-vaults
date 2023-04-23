<template>
	<VRow>
		<VCol cols="3" lg="2" xl="1" class="bg-primary">

		</VCol>

		<VCol cols="9" lg="10" xl="11" class="bg-white">
			<VContainer>
				<VRow>
					<VCol cols="12">
						<h3 class="mb-3 text-center text-uppercase">V1 Vault Memberships</h3>

						<h5 class="text-center">{{ v1Vaults }}</h5>

						<h6 class="text-center">Record Contract: {{ record }}</h6>
					</VCol>

					<VCol cols="12">
						<h3 class="mb-3 text-center text-uppercase">Deploy a Vault</h3>
					</VCol>

					<!-- Sig Manager -->
					<VCol cols="12">
						<VTextField
							v-model="deployParams.signatureManager"
							type="text"
							label="Signature Manager"
							variant="outlined"
							hide-details
							class="mb-3"
							size="small"
						/>
					</VCol>

					<!-- Against -->
					<VCol md="4">
						<VTextField
							v-model="deployParams.againstVoteCountRequired"
							type="number"
							label="Against Vote Count"
							variant="outlined"
							hide-details
							class="mb-3"
						/>
					</VCol>

					<!-- For -->
					<VCol md="4">
						<VTextField
							v-model="deployParams.forVoteCountRequired"
							type="number"
							label="For Vote Count"
							variant="outlined"
							hide-details
							class="mb-3"
						/>
					</VCol>

					<!-- Withdrawal Delay -->
					<VCol md="4">
						<VTextField
							v-model="deployParams.withdrawalDelaySeconds"
							type="number"
							label="Withdrawal Delay (Seconds)"
							variant="outlined"
							hide-details
							class="mb-3"
						/>
					</VCol>

					<!-- Admins -->
					<VCol md="6">
						<div class="mb-4 px-3 py-3 border">
							<h5>Admins</h5>

							<VRow
								v-for="(m, i) in deployParams.admins" :key="i"
								class="mb-3"
							>
								<VCol md="10">
									<h6 class="my-2">{{ m }}</h6>
								</VCol>
								<VCol md="2">
									<VBtn
										color="warning"
										size="small"
										class="w-100"
										@click="removeAdmin(i)"
									>✕</VBtn>
								</VCol>
							</VRow>

							<VRow>
								<VCol md="10">
									<VTextField v-model="addAdminField" label="Address" variant="outlined" />
								</VCol>
								<VCol md="2">
									<VBtn
										color="success"
										class="w-100 my-3"
										size="small"
										@click="addAdmin()"
									>+</VBtn>
								</VCol>
							</VRow>
						</div>
					</VCol>

					<!-- Members -->
					<VCol md="6">
						<div class="mb-4 px-3 py-3 border">
							<h5>Members</h5>

							<VRow
								v-for="(m, i) in deployParams.members" :key="i"
								class="mb-3"
							>
								<VCol md="10">
									<h6 class="my-2">{{ m }}</h6>
								</VCol>
								<VCol md="2">
									<VBtn
										color="warning"
										size="small"
										class="w-100"
										@click="removeMember(i)"
									>✕</VBtn>
								</VCol>
							</VRow>

							<VRow>
								<VCol md="10">
									<VTextField v-model="addMemberField" label="Address" variant="outlined" />
								</VCol>
								<VCol md="2">
									<VBtn
										color="success"
										class="w-100 my-3"
										size="small"
										@click="addMember()"
									>+</VBtn>
								</VCol>
							</VRow>
						</div>
					</VCol>

					<VCol cols="12">
						<h6>{{ deploymentFee }}</h6>
						<VBtn color="primary" class="w-100 mb-3" @click="deployYieldSyncV1Vault()">
							Deploy
						</VBtn>
					</VCol>
				</VRow>
			</VContainer>
		</VCol>
	</VRow>
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

				addAdminField: "",
				addMemberField: "",

				deploymentFee: 0,

				deployParams: {
					admins: [
						this.$store.state.accounts[0],
					] as string[],
					members: [
						this.$store.state.accounts[0],
					] as string[],
					signatureManager: ethers.ZeroAddress as string,
					useDefaultSignatureManager: false as boolean,
					againstVoteCountRequired: 1 as number | undefined,
					forVoteCountRequired: 1 as number | undefined,
					withdrawalDelaySeconds: 0 as number | undefined
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
			},

			addAdmin()
			{
				if (this.$store.state.web3.utils.isAddress(this.addAdminField))
				{
					this.deployParams.admins.push(this.addAdminField);
					this.addAdminField = ""
				}
			},

			removeAdmin(i: number)
			{
				if (i > -1)
				{
					this.deployParams.admins.splice(i, 1);
				}
			},

			addMember()
			{
				if (this.$store.state.web3.utils.isAddress(this.addMemberField))
				{
					this.deployParams.members.push(this.addMemberField);
					this.addMemberField = ""
				}
			},

			removeMember(i: number)
			{
				if (i > -1)
				{
					this.deployParams.members.splice(i, 1);
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

			this.deploymentFee = await this.$store.state.contract.yieldSyncV1VaultFactory.methods.fee().call();
		},
	});
</script>
