// Network data

export default {
    data() {
        return {
            blockList: [],
            blockTime: '',
            difficulty: '',
            hashRate: '',
            current: 0,
            next: 0
        }
    },
    methods: {
        processBlock: function(b)
        {
            if (b === null)
                return;
                
            this.blockList.push({
                id: b.number,
                diff: b.difficulty,
                hash: b.hash,
                timestamp: b.timestamp
            });
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
                this.blockTime = (this.blockList[0].timestamp - this.blockList[this.blockList.length - 1].timestamp) / maxEntries;
                this.difficulty = this.blockList[0].diff;
                this.hashRate = this.difficulty / this.blockTime;

                promises.length = 0;
            })
            .catch(() => { console.log('failed!') });
        },
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
    }
}