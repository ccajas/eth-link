
<template>
    <nav class="navbar navbar-default bg-second-grad">
        <div v-bind:class="containerClass" class="text-light" >
            <div class="row bg-add">
                <div class="col-sm-3">
                    <vlink v-cloak class="navbar-brand" href="/">
                        <i class="glyphicon glyphicon-random text-light"></i>
                        &nbsp;<span class="text-light capitalize"> {{ networkName }} </span></vlink>
                    <button v-on:click="toggleStyle" class="navbar-brand pull-right">
                        &nbsp; <i class="glyphicon glyphicon-sunglasses text-light"></i> &nbsp;
                    </button>
                </div>

                <!-- Search box -->
                <div class="col-sm-5 form-group inner-addon right-addon bg-remove">
                    <form @submit.prevent="sendRequest" name="ethRequest">
                        <i class="glyphicon glyphicon-search"></i>
                        <input type="text" class="form-control text-shadow-glow" v-model="ethRequest" id="master-input" name="master-input"
                            @keyup="textchange" @keydown="textchange" placeholder="Enter Tx Hash / Address / Block"/>
                    </form>
                </div>

                <div v-cloak class="col-sm-2 pull-right" style="padding-top: 7px">
                    <span class="pull-right">&nbsp;<!--{{ conn ? "connected" : "disconnected" }}--> &nbsp;</span>
                    <i class="glyphicon glyphicon-flash pull-right" style="padding-top: 2px"></i>
                    <i class="glyphicon glyphicon-remove-circle pull-right" style="padding-top: 4px"></i>
                </div>
            </div>
        </div>
    </nav>
</template>

<script src="../scripts/navbar.js"/>