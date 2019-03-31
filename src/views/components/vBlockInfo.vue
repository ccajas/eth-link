
<template>
    <div>
        <div v-html="identicon" class="row col-sm-1 identicon pull-left"></div>
        <div class="col-sm-11">
            <p><blockLink :block="block.id">{{ block.id }}</blockLink></p>
            <span class="text-second pull-right">{{ block.time }}</span>
            {{ block.txLength }} transactions... {{ block.gasUsed }}
            <span class="text-second pull-right">Mined by 
                <addrLink :addr="block.miner">{{ block.miner }}</addrLink></span>
        </div>
    </div>
</template>

<script>

import addrLink  from "./vAddrLink.vue";
import blockLink from "./vBlockLink.vue";

export default {
    components: {
        addrLink,
        blockLink,
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
        },
        identicon: function() {
            return jdenticon.toSvg(this.block.miner, 44, 0);
        }
    }
}
</script>