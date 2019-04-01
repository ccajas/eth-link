
<template>
    <ul>
        <li class="bg list-group-item" v-for = "block in blockList" :key = "block.id">
            <div v-html="identicon(block)" class="row col-sm-1 identicon pull-left"></div>
            <div class="col-sm-11">
                <p><blockLink :block="block.id">{{ block.id }}</blockLink></p>
                <span class="text-second pull-right">{{ block.time }}</span>
                {{ block.txLength }} transactions... {{ block.gasUsed }}
                <span class="text-second pull-right">Mined by 
                    <addrLink :addr="block.miner">{{ block.miner }}</addrLink></span>
            </div>
        </li>              
    </ul>
</template>

<script src="../scripts/blockList.js"/>
