<template>
	<VSheet color="dark" class="py-6" style="height: 600px;">
		<VContainer class="">
			<VRow>
				<VCol
					cols="12"
					sm="6"
					md="4"
					class="text-center"
				/>

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
				/>
			</VRow>
		</VContainer>
	</VSheet>
</template>

<script>
	export default {
		name: "CFooter",
	};
</script>
