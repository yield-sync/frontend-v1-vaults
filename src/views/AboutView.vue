<template>
	<div class="about">
		<h1>
			{{ this.aboutHeader }}
		</h1>
	</div>
</template>

<script>
	export default {
		name: "AboutView",

		data()
		{
			return {
				aboutHeader: "About Yield Sync"
			};
		}
	};
</script>
