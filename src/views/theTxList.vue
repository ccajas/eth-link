
<template>
    <div>
        <ul>
            <li class="bg list-group-item" v-for = "tx in txList" :key = "tx.id">
                <div class="row col-sm-1">
                    {{ tx.transactionIndex }}
                </div>
                <div class="row col-sm-3">
                    <div class="row col-sm-3">
                        <div v-html="identicon(tx.from, 20)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-9">
                        <addrLink :addr="tx.from"></addrLink>
                    </div>
                </div>
                <div class="row col-sm-3">
                    <div class="row col-sm-3">
                        <div v-html="identicon(tx.to, 20)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-9">
                        <addrLink :addr="tx.to"></addrLink>
                    </div>
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
        </ul>
    </div>
</template>

<script src="../scripts/txList.js"/>