
import Vue    from 'vue'
import routes from './src/routes/index.js'

import navbar       from './src/views/theNavbar.vue';
import BlockList    from './src/views/theBlockList.vue';
import BlockInfo    from './src/views/theBlockInfo.vue';
import tx           from './src/views/theTxInfo.vue';

var theme = 'light';

// Static files

require('./public/css/bootstrap.min.css');
require('./public/css/animations.css');
require('./public/css/style.css');
require('./public/css/mod-'+ theme +'.css');

let provider = new ethers.providers.InfuraProvider('homestead');

Vue.prototype.$ethers = ethers;
Vue.prototype.$provider = provider;

const vm = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname,
        appTitle: 'Eth-Link',
        title: '',
        itemID: '',
        network: {},
        connected: false,
        isResponsive: false
    },
    beforeCreate: function () {

    },
    components: {
        navbar,
        BlockList,
        BlockInfo
    },
    async created() 
    {
        this.network = await this.$provider.getNetwork();
        this.connected = true;
    },
    computed: {
        ViewComponent () 
        {
            let path = this.currentRoute.split('/');
            this.title = routes['/'+ path[1]] || 'notfound';
            this.itemID = path[2] || '';

            let matchingView = this.title;
            return matchingView
                ? matchingView
                : BlockList
        }
    },
    methods: {
        updateRoute() {
            this.currentRoute = window.location.pathname;
            console.log('updateRoute');

            let path = this.currentRoute.split('/');
            this.title = routes['/'+ path[1]] || 'notfound';
            this.itemID = path[2] || '';
        },
        toggleResponsive: function() {
            this.isResponsive = !this.isResponsive;
        }
    },
    render () {
        // Set props to be passed here
        const ViewComponent  = this.ViewComponent;
        const nonFluid = 'container';
        const fluid    = 'container-fluid';

        return (
            <div class="bg-main">
                <navbar apptitle={ this.appTitle } conn={ this.connected } containerClass={ this.isResponsive ? fluid : nonFluid }></navbar>
                <div id="main-container" class={ this.isResponsive ? fluid : nonFluid }>
                    <section>
                        <ViewComponent network={ this.network } itemID={ this.itemID } />
                    </section>
                </div>
            </div>
        )
    }
})

window.addEventListener('popstate', () => {
    vm.currentRoute = window.location.pathname;
})