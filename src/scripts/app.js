
import app          from '../views/theApp.vue';
import navbar       from '../views/theNavbar.vue';
import blocks       from '../views/theBlockList.vue';
import networkInfo  from '../views/components/vNetworkInfo.vue';

import routes       from '../routes/index.js';
import { eventBus } from '../routes/eventbus.js';
import routingMixin from '../mixins/routing.js';

export default {
    components: {
        app,
        navbar,
        blocks,
        networkInfo,
    },
    data: function() {
        return {
            apptitle: 'Eth-Link',
            connected: false,
            currentRoute: window.location.pathname,
            title: '',
            itemID: ''
        }
    },  
    watch: {
        currentRoute: function (val, oldVal) {

            let path = this.currentRoute.split('/');
            this.title = routes['/'+ path[1]] || 'notfound';
            this.itemID = path[2] || '';

            console.log('loading view: '+ this.view.tableinfo + ' | '+ this.view.rowinfo);
        }
    },
    created: function () {

        // Listen to popstate event
        window.onpopstate = function (event) {
            this.updateRoute();
        }.bind(this);

        // Listen for the clicked event on links
        eventBus.$on('link-clicked', route => {
            this.updateRoute();
        });

        // Set route
        let path = this.currentRoute.split('/');
        this.title = routes['/'+ path[1]] || 'notfound';
        this.itemID = path[2] || '';
    },
    mounted: function() {

        this.$web3.eth.getBlockNumber().then(function(b) {
            
            console.log('We\'re on block number '+ b);
            this.connected = this.$web3.currentProvider.connected;

        }.bind(this));
    },
    computed: {
        currentListComponent: function () {
            let path = this.currentRoute.split('/');
            return path[1] || 'blocks';
        },
    },
    methods: {
        updateRoute()
        {
            this.currentRoute = window.location.pathname;
        }
    }
}