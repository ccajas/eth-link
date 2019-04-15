
<template>
    <li class="bg" :class="[
        tx.type == 'txValue' ? successClass : 
        tx.type == 'txCall' ? callClass : createdClass]">
        <button class="col-sm-12 shadow-soft" v-on:click='loadDetail' style="text-align: left">
            <div class="col-sm-1">
                <i v-if="tx.type == 'txValue'" class="glyphicon glyphicon-transfer" style="font-size: 1.65em"></i>
                <i v-if="tx.type == 'txCreate'" class="glyphicon glyphicon-asterisk" style="font-size: 1.5em"></i>
                <i v-if="tx.type == 'txCall'" class="glyphicon glyphicon-list" style="font-size: 1.5em"></i>
            </div>

            <div class="row col-sm-11">
                <div class="row col-sm-3"><p>{{ txType }}</p>
                    <p class="text-second" style="font-size: 0.9em">{{ tx.hash }}</p>
                </div>
                <div class="col-sm-5">
                    <div class="row col-sm-6">
                        <p>From</p>
                        <p class="addr"><strong><addrLink :addr="tx.from" :trunc="true"></addrLink></strong>
                        <i class="glyphicon glyphicon-arrow-right text-second"></i></p>
                    </div>
                    <div class="row col-sm-6">
                        <p>To</p>
                        <p class="addr"><addrLink :addr="tx.to" :trunc="true" v-if="tx.to !== null"></addrLink></p>
                    </div>
                </div>

                <div class="col-sm-1 identicon-group">
                    <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                        <div v-html="identicon(tx.from, 36)" class="scaling-svg-container"></div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <span :class="{ 'text-second' : nf.format(tx.value) == '0' }"> {{ tx.value.toString() }} &Xi;</span><br/>
                    <span class="text-second">{{ parseFloat(tx.gasFee.toFixed(8)) }} &Xi;</span>
                </div>
                <div class="col-sm-1 identicon-group">
                    <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                        <div v-html="identicon(tx.to, 36)" class="scaling-svg-container" v-if="tx.to !== null"></div>
                    </div>
                </div>
            </div>
        </button>

        <div class="accordion">
            <transition name="accordion fade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                <!-- tx detail -->
                <div class="col-sm-12" v-if="detail">
                    <transition appear name="fade" v-if="loading">
                        <div class="row col-sm-3 col-centered" style="padding: 50px 0">
                            <div class="spin-loader" style="padding-top: 5px; padding-bottom: 20%" v-if="loading"></div>
                        </div>
                    </transition>
                    <div class="row col-sm-6" style="word-wrap: break-word; white-space: pre-line" v-if="!loading">
                        <h3>{{ txType }}</h3>
                    </div>
                    <div class="row col-sm-6" style="word-wrap: break-word; white-space: pre-line" v-if="!loading">
                        <br/>
                        <h4>Loaded some details</h4>
                        <span v-if="tx.tokenAmount && !loading"><!--
                            -->{{ tx.tokenAmount.toString() }} {{ tx.tokenName }} ({{tx.tokenSymbol}}) sent from {{ tx.to }}
                        </span>
                        <!--
                        <div class="col-sm-1">&nbsp;</div>
                        <div class="row col-sm-11"><h1>{{ txType }}</h1></div>
                        <div v-for="(val, key) in tx" :key="key">
                            <div class="row col-sm-1">&nbsp;</div>
                            <div class="row col-sm-11"><strong>{{ key }}</strong></div>
                            <div class="row col-sm-1">&nbsp;</div>
                            <div class="row col-sm-11" style="word-wrap: break-word; white-space: pre-line">
                                {{ val !== null && val.length > 0 ? val : "&nbsp;" }}<br/><br/>
                            </div>
                        </div>-->
                    </div>
                </div>
            </transition>
        </div>
    </li>              
</template>

<script>

import addrLink from "./vAddrLink.vue";

// Mixin
import ERC20parser  from '../../mixins/erc20parser.js';

export default {
    props: {
        tx: {
            type: Object,
            required: true 
        }
    },
    mixins: [ERC20parser],
    data() {
        return {
            detail: false,
            loading: true,
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
        loadDetail: function()
        {
            this.detail = !this.detail;
            let tx = this.tx;
            
            // Load only if not loaded yet
            if (this.loading && tx.type == 'txCall') 
            {
                // Load token detail
                // ERC-20 token transfer
                if (tx.data.substring(0, 10) == "0xa9059cbb" && tx.data.length === 138) 
                {
                    this.parseERC20(tx).then(() => this.loading = false);
                }
                else
                {
                    console.log('not a token transfer');
                    this.loading = false;
                }
            }
            else
                this.loading = false;
        },
        identicon: function(addr, dimension)
        {
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