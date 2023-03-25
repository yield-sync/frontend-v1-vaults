<template>
	<VContainer class="py-16">
		<VRow>
			<VCol cols="6" class="mx-auto">
				<VCard>
					<VCardItem>
						<VCardTitle>
							Sign Data
						</VCardTitle>
					</VCardItem>

					<VCardItem>
						<VTextField v-model="inputData" type="text" label="Data to be signed"/>

						<VBtn @click="signMessage()" color="primary" class="w-100 mb-6">Sign</VBtn>
					</VCardItem>

					<VCardItem>
						<VTextField v-model="inputSignedData" type="text" label="Signed Data" />

						<VBtn @click="recoverMessage()" color="primary" class="w-100 mb-6">Recover</VBtn>
					</VCardItem>

					<VCardItem>
						<VCardTitle>
							Recovered
						</VCardTitle>

						<VCardSubtitle>
							<p>{{ recovered }}</p>
						</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script>
	import { defineComponent } from "vue";
	import Web3 from "web3";

	export default defineComponent({
		name: "SignMessage",

		data()
		{
			return {
				web3: new Web3(window.ethereum),

				inputData: "",
				inputSignedData: "",

				recovered: "",

				error: ""
			};
		},

		methods: {
			async signMessage()
			{
				this.web3.eth.personal.sign(
					this.web3.utils.utf8ToHex(this.inputData),
					this.$store.state.accounts[0],
					undefined,
					(error, inputSignedData) =>
					{
						if (error)
						{
							this.error = error;
						}
						else
						{
							this.inputSignedData = inputSignedData;
						}
					}
				);
			},

			async recoverMessage()
			{
				this.web3.eth.personal.ecRecover(
					this.inputData,
					this.inputSignedData
				).then(
					(r) =>
					{
						this.recovered = r;
					}
				);
			}
		}
	});
</script>
