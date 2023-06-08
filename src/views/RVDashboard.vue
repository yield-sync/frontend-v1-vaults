<template>
	<VContainer style="padding: 160px 0;">
		<div class="w-100 mx-auto" style="max-width: 800px;">
			<VRow
				bg-color="primary"
				color="dark"
				fixed-tabs
				class="mb-3"
			>
				<VCol cols="4">
					<VBtn
						:class="tab == 'm' ? 'bg-primary text-white' : 'bg-light-frost text-primary'"
						class="w-100 rounded-pill elevation-0"
						@click="tab = 'm'"
					>
						<h3>V1 Vault Memberships</h3>
					</VBtn>
				</VCol>

				<VCol cols="4">
					<VBtn
						:class="tab == 'a' ? 'bg-primary text-white' : 'bg-light-frost text-primary'"
						class="w-100 rounded-pill elevation-0"
						@click="tab = 'a'"
					>
						<h3>V1 Vault Adminships</h3>
					</VBtn>
				</VCol>

				<VCol cols="4">
					<VBtn
						:class="tab == 'd' ? 'bg-primary text-white' : 'bg-light-frost text-primary'"
						class="w-100 rounded-pill elevation-0"
						@click="tab = 'd'"
					>
						<h3>Deploy a Vault</h3>
					</VBtn>
				</VCol>
			</VRow>


			<CMemberships v-if="tab == 'm'" />
			<CAdminships v-if="tab == 'a'" />
			<CDeploy v-if="tab == 'd'" />

		</div>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import CDeploy from "@/components/Dashboard/CDeploy.vue";
	import CAdminships from "@/components/Dashboard/CAdminships.vue";
	import CMemberships from "@/components/Dashboard/CMemberships.vue";

	export default defineComponent({
		name: "RVGovernance",

		data()
		{
			return {
				tab: "m",
				currentTab: "member",
			};
		},

		components: {
			CDeploy,
			CAdminships,
			CMemberships
		},
	});
</script>
