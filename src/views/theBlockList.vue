
<template>
    <ul>
        <vlink v-bind:href="blockLink(block.id)" v-for = "block in blockList" :key = "block.id">
            <li class="bg list-group-item" v-if="block.sorted">
                <div class="row col-sm-4">
                    <b>Ethereum</b> - <blockLink :block="block.id"></blockLink>
                </div>
                <div class="row col-sm-5">
                    <timeInfo :time="block.timestamp"></timeInfo>
                </div>
                <div class="row col-sm-3">
                    <div class="row col-sm-2">
                        <div v-html="identicon(block, 20)" class="identicon pull-left"></div>
                    </div>
                    <div class="row col-sm-9 pull-right">
                        <addrLink :addr="block.miner" :trunc="true"></addrLink>
                    </div>
                </div>

                <div class="row col-sm-12" style="margin-bottom: 10px" v-text="block.extraData"></div>
                <div class="row col-sm-8 text-second">
                    <div class="ttip">
                        <i class="glyphicon glyphicon-transfer"></i> {{ block.txLength }}
                        <span class="ttip-text">Transactions</span>
                    </div>
                </div>
                <div class="row col-sm-2 text-second">
                    <div class="ttip">
                        <i class="glyphicon glyphicon-file"></i> {{ block.size }}
                        <span class="ttip-text">Size in bytes</span>
                    </div>
                </div>
                <div class="row col-sm-2 text-second">
                    <div class="ttip">
                        <i class="glyphicon glyphicon-scale"></i>&nbsp; {{ block.gasUsed }}
                        <span class="ttip-text">Gas used</span>
                    </div>
                </div>
            </li> 
        </vlink>             
    </ul>
</template>

<script src="../scripts/blockList.js"/>
