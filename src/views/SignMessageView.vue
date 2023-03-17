<template>
	<VContainer class="py-16">
		<VRow>
			<VCol cols="6" class="mx-auto">
				<VCard>
					<VCardTitle><h1 class="h3">Sign Data</h1></VCardTitle>

					<VCardItem>
						<VTextField v-model="inputData" type="text" label="Data to be signed"/>

						<VBtn @click="this.signMessage()" color="primary" class="w-100 mb-6">Sign</VBtn>

						<VTextField v-model="inputSignedData" type="text" label="Signed Data" />

						<VBtn @click="this.recoverMessage()" color="primary" class="w-100 mb-6">Recover</VBtn>

						<h3>Recovered</h3>
						<p>{{ recovered }}</p>
					</VCardItem>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script>
	import Web3 from "web3";

	export default {
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
					window.ethereum.selectedAddress,
					(error, inputSignedData) =>
					{
						if (error)
						{
							console.error(error);
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
	};
</script>
