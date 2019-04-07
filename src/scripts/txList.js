
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';
import timeInfo from  '../views/components/vTimeInfo.vue';
import vlink from     '../views/components/vLink.vue';

// Mixin
import transition from '../mixins/transition.js';

// Table info component for block and tx data

export default {
    components: {
        addrLink,
        blockLink,
        timeInfo,
        vlink
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
            totalSenders: 0,
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
        loadTxList: function(blockNumber, totalTxs)
        {
            console.log(this.current +" "+ this.next);
            if (this.current == this.next)
                return;

            this.tempTxs = [];
            let promises = [];

            for (var i = this.current; i < this.next; i++) {
                promises.push(this.$web3.eth.getTransactionFromBlock(blockNumber, i).then(this.processTx));
            }
            
            // Move next marker after txs are loaded
            Promise.all(promises).then(() => 
            {
                // Txs will be loaded asynchronously so let's sort them
                let sortedTxs = this.tempTxs.sort((a, b) => a.transactionIndex - b.transactionIndex);
                this.txList = this.txList.concat(sortedTxs);

                // Move the iterators and clean up
                this.current = this.next;
                this.next += this.maxEntries;
                promises = [];

                if (this.next > totalTxs)      this.next = totalTxs;
                if (this.current == this.next) this.loading = false;
                this.totalSenders = Object.keys(this.uniqueFromAddr).length;

                // Start loading the next group
                if (this.current != this.next)
                    setTimeout(_ => this.loadTxList(blockNumber, totalTxs), 5000);
            })
            .catch((err) => { console.error(err) });
        },
        identicon: function(addr, dimension) {
            let svg = jdenticon.toSvg(addr, dimension, 0.08);
            let span = document.createElement('span');
            span.innerHTML = svg.trim();
            span.firstChild.removeAttribute('width');
            span.firstChild.removeAttribute('height');
            span.firstChild.setAttribute('class', 'scaling-svg');
            console.log(span.firstChild);
            return span.firstChild.outerHTML;
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
                this.loadTxList(block.number, block.transactions.length);
            });
            // Filter unique addresses
            this.txs = block.transactions;

        }.bind(this));
    }
}