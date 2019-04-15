
<template>
    <div>
        <navbar class="shadow-soft" :networkName="network.name" :containerClass="responsive ? fluid : nonFluid"></navbar>
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
        props: {
            network: {
                type: Object,
                required: true 
            }
        },
        components: {
            navbar
        },
        methods: {
            toggleResponsive: function() {
                console.log(this.network);
                this.responsive = !this.responsive;
            },
            toggleStyle: function() {
                let el = document.getElementById("bg-main");
                console.log(el);
                el.classList.toggle("dark");
            }
        }
    }
</script>