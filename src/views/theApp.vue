
<template>
    <div class="bg-main">
        <navbar :apptitle = "apptitle" :conn = "connected"></navbar>
        <div id="main-container">
            <section class="container">
                <div class="col-sm-3">
                    <div class="fixed-panel">
                        <h2 class="text-second">{{ title }} {{ itemID }}</h2>
                        <networkInfo></networkInfo>
                        <br/>
                        -&#164;- work in progress -&#164;-
                    </div>
                </div>
                <div class="row col-sm-9">
                    <div class="row tabs border-main">
                        <div id="main-loader" class="bg-bright"></div>
                    </div>
                    <section class="row col-sm-8">
                        <component v-bind:is="currentListComponent" :itemID="itemID"></component>
                    </section>
                    <section id="compare-detail" class="col-sm-4">

                    </section>
                </div>
            </section>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>