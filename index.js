
import Vue    from 'vue'
import routes from './src/routes/index.js'

// Static files

require('./public/css/bootstrap.min.css');
require('./public/css/animations.css');

require('./public/css/style.css');
require('./public/css/mod-light.css');
require('./public/css/mod-dark.css');

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
        connected: false
    },
    async created() 
    {
        this.network = await this.$provider.getNetwork();
        this.connected = true;
    },
    computed: {
        ViewComponent() 
        {
            let path = this.currentRoute.split('/');
            this.title = routes['/'+ path[1]] || 'notfound';
            this.itemID = path[2] || '';

            return require('./src/views/the'+ this.title +'.vue').default;
        }
    },
    methods: {
        updateRoute() {
            this.currentRoute = window.location.pathname;
            console.log('updateRoute');

            let path = this.currentRoute.split('/');
            this.title = routes['/'+ path[1]] || 'notfound';
            this.itemID = path[2] || '';
        }
    },
    render (h) {
        return h(this.ViewComponent, {
            props: { 
                appTitle: this.appTitle,
                network: this.network,
                conn: this.connected,
                itemID: this.itemID
            }
        });
    }
})

window.addEventListener('popstate', () => {
    vm.currentRoute = window.location.pathname;
})