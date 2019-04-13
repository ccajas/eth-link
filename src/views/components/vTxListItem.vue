
<template>
    <li class="bg" :class="[
        tx.type == 'txValue' ? successClass : 
        tx.type == 'txCall' ? callClass : createdClass]">
        <button class="col-sm-12" v-on:click='loadDetail' style="text-align: left">
            <div class="col-sm-1">&nbsp;</div>
            <div class="col-sm-3"><p><strong>{{ txType }}</strong></p>
                <p class="text-second">{{ tx.hash }}</p>
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
                <span :class="{ 'text-second' : nf.format(tx.value) == '0' }"> {{ tx.value.toString() }} &Xi;</span><br/>
                <span class="text-second">{{ parseFloat(tx.gasFee.toFixed(8)) }} &Xi;</span>
            </div>

            <div class="col-sm-1 identicon-group">
                <div class="bg-mid identicon ttip pull-left" style=" margin-bottom: 0px">
                    <div v-html="identicon(tx.to, 36)" class="scaling-svg-container" v-if="tx.to !== null"></div>
                </div>
            </div>
            <div class="accordion">
                <transition name="accordion fade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
                    <!-- tx detail -->
                    <div class="row col-sm-12" v-if="detail">
                        <transition appear name="fade" v-if="loading">
                            <div class="row col-sm-3 col-centered" style="padding: 50px 0">
                                <div class="spin-loader" style="padding-top: 5px; padding-bottom: 20%" v-if="loading"></div>
                            </div>
                        </transition>
                        <div class="row col-sm-12" style="word-wrap: break-word; white-space: pre-line" v-if="!loading">
                            <br/>
                            <h4>Loaded some details</h4>
                                <span v-if="tx.tokenAmount && !loading">{{ tx.tokenAmount.toString() }}</span>
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
        </button>
    </li>              
</template>

<script>

import addrLink from "./vAddrLink.vue";

// Mixin
import erc20abi   from '../../mixins/erc20_abi.js';

export default {
    props: {
        tx: {
            type: Object,
            required: true 
        }
    },
    mixins: [erc20abi],
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
            // Load token detail
            console.log(tx.type);
            
            // Load only if not loaded yet
            if (this.loading && tx.type == 'txCall') 
            {
                // ERC-20 token transfer
                if (tx.data.substring(0, 10) == "0xa9059cbb" && tx.data.length === 138) 
                {
                    this.tx.data = this.tx.data.substring(2);
                    this.tx.tokenTo = '0x' + this.tx.data.substring(32, 72);

                    let contract = new this.$ethers.Contract(tx.to, this.erc_20_abi_min, this.$provider);
                    let self = this;

                    contract.name().then(function(name) 
                    {
                        console.log('token from: '+ tx.from +' token to: '+ tx.tokenTo);
                        tx.tokenAmount = tx.data.substring(72, 136);
                        tx.tokenAmount = self.$ethers.utils.formatUnits(self.$ethers.utils.bigNumberify('0x'+ tx.tokenAmount), 18);
                        console.log(tx.tokenAmount + ' '+ name +' from contract '+ tx.to);
                        self.loading = false;                                                   
                    }
                    .bind(this.tx))
                    .catch((err) => { console.error(err) } );
                }
                else
                    console.log('not a token transfer');
                
                this.loading = false;
            }
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