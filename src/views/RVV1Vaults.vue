<template>
	<VContainer>
		<VCard>
			<VTabs
				v-model="tab"
				bg-color="primary"
				align-tabs="center"
			>
				<VTab value="m">V1 Vault Memberships</VTab>
				<VTab value="a">V1 Vault Adminships</VTab>
				<VTab value="d">Deploy a Vault</VTab>
			</VTabs>

			<VCardText>
				<VWindow v-model="tab">
					<VWindowItem variant="light" value="m" >
						<CMemberships class="mb-8" />
					</VWindowItem>

					<VWindowItem value="a">
						<CAdminships class="mb-8" />
					</VWindowItem>

					<VWindowItem value="d">
						<CDeploy class="mb-8" />
					</VWindowItem>
				</VWindow>
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
