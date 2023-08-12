<template>
	<VRow style="margin: 0; padding: 0;">
		<VCol cols="6" style="margin: 0; padding: 0;">
			<VBtn
				:variant="trp == 'a' ? 'flat' : 'outlined'"
				color="primary"
				:class="trp == 'a' ? '' : 'bg-light-frost'"
				class="w-100 mb-3 rounded-s-xl elevation-0 border-primary font-weight-bold"
				style="
					border-top-right-radius: 0px !important;
					border-bottom-right-radius: 0px !important;
				"
				@click="trp = 'a'"
			>
				TRP A
			</VBtn>
		</VCol>

		<VCol cols="6" style="margin: 0; padding: 0;">
			<VBtn
				:variant="trp == 'b' ? 'flat' : 'outlined'"
				color="primary"
				:class="trp == 'b' ? '' : 'bg-light-frost'"
				class="w-100 mb-3 rounded-e-xl elevation-0 border-primary  font-weight-bold"
				style="
					border-top-left-radius: 0px !important;
					border-bottom-left-radius: 0px !important;
				"
				@click="trp = 'b'"
			>
				TRP B
			</VBtn>
		</VCol>
	</VRow>

	<TRPA v-if="trp == 'a'" />
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	import TRPA from "./Deploy/TRPA.vue";

	export default defineComponent({
		name: "RVGovernance",

		components: {
			TRPA
		},

		data() {
			return {
				trp: "a" as "a" | "b"
			}
		},
	});
</script>

<style lang="scss" scoped>
	.member-or-admin {
		word-wrap: break-word;
	}
</style>
