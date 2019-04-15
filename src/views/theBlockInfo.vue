
<template>
    <app-layout :network="network">
        <div class="row">
            <section class="row col-sm-3 bg-drop-grad sticky-fixed" v-cloak>
                <div class="col-sm-4 identicon" style="padding-top: 15px">
                    <div class="shadow-soft">
                        <div v-html="identicon(block.hash, 84)" class="scaling-svg-container"></div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <h1 v-text="'Block '+ itemID"></h1>
                </div>
                <nav class="row col-sm-12">
                    <ul>
                        <li>
                            <button v-on:click="view = 'summary'" v-bind:class="[view == 'summary' ? 'active' : '']">Summary</button>
                        </li>
                        <li>
                            <button v-on:click="view = 'transactions'" v-bind:class="[view == 'transactions' ? 'active' : '']">
                            {{ txList.length }} Transactions</button>
                        </li>
                        <li>
                            <button v-on:click="view = 'senders'"  v-bind:class="[view == 'senders' ? 'active' : '']">
                            {{ totalSenders }} Senders</button>
                        </li>
                        <li>
                            <button v-on:click="view = 'recipients'" v-bind:class="[view == 'recipients' ? 'active' : '']">
                            {{ totalRecipients }} Recipients</button>
                        </li>
                        <li class="col-sm-1 pull-right">
                            <transition appear name="fade"><div v-if="loading" class="spin-loader" style="padding-bottom: 13.75%"></div></transition>
                        </li>
                    </ul>
                </nav>

                <div class="col-sm-12"> 
                    <h5>Mined on:</h5><p>{{ block.mined }}</p>
                    <h5>Difficulty:</h5>{{ block.difficulty }}</p>
                    <h5>Gas Limit:</h5><p>{{ block.gasLimit }}</p>
                    <h5>Gas Used:</h5><p>{{ block.gasUsed }}</p>
                </div>
                <br/>
            </section>
            
            <section class="col-sm-9 pull-right"> 
 
                <!-- Summary -->
                <div v-show="view == 'summary'" class="row col-sm-12">
                    <ul class="list-group">
                        <li class="bg" v-for="(val, key) in block" :key="key">
                            <div class="col-sm-3"><h5>{{ key }}</h5></div>
                            <div class="col-sm-9">{{ (val.length > 0 || val != null) && !Array.isArray(val) ? val : "&nbsp;" }}</div>
                        </li>
                    </ul>
                    <div class="col-sm-12">&nbsp;</div>
                </div>

                <!-- Senders -->
                <div v-show="view == 'senders'" class="col-sm-11">
                    <transition-group appear name="fade" tag="div" class="identicon-group">
                        <div v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="identicon ttip pull-left">
                            <vlink v-bind:href="itemID +'/addr/'+ addr">
                                <div v-html="identicon(addr, 44)" class="scaling-svg-container"></div>
                            </vlink>
                            <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                        </div>
                    </transition-group>
                </div>

                <!-- Recipients -->
                <div v-show="view == 'recipients'" class="col-sm-11">
                    <transition-group appear name="fade" tag="div" class="identicon-group">
                        <div v-for="(times, addr) in uniqueToAddr" :key="addr" :data-index="addr" class="identicon ttip pull-left">
                            <vlink v-bind:href="itemID +'/addr/'+ addr">
                                <div v-html="identicon(addr, 44)" class="scaling-svg-container"></div>
                            </vlink>
                            <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                        </div>
                    </transition-group>
                </div>

                <!-- Tx List -->
                <div v-show="view == 'transactions'" class="row col-sm-12">
                    <transition-group appear name="list-f" tag="ul" class="list-group tx-list" v-on:enter="enter" v-on:after-enter="afterEnter">
                        <txListItem :tx="tx" v-for="(tx, idx) in txList" :key="tx.hash +'_'" :data-index="idx">
                        </txListItem>            
                    </transition-group>

                    <transition appear name="fade">
                        <div class="row col-sm-2 col-centered">
                            <div class="spin-loader" v-if="loading && txList.length" style="padding-bottom: 20%"></div>
                        </div>
                    </transition>

                    <h3 v-if="txList.length == 0" class="col-sm-12">No transactions found</h3>
                </div>
            </section>
        </div>
    </app-layout>
</template>

<script src="../scripts/blockInfo.js"/>