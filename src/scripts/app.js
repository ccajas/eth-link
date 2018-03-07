
import app       from '../views/theApp.vue';
import navbar    from '../views/theNavbar.vue';
import txInfo    from '../views/components/vTxInfo.vue';

import mainView  from '../views/theMainPage.vue';

import routes       from '../routes/index.js';
import { eventBus } from '../routes/eventbus.js';
import routingMixin from '../mixins/routing.js';

export default {
    components: {
        app,
        navbar,
        mainView,
        txInfo
    },
    data: function() {
        return {
            apptitle: 'Eth-Link Explorer',
            connected: false,
            currentRoute: window.location.pathname,
            view: 'Main',
            detail: ''
        }
    },  
    watch: {
        currentRoute: function (val, oldVal) {

            let path = this.currentRoute.split('/');
            this.view = routes['/'+ path[1]] || 'notfound';
            this.detail = path[2] || '';

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
        this.view = routes['/'+ path[1]] || 'notfound';
        this.detail = path[2] || '';
    },
    mounted: function() {

        this.$web3.eth.getBlockNumber().then(function(b) {
            
            console.log('We\'re on block number '+ b);
            this.connected = this.$web3.currentProvider.connected;

        }.bind(this));
    },
    methods: {
        updateRoute()
        {
            this.currentRoute = window.location.pathname;
        }
    }
}