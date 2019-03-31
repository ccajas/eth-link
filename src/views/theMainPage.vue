
<template>
    <section class="container">
        <div class="col-sm-3">
            <h3>Latest Blocks</h3>
            -&#164;- work in progress -&#164;-
        </div>
        <div class="row col-sm-9">
            <div class="row tabs border-main">
                    <div id="main-loader" class="bg-bright"></div>
            </div>
            <div class="row col-sm-8">
                <ul>
                    <li class="bg list-group-item" v-for = "block in blockList" :key = "block.id">
                        <blockInfo :block="block"></blockInfo>                
                    </li>
                </ul>
            </div>
            <div class="col-sm-4">
                <h4>Network Stats</h4>
                <ul>
                    <li><h5>Difficulty</h5> {{ nf.format(difficulty) }}</li>
                    <li><h5>Avg. block time</h5> {{ nf.format(blockTime) }} sec.</li>
                    <li><h5>Hash rate</h5> {{ nf.format(hashRate) }} h/s</li>
                </ul>
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
    </section>
</template>

<script src="../scripts/main.js"/>