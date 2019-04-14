
<template>
    <div class="bg-main">
        <navbar :containerClass="responsive ? fluid : nonFluid"></navbar>
        <div id="main-container" v-bind:class="responsive ? fluid : nonFluid">
            <section>
                <slot></slot>
            </section>
        </div>
    </div>      
</template>

<script>
    import navbar from "./theNavbar.vue";

    export default {
        data: function() {
            return {
                responsive: false,
                fluid: 'container-fluid',
                nonFluid: 'container'
            }
        },
        components: {
            navbar
        },
        methods: {
            toggleResponsive: function() {
                this.responsive = !this.responsive;
            }
        }
    }
</script>