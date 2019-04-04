
<template>
    <div class="bg-main">
        <navbar :apptitle = "apptitle" :conn = "connected"></navbar>
        <div id="main-container">
            <section class="container">
                <div class="col-sm-2">
                    <div class="fixed-panel">
                        <h3>{{ title }} {{ itemID }}</h3>
                        <networkInfo></networkInfo>
                        <br/>
                        -&#164;- work in progress -&#164;-
                    </div>
                </div>
                <div class="row col-sm-10">
                    <div class="row tabs border-main">
                        <div id="main-loader" class="bg-bright"></div>
                    </div>
                    <div class="row col-sm-8">
                        <section>
                            <component v-bind:is="currentListComponent"></component>
                        </section>
                    </div>
                    <div id="compare-detail" class="col-sm-4">
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