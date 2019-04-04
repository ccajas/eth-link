
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';
import timeInfo from  '../views/components/vTimeInfo.vue';

// Table info component for block and tx data

export default {
    components: {
        addrLink,
        blockLink,
        timeInfo
    },
    props: {
        itemID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            txList: [],
            txs: [],
            maxEntries: 15,
            current: 0,
            next: 0
        }
    },
    watch: {
        view: function (val, oldVal) {
            console.log('updated again');
        }
    },
    methods: {
        processTx: function(tx)
        {        
            if (tx === null)
                return;
                
            //tx.value = this.$web3.utils.fromWei(tx.value);
            tx.gasPrice = this.$web3.utils.fromWei(tx.gasPrice, 'Gwei');
            this.txList.push(tx);
        },
        convertTimestamp: function (timestamp) 
        {
            let date = new Date(timestamp * 1000);      
            return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
        },
        scroll: function()
        {
            let el = document.getElementById('main-container');
            window.onscroll = () => {
                let bottom = el.scrollHeight - window.scrollY < window.innerHeight + 1;
                if (bottom)
                {
                    this.loadTxList(this.txs);
                }
            }
        },
        loadTxList: function(txs)
        {
            console.log(this.current +" "+ this.next);
            if (this.current == this.next)
                return;

            let promises = [];

            for (var i = this.current; i < this.next; i++) {
                promises.push(this.$web3.eth.getTransaction(txs[i]).then(this.processTx));
            }
            
            // Move next marker after txs are loaded
            Promise.all(promises).then(() => 
            {
                this.txList.sort((a, b) => a.transactionIndex - b.transactionIndex);
                this.current = this.next;
                this.next += this.maxEntries;
                if (this.next > txs.length)
                    this.next = txs.length;

                promises.length = 0;
            })
            .catch(() => { console.log('failed!') });
        },
        identicon: function(addr, dimension) {
            return jdenticon.toSvg(addr, dimension, 0);
        }
    },
    created: function()
    {
        this.nf = new Intl.NumberFormat();
    },
    mounted: function() 
    {    
        // List next blocks
        this.$web3.eth.getBlock(this.itemID).then(function(block) 
        {
            console.log(block);
            this.next = (block.transactions.length < this.maxEntries) ?
                block.transactions.length : this.maxEntries;
            this.loadTxList(block.transactions);
            this.txs = block.transactions;

        }.bind(this));

        this.scroll();
    }
}