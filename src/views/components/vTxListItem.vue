
<template>
    <li class="bg">
        Testing item
        <!-- :class="[isCall ? callClass : successClass]" -->
        <div class="row">
            <div class="row col-sm-6">
                <div class="row col-sm-1 identicon-group">
                    <div class="bg-mid identicon ttip pull-left" style="width: 32px; margin-bottom: 0px">
                        <div v-html="identicon(tx.from, 32)" class="scaling-svg-container"></div>
                    </div>
                </div>
                <div class="row col-sm-5">
                    <strong>&nbsp; <addrLink :addr="tx.from" :trunc="true"></addrLink></strong>
                    <i class="glyphicon glyphicon-arrow-right text-second"></i>
                </div>
                <div class="row col-sm-1 identicon-group">
                    <div class="bg-mid identicon ttip pull-left" style="width: 32px; margin-bottom: 0px">
                        <div v-html="identicon(tx.to, 32)" class="scaling-svg-container"></div>
                    </div>
                </div>
                <div class="row col-sm-5">
                    &nbsp; <addrLink :addr="tx.to" :trunc="true"></addrLink>
                </div>
            </div>
            <div class="row col-sm-2">
                {{ nf.format(tx.value) }} ETH
            </div>
            <div class="row col-sm-3 text-second">
                {{ parseFloat(tx.gasFee.toFixed(8)) }} ETH
            </div>
        </div>
    </li>              
</template>

<script>

import addrLink from "./vAddrLink.vue";

export default {
    props: {
        tx: {
            type: Object,
            required: true 
        }
    },
    data() {
        return {
            // Class list for tx types
            callClass: 'contract-call',
            successClass: 'success'
        }
    },
    components: {
        addrLink
    },
    methods: {
        identicon: function(addr, dimension) {
            let svg = jdenticon.toSvg(addr, dimension, 0.05);
            let span = document.createElement('span');
            span.innerHTML = svg.trim();
            span.firstChild.removeAttribute('width');
            span.firstChild.removeAttribute('height');
            span.firstChild.setAttribute('class', 'scaling-svg');
            return span.firstChild.outerHTML;
        }
    },
    computed: {
        isCall()
        {        
            return (this.tx.code != '0x');
        }
    },
    created: function()
    {
        this.nf = new Intl.NumberFormat();
    }
}

</script>