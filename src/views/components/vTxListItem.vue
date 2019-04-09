
<template>
    <li class="bg" :class="[isCall ? callClass : successClass]">
        <button class="row col-sm-12" @click='detail = !detail' style="text-align: left">
            <div class="col-sm-1">&nbsp;</div>

            <div class="col-sm-1 identicon-group">
                <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                    <div v-html="identicon(tx.from, 46)" class="scaling-svg-container"></div>
                </div>
            </div>
            <div class="col-sm-7">
                <strong>{{ isCall ? 'Contract Call' : 'Transaction' }}</strong>
                <div class="col-sm-6">
                    <p><strong>&nbsp; <addrLink :addr="tx.from" :trunc="true"></addrLink></strong>
                    <i class="glyphicon glyphicon-arrow-right text-second"></i></p>
                </div>
                <div class="col-sm-5">
                    &nbsp; <addrLink :addr="tx.to" :trunc="true"></addrLink>
                </div>
            </div>
            <div class="col-sm-2">
                {{ nf.format(tx.value) }} ETH
            </div>

            <div class="col-sm-1 identicon-group">
                <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                    <div v-html="identicon(tx.to, 46)" class="scaling-svg-container"></div>
                </div>
            </div>
            <div class="accordion">
                <transition name="accordion fade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                    <div class="row col-sm-12" v-if="detail">
                        <br/>
                        <div v-for="(val, key) in tx" :key="key">
                            <div class="row col-sm-1">&nbsp;</div>
                            <div class="row col-sm-2"><strong>{{ key }}</strong></div>
                            <div class="col-sm-9">{{ val }}</div>
                        </div>
                    </div>
                </transition>
            </div>
        </button>
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
            detail: false,
            // Class list for tx types
            callClass: 'contract-call',
            successClass: 'success'
        }
    },
    components: {
        addrLink
    },
    methods: {
        beforeEnter: function(el) {
            el.style.height = '0';
        },
        enter: function(el) {
            el.style.height = el.scrollHeight + 'px';
        },
        leave: function(el) {
            this.beforeEnter(el);
        },
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