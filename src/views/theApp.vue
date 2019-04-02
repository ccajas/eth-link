
<template>
    <div class="bg-main">
        <navbar :apptitle = "apptitle" :conn = "connected"></navbar>
        <div id="main-container">
            <section class="container">
                <div class="col-sm-3">
                    <div class="fixed-panel">
                        <h3>{{ title }} {{ itemID }}</h3>
                        <networkInfo></networkInfo>
                        <br/>
                        -&#164;- work in progress -&#164;-
                    </div>
                </div>
                <div class="row col-sm-9">
                    <div class="row tabs border-main">
                        <div id="main-loader" class="bg-bright"></div>
                    </div>
                    <div class="row col-sm-8">
                        <section>
                            <component v-bind:is="currentListComponent"></component>
                        </section>
                    </div>
                    <div class="col-sm-4">
                        <h4>Network Stats</h4>
                <!-- <ul>
                    <li><h5>Difficulty</h5> {{ nf.format(difficulty) }}</li>
                    <li><h5>Avg. block time</h5> {{ nf.format(blockTime) }} sec.</li>
                    <li><h5>Hash rate</h5> {{ nf.format(hashRate) }} h/s</li>
                </ul> -->
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
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>