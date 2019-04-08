
<template>
    <div class="row">
        <div class="col-sm-3">

        </div>
        <div class="row col-sm-6">
            <transition-group name="list-f" tag="ul" class="list-group shadow-soft" v-on:enter="enter" v-on:after-enter="afterEnter">
                <li class="bg" v-for="(block, idx) in blockList" :key="block.id+'_'" :data-index="idx">
                    <div class="row col-sm-4">
                            <b class='capitalize'>{{ network }}</b> - <blockLink :block="block.id"></blockLink>
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
                
            </transition-group>   
        </div>     
    </div>
</template>

<script src="../scripts/blockList.js"/>
