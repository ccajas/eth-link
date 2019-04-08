
<template>
    <div class="row">
        <div class="col-sm-3">

        </div>
        <div class="row col-sm-6">
            <h3>
                <i class="glyphicon glyphicon-export" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalSenders }} Senders
                <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
            </h3>
            <transition-group appear name="fade" tag="div" class="identicon-group clearfix">
                <div v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                    <vlink v-bind:href="itemID +'/addr/'+ addr">
                        <div v-html="identicon(addr, 32)" class="scaling-svg-container"></div>
                    </vlink>
                    <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                </div>
            </transition-group>

            <h3>
                <i class="glyphicon glyphicon-import" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalRecipients }} Recipients
                <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
            </h3>
            <transition-group appear name="fade" tag="div" class="identicon-group clearfix">
                <div v-for="(times, addr) in uniqueToAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                    <vlink v-bind:href="itemID +'/addr/'+ addr">
                        <div v-html="identicon(addr, 32)" class="scaling-svg-container"></div>
                    </vlink>
                    <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                </div>
            </transition-group>

            <h3>
                <i class="glyphicon glyphicon-transfer" style="font-size: 0.7em; margin-right: 5px"></i> {{ txList.length }} Transactions
                <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
            </h3>
            <transition-group name="list-f" tag="ul" class="list-group tx-list shadow-soft" v-on:enter="enter" v-on:after-enter="afterEnter">
                <li class="bg" :class="[isCall(tx) ? callClass : successClass]" v-for="(tx, idx) in txList" :key="tx.transactionIndex +'_'" :data-index="idx">
                    <!-- <div class="col-sm-1">
                        <b>{{ tx.transactionIndex + 1 }}</b>
                    </div>
                    <div class="col-sm-11 text-second">
                        {{ tx.hash }}
                    </div> -->

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
            </transition-group>
            <transition appear name="fade">
                <h3><div class="spin-loader center-block" v-if="loading && txList.length"></div></h3>
            </transition>
        </div>
    </div>
</template>

<script src="../scripts/txList.js"/>