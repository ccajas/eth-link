
<template>
    <vlink :href="blockValue"><b>{{ block }}</b></vlink>
</template>

<script>

import vlink from "./vLink.vue";

export default {
    components: {
        vlink
    },
    props: {
        block: {
            type: Number,
            required: true 
        }
    },
    computed: {
        blockValue () {
            return '/block/'+ this.block;
        }
    }
}

</script>