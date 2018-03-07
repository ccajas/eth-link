
import vlink from     '../views/components/vLink.vue';
import blockInfo from '../views/components/vBlockInfo.vue';
import txInfo from    '../views/components/vTxInfo.vue';
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';

// Table info component for block and tx data

export default {
    components: {
        blockInfo,
        txInfo,
        vlink,
        addrLink,
        blockLink
    },
    data() {
        return {
            blockList: [],
            blocksFound: [],
            txList: [],
            view: '',
            itemNumber: '',
            last: 0
        }
    },
    watch: {
        view: function (val, oldVal) {
            console.log('updated again');
            //this.reloadTable();
        }
    },
    methods: {
        processBlock: function(b)
        {
            if (b === null)
                return;
                
            this.blockList.push({
                id: b.number,
                hash: b.hash,
                size: b.size,
                txLength: b.transactions.length,
                miner: b.miner,
                gasUsed: b.gasUsed,
                time: this.convertTimestamp(b.timestamp)
            });

            this.blocksFound.push(b.number);
        },
        processTx: function(tx)
        {        
            if (tx === null)
                return;
                
            tx.value = this.$web3.utils.fromWei(tx.value);
            tx.gasPrice = this.$web3.utils.fromWei(tx.gasPrice, 'Gwei');
            this.txList.push(tx);
        },
        convertTimestamp: function (timestamp) 
        {
            let date = new Date(timestamp * 1000);      
            return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
        },
        reloadTable: function() 
        {
            console.log('main view mounted');
            const refreshTime = 15000;
            const maxEntries = 15;

            // List latest blocks
   
            this.$web3.eth.getBlockNumber().then(function(n) 
            {
                let promises = [];
                console.log('getBlockNumber: '+ n)

                if (this.last < n)
                {
                    this.blockList.length = this.txList.length = 0;

                    for (var i = 0; i < maxEntries; i++) {
                        promises.push(this.$web3.eth.getBlock(n - i).then(this.processBlock));
                    }
                    
                    Promise.all(promises).then(() => {
                        this.blockList.sort((a, b) => b.id - a.id);
                        console.log('blocks sorted');
                        this.last = n;
                        promises.length = this.blocksFound.length = 0;
                    });

                    // List latest transactions

                    //const maxTxs = (b.transactions.length < maxEntries) ? 
                    //    b.transactions.length : maxEntries; 
                    
                    for (var i = 0; i < maxEntries; i++) {
                        promises.push(this.$web3.eth.getTransactionFromBlock(n, i).then(this.processTx));
                    }

                    Promise.all(promises).then(() => { 
                        this.txList.sort((a, b) => b.id - a.id);
                        console.log('transactions sorted');
                        promises.length = 0;
                    });
                }

            }.bind(this));

            setTimeout(this.reloadTable, refreshTime);
        }
    },
    mounted: function() {
        
        this.reloadTable();
    }
}