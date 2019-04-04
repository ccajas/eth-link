
<template>
    <ul>
        <li class="bg list-group-item" v-for = "block in blockList" :key = "block.id">
            <!-- <div v-html="identicon(block)" class="row col-sm-1 identicon pull-left"></div> -->
            <div class="row col-sm-2">
                <blockLink :block="block.id"></blockLink>
            </div>
            <div class="row col-sm-3">
                <timeInfo :time="block.time"></timeInfo>
            </div>
            <div class="row col-sm-1">
                {{ block.txLength }} 
            </div>
            <div class="row col-sm-2">
                {{ block.gasUsed }}
            </div>
            <div class="row col-sm 2">
                <addrLink :addr="block.miner"></addrLink>
            </div>
        </li>              
    </ul>
</template>

<script src="../scripts/blockList.js"/>
