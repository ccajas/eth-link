
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';
import timeInfo from  '../views/components/vTimeInfo.vue';

// Mixin
import transition from '../mixins/transition.js';

// Table info component for block and tx data

export default {
    components: {
        addrLink,
        blockLink,
        timeInfo
    },
    mixins: [transition],
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
            uniqueFromAddr: {},
            totalRecipients: 0,
            maxEntries: 25,
            current: 0,
            gasPrice: 0,
            next: 0,
            loading: true
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

            tx.value = this.$web3.utils.fromWei(tx.value);
            tx.gasFee = this.$web3.utils.fromWei(tx.gasPrice) * tx.gas;
            // tx.gasPrice = this.$web3.utils.fromWei(tx.gasPrice, 'Gwei');

            if (tx.to === null)
                tx.to = "Created contract";

            // Add to list of unique addresses
            if (!(tx.from in this.uniqueFromAddr))
                this.uniqueFromAddr[tx.from] = 1;
            else
                this.uniqueFromAddr[tx.from]++;

            this.tempTxs.push(tx);
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
                    this.loadTxList(this.txs);
            }
        },
        loadTxList: function(txs)
        {
            console.log(this.current +" "+ this.next);
            if (this.current == this.next)
                return;

            this.tempTxs = [];
            let promises = [];

            for (var i = this.current; i < this.next; i++) {
                promises.push(this.$web3.eth.getTransaction(txs[i]).then(this.processTx));
            }
            
            // Move next marker after txs are loaded
            Promise.all(promises).then(() => 
            {
                let allTxs = this.tempTxs.sort((a, b) => a.transactionIndex - b.transactionIndex);
                this.txList = this.txList.concat(allTxs);
                this.current = this.next;
                this.next += this.maxEntries;

                if (this.next > txs.length)
                    this.next = txs.length;

                if (this.current == this.next)
                    this.loading = false;

                promises.length = 0;
                this.totalRecipients = Object.keys(this.uniqueFromAddr).length;

                // Start loading the next group
                if (this.current != this.next)
                    setTimeout(_ => this.loadTxList(txs), 5000);
            })
            .catch(() => { console.log('failed!') });
        },
        identicon: function(addr, dimension) {
            return jdenticon.toSvg(addr, dimension, 0.08);
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
            this.next = (block.transactions.length < this.maxEntries) ?
                block.transactions.length : this.maxEntries;

            // Get gas price only once
            this.$web3.eth.getGasPrice().then((gas) =>
            {
                this.gasPrice = gas;
                this.loadTxList(block.transactions);
            });
            // Filter unique addresses
            this.txs = block.transactions;

        }.bind(this));
    }
}