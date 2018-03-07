
import blockInfo from '../views/components/vBlockInfo.vue';
import txInfo    from '../views/components/vTxInfo.vue';

import addrLink  from '../views/components/vAddrLink.vue';

// Row info component for block, address and tx data

export default {
    components: {
        addrLink
    },
    props: {
        view: {
            type: String,
            required: true
        },
        itemNumber: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            message: this.view,
            itemInfo: {}
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getItemInfo(this.itemNumber);
        });
    },
    watch: {
        itemNumber: function() {
            this.message = this.view;
            this.getItemInfo(this.itemNumber);
        }
    },  
    methods: {
        isAddr: function (request)
        {
            request = request.toString().split('0x').join('');
            return (/[0-9a-fA-F]{40}/.test(request)) && (request.length === 40);
        },
        setInfo: function(info) 
        {
            if (info === null)
                return;

            if (info.hasOwnProperty('extraData'))
            {
                var hex = info.extraData.toString();//force conversion
                var str = '';
                for (var i = 0; i < hex.length; i += 2)
                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                info.extraData = '['+ str +']';
            }
                
            console.log(JSON.parse(JSON.stringify(info)));
            this.itemInfo = info;
        },
        getItemInfo: function(numberOrHash)
        {
            if (this.view === 'Transaction Detail')
                var result = window.web3.eth.getTransaction(numberOrHash).then(this.setInfo);
            else if (this.view === 'Block')
                window.web3.eth.getBlock(numberOrHash, false).then(this.setInfo);
            else if (this.view === 'Address')
                window.web3.eth.getBalance(numberOrHash).then(function(i) {
                    this.itemInfo = { 
                        Balance: parseFloat(web3.utils.fromWei(i)).toFixed(8) + ' ETH',
                        Wei: i
                    };
                }.bind(this));
            
            // Scroll panel to the top
            let el = document.getElementById('right-info-popup');
            el.scrollTop = 0;
        }
    }
}