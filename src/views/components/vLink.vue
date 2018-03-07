
<template>
	<a :href="href"
		:class="{ active: isActive }"
		:click="go">
		<slot></slot>
	</a>
</template>

<script>

	import routes 		from '../../routes/index.js';
	import { eventBus } from '../../routes/eventbus.js';

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
				window.history.pushState(null, '', this.href);
				console.log('test '+ this.href);
				eventBus.$emit('link-clicked', this.href);
			}
		}
	}
</script>
