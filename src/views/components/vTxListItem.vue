
<template>
    <li class="bg" :class="[
        tx.type == 'txValue' ? successClass : 
        tx.type == 'txCall' ? callClass : createdClass]">
        <button class="col-sm-12" @click='detail = !detail' style="text-align: left">
            <div class="col-sm-1">&nbsp;</div>
            <div class="col-sm-3"><p><strong>{{ txType }}</strong></p>
                <p>{{ tx.hash }}</p>
            </div>

            <div class="col-sm-4">
                <div class="col-sm=-12" style="text-align: center"> </div>
                <div class="row col-sm-12" style="text-align: center">
                    <p><strong><addrLink :addr="tx.from" :trunc="true"></addrLink></strong>
                    <i class="glyphicon glyphicon-arrow-right text-second"></i>

                    &nbsp; <addrLink :addr="tx.to" :trunc="true" v-if="tx.to !== null"></addrLink></p>
                </div>
            </div>

            <div class="col-sm-1 identicon-group">
                <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                    <div v-html="identicon(tx.from, 36)" class="scaling-svg-container"></div>
                </div>
            </div>
            <div class="col-sm-2">
                <span :class="{ 'text-second' : nf.format(tx.value) == '0' }"> {{ nf.format(tx.value) }} &Xi;</span><br/>
                <span class="text-second">{{ parseFloat(tx.gasFee.toFixed(8)) }} &Xi;</span>
            </div>

            <div class="col-sm-1 identicon-group">
                <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                    <div v-html="identicon(tx.to, 36)" class="scaling-svg-container" v-if="tx.to !== null"></div>
                </div>
            </div>
            <div class="accordion">
                <transition name="accordion fade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                    <div class="row col-sm-12" v-if="detail">
                        <br/>
                        <div class="col-sm-1">&nbsp;</div>
                        <div class="row col-sm-11"><h1>{{ txType }}</h1></div>
                        <div v-for="(val, key) in tx" :key="key">
                            <div class="row col-sm-1">&nbsp;</div>
                            <div class="row col-sm-11"><strong>{{ key }}</strong></div>
                            <div class="row col-sm-1">&nbsp;</div>
                            <div class="row col-sm-11">{{ val !== null && val.length > 0 ? val : "&nbsp;" }}<br/><br/></div>
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
            createdClass: 'contract-created',
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
        txType()
        {        
            console.log(this.tx.from +' to '+ this.tx.to +': '+ this.tx.type);
            let tType =  
                (this.tx.type == 'txValue') ? 'Value Transaction' : 
                (this.tx.type == 'txCall')  ? 'Contract Call' : 'Contract Created';
            return tType;
        }
    },
    created: function()
    {
        this.nf = new Intl.NumberFormat();
    }
}

</script>