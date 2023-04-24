<template>
	<VRow>
		<VCol cols="3" md="1" lg="2" class="bg-light">
			<VContainer>
				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="currentTab = 'member'"
				>
					Member
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="currentTab = 'admin'"
				>
					Admin
				</VBtn>

				<VBtn
					color="dark"
					variant="tonal"
					class="w-100 mb-3 no-box-shadow"
					@click="currentTab = 'deploy'"
				>
					Deploy
				</VBtn>
			</VContainer>
		</VCol>

		<VCol cols="9" md="11" lg="10" class="bg-light">
			<CMember v-if="currentTab == 'member'" />

			<CDeploy v-if="currentTab == 'deploy'" />
		</VCol>
	</VRow>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import CDeploy from "@/components/V1Vaults/CDeploy.vue";
	import CMember from "@/components/V1Vaults/CMember.vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				currentTab: "member"
			};
		},

		components: {
			CDeploy,
			CMember
		},
	});
</script>
