
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
                        <addrLink :addr="block.miner"></addrLink>
                    </div>
                </div>

                <div class="row col-sm-12" style="margin-bottom: 10px">
                    {{ block.extraData }}
                </div>
                <div class="row col-sm-8 text-second">
                    <i class="glyphicon glyphicon-transfer"></i> {{ block.txLength }}
                </div>
                <div class="row col-sm-2 text-second">
                    <i class="glyphicon glyphicon-file"></i> {{ block.size }}
                </div>
                <div class="row col-sm-2 text-second">
                    <i class="glyphicon glyphicon-scale"></i>&nbsp; {{ block.gasUsed }}
                </div>
            </li> 
        </vlink>             
    </ul>
</template>

<script src="../scripts/blockList.js"/>
