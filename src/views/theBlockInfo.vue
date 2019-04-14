
<template>
    <app-layout :network="network">
        <div class="row">
            <div class="row col-sm-6 bg-drop-grad" v-cloak>
                <div class="col-sm-2 identicon" style="padding-top: 15px">
                    <div class="shadow-soft">
                        <div v-html="identicon(block.hash, 84)" class="scaling-svg-container"></div>
                    </div>
                </div>
                <div class="row col-sm-10">
                    <h1 v-text="'Block '+ itemID"></h1>
                </div>
                <!-- <img :src="'/public/images/ethereum-coin.svg'" style="margin: 0px 30% 0px 25%"/> -->
                <br/>
            </div>
            
            <div class="col-sm-12 pull-right"> 
                <br/>
                <nav class="bg shadow-soft">
                    <ul>
                        <li><vlink v-bind:href="itemID +'/addr/'" class="active">Summary</vlink></li>
                        <li><vlink v-bind:href="'/addr/'">
                            <i class="glyphicon glyphicon-transfer" style="font-size: 0.7em; margin-right: 5px"></i> {{ txList.length }} Transactions</vlink>
                        </li>
                        <li><vlink v-bind:href="'/addr/'">
                            <i class="glyphicon glyphicon-export" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalSenders }} Senders</vlink>
                        </li>
                        <li><vlink v-bind:href="'/addr/'">
                            <i class="glyphicon glyphicon-import" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalRecipients }} Recipients</vlink>
                        </li>
                        <li class="col-sm-2 pull-right">
                            <transition appear name="fade"><div class="spin-loader" v-if="loading" style="padding-bottom: 20%"></div></transition>
                        </li>
                    </ul>
                </nav>
                <br/>

                <div class="row col-sm-12"> 
                    <div class="col-sm-2">
                        <h5>Mined on:</h5>{{ block.mined }}
                    </div>
                    <div class="col-sm-2">
                        <h5>Difficulty:</h5>{{ block.difficulty }}
                    </div>
                    <div class="row col-sm-1">
                        <h5>Gas Limit:</h5>{{ block.gasLimit }}
                    </div>
                    <div class="row col-sm-1">
                        <h5>Gas Used:</h5>{{ block.gasUsed }}
                    </div>
                    <div class="col-sm-6">
                        <h5>Block Hash:</h5>{{ block.hash }}
                    </div>
                </div>

                <!-- Summary -->
                <div class="row col-sm-12" style="display: none">
                    <br/>
                    <div v-for="(val, key) in block" :key="key">
                        <div class="row col-sm-3"><strong>{{ key }}</strong></div>
                        <div class="col-sm-9">{{ (val.length > 0 || val != null) && !Array.isArray(val) ? val : "&nbsp;" }}</div>
                    </div>
                    <br/>
                </div>

                <!-- Senders -->
                <transition-group appear name="fade" tag="div" class="identicon-group_">
                    <div v-show="view == 'senders'" v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                        <vlink v-bind:href="itemID +'/addr/'+ addr">
                            <div v-html="identicon(addr, 44)" class="scaling-svg-container"></div>
                        </vlink>
                        <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                    </div>
                </transition-group>

                <!-- Recipients -->
                <transition-group appear name="fade" tag="div" class="identicon-group_">
                    <div v-show="view == 'recipients'" v-for="(times, addr) in uniqueToAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                        <vlink v-bind:href="itemID +'/addr/'+ addr">
                            <div v-html="identicon(addr, 44)" class="scaling-svg-container"></div>
                        </vlink>
                        <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
                    </div>
                </transition-group>

                <!-- Tx List -->
                <div class="row col-sm-12">
                    <br/><br/>
                    <transition-group name="list-f" tag="ul" class="list-group tx-list" v-on:enter="enter" v-on:after-enter="afterEnter">
                        <txListItem class="bg" :tx="tx" v-for="(tx, idx) in txList" :key="tx.transactionIndex +'_'" :data-index="idx">
                        </txListItem>            
                    </transition-group>

                    <transition appear name="fade">
                        <div class="row col-sm-2 col-centered">
                            <div class="spin-loader" v-if="loading && txList.length" style="padding-bottom: 20%"></div>
                        </div>
                    </transition>

                    <h3 v-if="txList.length == 0">No transactions found!</h3>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script src="../scripts/blockInfo.js"/>