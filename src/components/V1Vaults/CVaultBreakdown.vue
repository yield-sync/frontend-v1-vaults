<template>
	<div>
		<VRow>
			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">Address</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">View</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">For Votes Required</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">Against Votes Required</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">Withdrawal Delay (Sec)</h4>
			</VCol>

			<VCol cols="2">
				<h4 class="text-center text-primary" style="word-wrap: break-word;">Etherscan</h4>
			</VCol>
		</VRow>

		<VRow v-for="(v, i) in v1Vaults" :key="i" class="mb-3">
			<VCol cols="2">
				<h5 class="text-center" style="word-wrap: break-word;">
					{{ v.address.substring(0, 4) + "..." + v.address.substring(v.address.length - 4) }}
				</h5>
			</VCol>

			<VCol cols="2">
				<RouterLink :to="`/v1-vault/${v.address}`">
					<VBtn variant="flat" size="sm" class="w-100">View</VBtn>
				</RouterLink>
			</VCol>

			<VCol cols="2">
				<h5 class="text-center" style="word-wrap: break-word;">{{ v.forVoteCountRequired }}</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-center" style="word-wrap: break-word;">{{ v.againstVoteCountRequired }}</h5>
			</VCol>

			<VCol cols="2">
				<h5 class="text-center" style="word-wrap: break-word;">{{ v.withdrawalDelaySeconds }}</h5>
			</VCol>

			<VCol cols="2">
				<a
					:href="`https://${d}.etherscan.io/address/${v.address}#readContract`"
					target="_blank"
					rel="noopener noreferrer"
				>
					<VBtn variant="flat" size="sm" class="w-100">🔗</VBtn>
				</a>
			</VCol>
		</VRow>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";

	export default defineComponent({
		name: "CVaultBreakdown",

		props: {
			v1Vaults: {
				required: true,
				type: Object as PropType<
					Array<{
						address: string,
						againstVoteCountRequired: number,
						forVoteCountRequired: number,
						withdrawalDelaySeconds: number,
					}>
				>
			}
		},

		data()
		{
			return {
				d: this.$store.state.etherscanDomainStart
			};
		},
	});
</script>
