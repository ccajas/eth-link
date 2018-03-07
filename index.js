
import Vue  from 'vue'
import Web3 from 'web3'

import Config from './config'
import App    from './src/views/theApp.vue'
import routes from './src/routes/index.js'

var theme = 'light';

// Static files

require('./public/css/bootstrap.min.css');
require('./public/css/animations.css');
require('./public/css/style.css');
require('./public/css/mod-'+ theme +'.css');

const test_url = 'http://localhost:8545';
const provider_url = 'https://mainnet.infura.io/'+ Config.provider_key;

// Create web3 object after page load
//if (typeof(Web3) !== 'undefined')

var web3 = new Web3(new Web3.providers.HttpProvider(provider_url));
//console.log(`Connecting to Ethereum node on RPC @ ${provider_url}`);

Vue.prototype.$web3 = web3;

new Vue({
    beforeCreate: function () {
        console.log(this.$web3)
    },
    mounted: function() {
        this.connected = true;
    },
    el: '#app',
    render: h => h(App)
})
