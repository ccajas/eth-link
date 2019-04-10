
import txListItem from '../views/components/vTxListItem.vue';
import addrLink from   '../views/components/vAddrLink.vue';
import timeInfo from   '../views/components/vTimeInfo.vue';
import vlink from      '../views/components/vLink.vue';

// Mixin
import transition from '../mixins/transition.js';

// Table info component for block and tx data

export default {
    components: {
        txListItem,
        addrLink,
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
            block: {},
            txList: [],
            txs: [],
            uniqueFromAddr: {},
            uniqueToAddr: {},
            totalSenders: 0,
            totalRecipients: 0,
            maxEntries: 25,
            current: 0,
            gasPrice: 0,
            next: 0,
            loading: true,
        }
    },
    methods: {
        processTx: function(tx)
        {        
            if (tx === null)
                return;

            tx.code = '';
            tx.type = 'txValue'; // Default
            tx.value = this.$ethers.utils.formatEther(tx.value, {pad: true});
            tx.gasFee = this.$ethers.utils.formatEther(tx.gasPrice) * this.gasPrice;

            if (tx.to === null)
                tx.type = 'txCreated';
            else
                this.$provider.getCode(tx.to).then(function(code){
                    tx.code = code.substring(2);
                    if (tx.code.length > 0)
                        tx.type = 'txCall';
                }.bind(tx));

            // Add to list of unique addresses
            if (!(tx.from in this.uniqueFromAddr))
                this.uniqueFromAddr[tx.from] = 1;
            else
                this.uniqueFromAddr[tx.from]++;

            if (tx.to !== null && !(tx.to in this.uniqueToAddr))
                this.uniqueToAddr[tx.to] = 1;
            else
                this.uniqueToAddr[tx.to]++;

            this.tempTxs.push(tx);
        },
        convertTimestamp: function (timestamp) 
        {
            let date = new Date(timestamp * 1000);      
            return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
        },
        loadTxList: function(txs)
        {
            console.log(this.current +" "+ this.next);
            if (this.current == this.next)
                return;

            this.tempTxs = [];
            let promises = [];

            for (var i = this.current; i < this.next; i++) {
                console.log(txs[i]);
                promises.push(this.$provider.getTransaction(txs[i]).then(this.processTx));
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

                if (this.next > txs.length)    this.next = txs.length;
                if (this.current == this.next) this.loading = false;
                this.totalSenders    = Object.keys(this.uniqueFromAddr).length;
                this.totalRecipients = Object.keys(this.uniqueToAddr).length;

                // Start loading the next group
                if (this.current != this.next)
                    setTimeout(_ => this.loadTxList(txs), 5000);
            })
            .catch((err) => { console.error(err) });
        },
        identicon: function(addr, dimension) {
            let svg = jdenticon.toSvg(addr, dimension, 0.05);
            let span = document.createElement('span');
            span.innerHTML = svg.trim();
            span.firstChild.removeAttribute('width');
            span.firstChild.removeAttribute('height');
            span.firstChild.setAttribute('class', 'scaling-svg');
            return span.firstChild.outerHTML;
        },
    },
    mounted: function() 
    {    
        // List next blocks
        console.log('get block here');
        console.log(this.itemID);
        this.$provider.getBlock(parseInt(this.itemID)).then(function(block) 
        {
            this.block = block;
            this.next = (block.transactions.length < this.maxEntries) ?
                block.transactions.length : this.maxEntries;

            // Get gas price only once
            this.$provider.getGasPrice().then((gas) =>
            {
                this.gasPrice = gas;
                console.log('gasprice '+ gas);
                if (block.transactions.length > 0)
                    this.loadTxList(block.transactions);
                else
                    this.loading = false;
            });
            // Filter unique addresses
            this.txs = block.transactions;

        }.bind(this));
    }
}