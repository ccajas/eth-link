
<template>
    <div class="bg-main">
        <navbar :apptitle="apptitle" :conn="connected" :containerClass="isResponsive ? fluid : nonFluid"></navbar>
        <div id="main-container" v-bind:class="isResponsive ? fluid : nonFluid">
            <section>
                <component v-bind:is="currentListComponent" :network="network" :title="title" :itemID="itemID"></component>
            </section>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>