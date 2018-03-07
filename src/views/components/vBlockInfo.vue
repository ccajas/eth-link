
<template>
    <tr class="fade-in">
        <td><vlink :href="blockID">{{ block.id }}</vlink> &nbsp;</td>
        <td><vlink :href="blockTxs">{{ block.txLength }}</vlink> &nbsp;</td>
        <td>{{ block.miner }}</td>
        <td>{{ block.size }} &nbsp;</td>
        <td>{{ block.gasUsed }}</td>
        <td>{{ block.time }} &nbsp;</td>
    </tr>
</template>

<script>

import vlink from "./vLink.vue";

export default {
    components: {
        vlink
    },
    props: {
        block: {
            type: Object,
            required: true 
        }
    },
    computed: {
        blockID () {
            return '/block/'+ this.block.id;
        },
        blockTxs () {
            return '/block-txs/'+ this.block.id;
        }
    }
}
</script>