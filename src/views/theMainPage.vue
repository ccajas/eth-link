
<template>
    <div class="row">
        <div class="col-sm-2">
            <br/>
            -&#164;- work in progress -&#164;-
        </div>
        <div class="row col-sm-5">
            <div class="border-main">
                <ul class="bg-main tabs border-main">
                    <li class="pull-left">
                        <vlink v-bind:href="'test'"><i class="glyphicon glyphicon-book" style="font-size: 0.7em"></i>
                        Latest Blocks</vlink>
                    </li>
                    <li class="pull-left">
                        <vlink v-bind:href="'test'"><i class="glyphicon glyphicon-briefcase" style="font-size: 0.7em"></i>
                        Test</vlink>
                    </li>
                    <li class="pull-left">
                        <vlink v-bind:href="'test'"><i class="glyphicon glyphicon-book" style="font-size: 0.7em"></i>
                        Extra Tab</vlink>
                    </li>
                </ul>
            </div>
            <div class="y-overflow-panel">
                <ul>
                    <li class="bg list-group-item"
                        v-for = "block in blockList" 
                        :key = "block.id">
                        <blockLink :block="block.id">{{ block.id }}</blockLink>
                            <span class="text-second pull-right">{{ block.time }}</span>
                       {{ block.txLength }} transactions
                            <span class="text-second pull-right">Mined by 
                                <addrLink :addr="block.miner">{{ block.miner }}</addrLink></span>
                        
                    </li>
                </ul>
            </div>
        </div>
        <div class="row col-sm-5">
            <div class="border-main">
                <ul class="bg-main tabs border-main">
                    <li class="pull-left">
                        <vlink v-bind:href="'test'"><i class="glyphicon glyphicon-briefcase" style="font-size: 0.7em"></i>
                        Test</vlink>
                    </li>
                    <li class="pull-left">
                        <vlink v-bind:href="'test'"><i class="glyphicon glyphicon-book" style="font-size: 0.7em"></i>
                        Extra Tab</vlink>
                    </li>
                </ul>
            </div>
            <div class="y-overflow-panel">
                <table class="table table-dark">
                    <thead>
                        <tr class="border-main">
                            <th style="width: 12%">Hash</th>
                            <th style="width: 24%">From</th>
                            <th style="width: 24%">To</th>
                            <th style="width: 12%">Value</th>
                            <th style="width: 12%">Gas Used</th>
                            <th class="border-mid">Gas Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <txInfo
                            v-for = "tx in txList" 
                            :key = "tx.hash" 
                            :tx = "tx">
                        </txInfo>
                    </tbody>
                </table>
            </div>
        </div>
        <!--<div class="col-sm-6 y-overflow-panel">
            <h3><i class="glyphicon glyphicon-briefcase" style="font-size: 0.7em"></i>
                &nbsp;Latest Transactions</h3>
            <table class="table table-dark">
                <thead>
                    <tr class="border-main">
                        <th style="width: 12%">Hash</th>
                        <th style="width: 24%">From</th>
                        <th style="width: 24%">To</th>
                        <th style="width: 12%">Value</th>
                        <th style="width: 12%">Gas Used</th>
                        <th class="border-mid">Gas Price</th>
                    </tr>
                </thead>
                <tbody>
                    <txInfo
                        v-for = "tx in txList" 
                        :key = "tx.hash" 
                        :tx = "tx">
                    </txInfo>
                </tbody>
            </table>
        </div>-->
    </div>
</template>

<script src="../scripts/main.js"/>