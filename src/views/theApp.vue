
<template>
    <div class="bg-main">
        <navbar :apptitle="apptitle" :conn="connected" :containerClass="isResponsive ? fluid : nonFluid"></navbar>
        <div id="main-container" v-bind:class="isResponsive ? fluid : nonFluid">
            <section class="col-sm-12" style="height: 100%" v-cloak>
                <div class="col-sm-3 fixed-panel" v-cloak>
                    <h1 class="text-second" v-text="title +' '+ itemID"></h1>
                    <!-- <img :src="'/public/images/ethereum-coin.svg'" style="margin: 0px 30% 0px 25%"/> -->
                    <networkInfo></networkInfo>
                    <br/>
                    -&#164;- work in progress -&#164;-
                </div>
            </section>
            <section class="row col-sm-12">
                <div class="row col-sm-9 pull-right tabs border-main">
                    <div id="main-loader" class="bg-bright"></div>
                    <br/><br/><br/>
                </div>
            </section>
            <component v-bind:is="currentListComponent" :network="network" :itemID="itemID"></component>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>