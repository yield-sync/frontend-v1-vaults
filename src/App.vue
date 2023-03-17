<template>
	<div class="bg-primary">
		<CNav/>

		<VContent>
			<RouterView />
		</VContent>

		<VSheet color="dark" class="py-6" style="height: 600px;">
			<VContainer class="">
				<VRow>
					<VCol
						cols="12"
						sm="6"
						md="4"
						class="text-center"
					>
						<RouterLink to="/about" class="mr-2 text-decoration-none text-white">
							<VBtn variant="primary">
								About
							</VBtn>
						</RouterLink>
					</VCol>

					<VCol
						cols="12"
						sm="6"
						md="4"
						class="text-center"
					>
						<RouterLink to="/about" class="mr-2 text-decoration-none text-white">
							<VBtn variant="primary">
								About
							</VBtn>
						</RouterLink>
					</VCol>

					<VCol
						cols="12"
						sm="6"
						md="4"
						class="text-center"
					>
						<RouterLink to="/about" class="mr-2 text-decoration-none text-white">
							<VBtn variant="primary">
								About
							</VBtn>
						</RouterLink>
					</VCol>
				</VRow>
			</VContainer>
		</VSheet>
	</div>
</template>

<script>
	import CNav from "./components/CNav.vue";

	export default {
		name: "App",

		components: {
			CNav
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

</style>
