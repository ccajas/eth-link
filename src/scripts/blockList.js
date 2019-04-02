
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';

// Table info component for block and tx data

export default {
    components: {
        addrLink,
        blockLink
    },
    data() {
        return {
            blockList: [],
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
        processBlock: function(b)
        {
            if (b === null)
                return;
                
            this.blockList.push({
                id: b.number,
                hash: b.hash,
                size: b.size,
                diff: b.difficulty,
                timestamp: b.timestamp,
                txLength: b.transactions.length,
                miner: b.miner,
                gasUsed: b.gasUsed,
                time: this.convertTimestamp(b.timestamp)
            });
        },
        /*processTx: function(tx)
        {        
            if (tx === null)
                return;
                
            tx.value = this.$web3.utils.fromWei(tx.value);
            tx.gasPrice = this.$web3.utils.fromWei(tx.gasPrice, 'Gwei');
            this.txList.push(tx);
        },*/
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
                    console.log('getBlockNumber: '+ this.next +' '+ this.current);
                    this.loadBlockList(this.next, this.maxEntries);
                }
            }
        },
        loadBlockList: function(n, maxEntries)
        {
            if (this.current == this.next)
                return;

            this.current = this.next;
            let promises = [];
            console.log('loading...');

            for (var i = 0; i < maxEntries; i++) {
                promises.push(this.$web3.eth.getBlock(n - i).then(this.processBlock));
            }

            // Order blocks and get current network stats
            Promise.all(promises).then(() => 
            {
                this.blockList.sort((a, b) => b.id - a.id);
                console.log('blocks sorted');
                this.next = this.current - maxEntries;
                promises.length = 0;
            })
            .catch(() => { console.log('failed!') });
        },
        checkUpdates: function()
        {
            const refreshTime = 20000;
            let start = Date.now();
            let self = this;
    
            // Check for updates
            let step = function()
            {
                let elapsed = Date.now() - start;
                let percent = 100 - (elapsed/refreshTime * 100);
                let loaderEl = document.getElementById('main-loader');
                loaderEl.style.width = percent +'%';
    
                if (elapsed > refreshTime)
                {
                    start = Date.now();
                    //self.reloadTable();
                }
                window.requestAnimationFrame(step);
            }.bind(this);
    
            //window.requestAnimationFrame(step);
        },
        identicon: function(block) {
            return jdenticon.toSvg(block.miner, 44, 0);
        }
    },
    created: function()
    {
        this.maxEntries = 15;
        this.nf = new Intl.NumberFormat();
    },
    mounted: function() 
    {    
        // List next blocks
        this.$web3.eth.getBlockNumber().then(function(n) 
        {
            this.next = n;
            this.loadBlockList(n, this.maxEntries);
        }.bind(this));

        this.scroll();
    }
}