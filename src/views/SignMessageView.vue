<template>
	<div>
		<div style="margin-bottom: 36px;">
			<h2>Data to be Signed</h2>
			<input v-model="data" type="text" style="margin-bottom: 10px;"/>

			<button @click="this.signMessage()">Sign Data</button>

			<h4>Signed Data: {{ signedData }}</h4>
		</div>

		<hr/>

		<div style="margin-bottom: 36px;">
			<h2>Recover Message</h2>

			<h3>Data</h3>
			<input v-model="inputData" type="text" style="margin-bottom: 10px;"/>
			<br/>

			<h3>Signed Data</h3>
			<input v-model="inputSignedData" type="text" style="margin-bottom: 10px;"/>
			<br/>

			<button @click="this.recoverMessage()">Recover</button>

			<h3>Recovered</h3>
			<h3>{{ recovered }}</h3>
		</div>
	</div>
</template>

<script>
	import Web3 from "web3";

	export default {
		name: "SignMessage",

		data()
		{
			return {
				web3: new Web3(window.ethereum),

				data: "",
				signedData: "",

				inputData: "",
				inputSignedData: "",

				recovered: "",

				error: ""
			}
		},

		methods: {
			async signMessage()
			{
				this.web3.eth.personal.sign(
					this.web3.utils.utf8ToHex(this.data),
					window.ethereum.selectedAddress,
					(error, signedData) =>
					{
						if (error)
						{
							console.error(error);
							this.error = error;
						}
						else
						{
							this.signedData = signedData;
						}
					}
				);
			},

			async recoverMessage()
			{
				//ecrecover([], v, r, s)
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
	}
</script>
