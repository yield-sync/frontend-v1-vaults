<template>
	<nav>
		<div style="margin-bottom: 36px;">
			<h2>Connect Wallet</h2>
			<button v-if="!$store.state.connected" @click="this.connectWallet()">Connect Wallet</button>
			<button v-if="$store.state.connected" @click="this.disconnectWallet()">Disconnect Wallet</button>
			<h1 v-if="$store.state.connected">{{ this.$store.state.address }}</h1>
			<h4>{{ error }}</h4>
		</div>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
		<router-link to="/sign-message">Sign Message</router-link>
	</nav>

	<router-view />
</template>

<script>

	export default {
		name: "App",

		methods: {
			async connectWallet()
			{
				console.log("Connecting wallet..");

				if (typeof window.ethereum !== "undefined")
				{
					window.ethereum.request({
						method: "eth_requestAccounts"
					})
						.then((accounts) =>
						{
							this.$store.state.connected = true;
							this.$store.state.address = accounts[0];

							console.log("Connected!");
						})
					;
				}
				else
				{
					this.$store.state.error = "No ethereum deteceted";
				}
			},

			async disconnectWallet()
			{
				this.$store.state.connected = false;
				this.$store.state.address = "";
			}
		},

		async created()
		{
			const accounts = await window.ethereum.request({
				method: "eth_accounts"
			});

			if (accounts && accounts.length > 0)
			{
				this.$store.state.connected = true;
				this.$store.state.address = accounts[0];
			}
		},
	};
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
