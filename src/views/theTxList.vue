
<template>
    <div>
        <h3>{{ totalRecipients }} Recipients
            <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
        </h3>
        <transition-group appear name="fade" tag="div" class="clearfix">
            <div v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="ttip pull-left">
                <vlink v-bind:href="'/addr/'+ addr">
                    <div v-html="identicon(addr, 40)" class="identicon pull-left bg-mid" style="height: 40px; margin: 0 10px 10px 0"></div>
                </vlink>
                <span class="ttip-text">{{ addr }}</span>
            </div>
        </transition-group>
        <br/>

        <transition-group name="list-f" tag="ul" v-on:enter="enter" v-on:after-enter="afterEnter">
            <li class="bg list-group-item" v-for="(tx, idx) in txList" :key="tx.transactionIndex +'_'" :data-index="idx">
                <div class="row col-sm-1">
                    <b>{{ tx.transactionIndex + 1 }}</b>
                </div>
                <div class="row col-sm-11 text-second">
                    {{ tx.hash }}
                </div>

                <div class="row col-sm-1">
                    &nbsp;
                </div>
                <div class="row col-sm-11">
                    <div class="row col-sm-1">
                        <div v-html="identicon(tx.from, 18)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-11">
                        <addrLink :addr="tx.from"></addrLink>
                    </div>
                </div>

                <div class="row col-sm-1">
                    &nbsp;
                </div>
                <div class="row col-sm-11">
                    <div class="row col-sm-1">
                        <div v-html="identicon(tx.to, 18)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-9">
                        <addrLink :addr="tx.to"></addrLink>
                    </div>
                </div>

                <div class="row col-sm-2">
                    &nbsp;
                </div>
                <div class="row col-sm-5">
                    <div class="row col-sm-6">
                        {{ nf.format(tx.value) }} ETH
                    </div>
                    <div class="row col-sm-6 text-second">
                        {{ parseFloat(tx.gasFee.toFixed(8)) }} ETH
                    </div>
                </div>
            </li>              
        </transition-group>
        <transition appear name="fade">
            <h3><div class="spin-loader center-block" v-if="loading && txList.length"></div></h3>
        </transition>
    </div>
</template>

<script src="../scripts/txList.js"/>