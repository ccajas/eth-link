
<template>
    <div class="bg-main">
        <navbar :apptitle="apptitle" :conn="connected" :containerClass="isResponsive ? fluid : nonFluid"></navbar>
        <div id="main-container">
            <section v-bind:class="isResponsive ? fluid : nonFluid">
                <div class="row col-sm-2" style="height: 100%" v-cloak>
                    <div class="col-sm-2 fixed-panel" v-cloak>
                        <h1 class="text-second" v-text="title +' '+ itemID"></h1>
                        <!-- <img :src="'/public/images/ethereum-coin.svg'" style="margin: 0px 30% 0px 25%"/> -->
                        <networkInfo></networkInfo>
                        <br/>
                        -&#164;- work in progress -&#164;-
                    </div>
                </div>
                <div class="row col-sm-10">
                    <div class="row tabs border-main">
                        <div id="main-loader" class="bg-bright"></div>
                        <br/><br/><br/>
                    </div>
                    <section id="middle-panel" class="row col-sm-8">
                        <component v-bind:is="currentListComponent" :network="network" :itemID="itemID"></component>
                    </section>
                    <section id="compare-detail" class="col-sm-4">

                    </section>
                </div>
            </section>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>