<template>
	<VContainer class="py-16">
		<VRow
			bg-color="primary"
			color="dark"
			fixed-tabs
			class="mb-3"
		>
			<VCol>
				<VBtn :color="tab == 'm' ? 'primary' : 'white'" class="w-100 elevation-0" @click="tab = 'm'">
					<h3>V1 Vault Memberships</h3>
				</VBtn>
			</VCol>

			<VCol>
				<VBtn :color="tab == 'a' ? 'primary' : 'white'" class="w-100 elevation-0" @click="tab = 'a'">
					<h3>V1 Vault Adminships</h3>
				</VBtn>
			</VCol>

			<VCol>
				<VBtn :color="tab == 'd' ? 'primary' : 'white'" class="w-100 elevation-0" @click="tab = 'd'">
					<h3>Deploy a Vault</h3>
				</VBtn>
			</VCol>
		</VRow>

		<VCard class="elevation-0">
			<VCardText>
				<CMemberships v-if="tab == 'm'" />
				<CAdminships v-if="tab == 'a'" />
				<CDeploy v-if="tab == 'd'" />
			</VCardText>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import CDeploy from "@/components/V1Vaults/CDeploy.vue";
	import CAdminships from "@/components/V1Vaults/CAdminships.vue";
	import CMemberships from "@/components/V1Vaults/CMemberships.vue";

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
