
<template>
	<a :href="href"
		:class="{ active: isActive }"
		:click="go">
		<slot></slot>
	</a>
</template>

<script>

	export default {
		props: {
			href: {
				type:String,
				required: true
			}
		},
		computed: {
			isActive () {
				return this.href === this.$root.currentRoute
			}
		},
		methods: {
			go (event) {
				event.preventDefault();
				this.$root.currentRoute = this.href;
				window.history.pushState(null, '', this.href);
			}
		}
	}
</script>
