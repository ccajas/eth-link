
import app          from '../views/theApp.vue';
import navbar       from '../views/theNavbar.vue';
import blocks       from '../views/theBlockList.vue';
import block        from '../views/theBlockInfo.vue';
import tx           from '../views/theTxInfo.vue';
import networkInfo  from '../views/components/vNetworkInfo.vue';

import routes       from '../routes/index.js';

export default {
    components: {
        app,
        navbar,
        blocks,
        block,
        tx,
        networkInfo,
    },
    data: function() {
        return {
            apptitle: 'Eth-Link',
            connected: false,
            network: { name: '' },
            currentRoute: window.location.pathname,
            title: '',
            itemID: '',
            // classes
            isResponsive: false,
            nonFluid: 'container',
            fluid: 'container-fluid'
        }
    },  
    watch: {
        currentRoute: {
            handler: function (val, oldVal) {

                this.updateRoute();

                let path = this.currentRoute.split('/');
                this.title = routes['/'+ path[1]] || 'notfound';
                this.itemID = path[2] || '';
            },
            deep: true,
            immediate: true
        }
    },
    created: function () {
        // Listen to popstate event
        window.onpopstate = function (event) {
            this.updateRoute();
        }.bind(this);

        // Set route
        let path = this.currentRoute.split('/');
        this.title = routes['/'+ path[1]] || 'notfound';
        this.itemID = path[2] || '';
    },
    mounted: function() {

        this.$provider.getNetwork((network) => {
            this.network = network;
        });
        this.$provider.getBlockNumber().then((blockNumber) => {
            console.log("Current block number: " + blockNumber);
            this.connected = true;
        });
    },
    computed: {
        currentListComponent: function () {
            let path = this.currentRoute.split('/');
            return path[1] || 'blocks';
        },
        MainViewComponent: function() {
            let path = this.currentRoute.split('/');
            return routes[this.currentRoute[path[1]]] || NotFound
        },
    },
    methods: {
        updateRoute() {
            this.currentRoute = window.location.pathname;
        },
        toggleResponsive: function() {
            this.isResponsive = !this.isResponsive;
        }
    }
}