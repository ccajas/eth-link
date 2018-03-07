
<template>
    <vlink v-bind:href="addrValue">{{ addr }}</vlink>
</template>

<script>

import vlink from "./vLink.vue";

export default {
    components: {
        vlink
    },
    props: {
        addr: {
            type: String,
            required: true 
        }
    },
    computed: {
        addrValue () {
            return '/addr/'+ this.addr;
        }
    }
}

</script>