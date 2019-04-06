
<template>
    <div>
        <h3>{{ totalRecipients }} Recipients
            <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
        </h3>
        <transition-group appear name="fade" tag="div">
            <!--<span v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr">{{ addr }}, </span>-->
            <div v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="bg pull-left">
                <div v-html="identicon(addr, 20)" class="pull-left"></div> &nbsp;
                <addrLink :addr="addr" :trunc="true"></addrLink> &nbsp;
            </div>
        </transition-group>
        <br/>

        <transition-group name="list-f" tag="ul" v-on:enter="enter" v-on:after-enter="afterEnter">
            <li class="bg list-group-item" v-for="(tx, idx) in txList" :key="tx.transactionIndex +'_'" :data-index="idx">
                <div class="row col-sm-1">
                    <b>{{ tx.transactionIndex + 1 }}</b>
                </div>
                <div class="row col-sm-11">
                    <div class="row col-sm-1">
                        <div v-html="identicon(tx.from, 20)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-9">
                        <addrLink :addr="tx.from"></addrLink>
                    </div>
                </div>

                <div class="row col-sm-1">
                    &nbsp;
                </div>
                <div class="row col-sm-11">
                    <div class="row col-sm-1">
                        <div v-html="identicon(tx.to, 20)" class="identicon pull-left"></div>
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