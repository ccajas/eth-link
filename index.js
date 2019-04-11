
import Vue  from 'vue'
//import { ethers } from 'ethers';

import App    from './src/views/theApp.vue'
import routes from './src/routes/index.js'

var theme = 'light';

// Static files

require('./public/css/bootstrap.min.css');
require('./public/css/animations.css');
require('./public/css/style.css');
require('./public/css/mod-'+ theme +'.css');

let provider = new ethers.providers.InfuraProvider('homestead');

Vue.prototype.$ethers = ethers;
Vue.prototype.$provider = provider;

new Vue({
    beforeCreate: function () {
        console.log('Infura provider');
        console.log(this.$provider);
    },
    mounted: function() {
        this.connected = true;
    },
    el: '#app',
    render: h => h(App)
})
