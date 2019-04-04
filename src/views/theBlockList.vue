
<template>
    <ul>
        <li class="bg list-group-item" v-for = "block in blockList" :key = "block.id">
            <div class="row col-sm-4">
                <div class="row col-sm-5">
                    <blockLink :block="block.id"></blockLink>
                </div>
                <div class="row col-sm-7">
                    <timeInfo :time="block.timestamp"></timeInfo>
                </div>
            </div>
            <div class="row col-sm-1">
                {{ block.txLength }} 
            </div>
            <div class="row col-sm-2">
                {{ block.gasUsed }}
            </div>
            <div class="row col-sm-5">
                <div class="row col-sm-4">
                    {{ block.size }}
                </div>
                <div class="row col-sm-2">
                    <div v-html="identicon(block, 20)" class="identicon pull-left"></div>
                </div>
                <div class="row col-sm-6">
                    <addrLink :addr="block.miner"></addrLink>
                </div>
            </div>
        </li>              
    </ul>
</template>

<script src="../scripts/blockList.js"/>
