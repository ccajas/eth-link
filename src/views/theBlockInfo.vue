
<template>
    <div class="row col-sm-9 pull-right">
        <nav>
            <ul>
                <li>Overview</li>
                <li>Transactions</li>
            </ul>
        </nav>
        <div class="row col-sm-12">
            <br/>
            <div v-for="(val, key) in block" :key="key">
                <div class="row col-sm-3"><strong>{{ key }}</strong></div>
                <div class="col-sm-9">{{ val.length > 0 ? val : "&nbsp;" }}</div>
            </div>
            <br/>
        </div>

        <h3>
            <i class="glyphicon glyphicon-transfer" style="font-size: 0.7em; margin-right: 5px"></i> {{ txList.length }} Transactions &nbsp;
            <i class="glyphicon glyphicon-export" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalSenders }} Senders &nbsp;
            <i class="glyphicon glyphicon-import" style="font-size: 0.7em; margin-right: 5px"></i> {{ totalRecipients }} Recipients
            <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition>
        </h3>
        <transition-group appear name="fade" tag="div" class="identicon-group_">
            <div v-for="(times, addr) in uniqueFromAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                <vlink v-bind:href="itemID +'/addr/'+ addr">
                    <div v-html="identicon(addr, 32)" class="scaling-svg-container"></div>
                </vlink>
                <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
            </div>
        </transition-group>

        <!-- <transition appear name="fade"><div class="spin-loader pull-right" v-if="loading"></div></transition> -->
        <transition-group appear name="fade" tag="div" class="identicon-group_">
            <div v-for="(times, addr) in uniqueToAddr" :key="addr" :data-index="addr" class="bg-mid identicon ttip pull-left">
                <vlink v-bind:href="itemID +'/addr/'+ addr">
                    <div v-html="identicon(addr, 32)" class="scaling-svg-container"></div>
                </vlink>
                <span class="ttip-text">{{ addr }} in {{ times }} transaction{{ times != 1 ? 's' : '' }}</span>
            </div>
        </transition-group>

        <br/>
        <transition-group name="list-f" tag="ul" class="list-group tx-list shadow-soft" v-on:enter="enter" v-on:after-enter="afterEnter">
            <txListItem class="bg" :tx="tx" v-for="(tx, idx) in txList" :key="tx.transactionIndex +'_'" :data-index="idx">
            </txListItem>            
        </transition-group>

        <transition appear name="fade">
            <h3><div class="spin-loader center-block" v-if="loading && txList.length"></div></h3>
        </transition>
    </div>
</template>

<script src="../scripts/txList.js"/>