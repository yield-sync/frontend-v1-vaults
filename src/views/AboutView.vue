<template>
	<VContainer>
		<h1 class="text-center">{{ this.header }}</h1>
	</VContainer>
</template>

<script>
	export default {
		name: "AboutView",

		data()
		{
			return {
				header: "About"
			};
		}
	};
</script>
