
// Main TableInfo component

Vue.component('tableinfo', {

    props: {
        view: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            message: 'Latest Blocks',
            itemList: []
        }
    },
    mixins: [blockDataMixin, connectionMixin],
    mounted: function () {

        this.$nextTick(function () {
            if (!this.connected)
                return;
        })

        // Get last block
        let maxBlocks = 15;
        let blockNum = this.$web3.eth.blockNumber;

        blockNum = parseInt(blockNum, 10);
        if (maxBlocks > blockNum) {
            maxBlocks = blockNum + 1;
        }

        // List latest blocks
        for (var i = 1; i <= maxBlocks; ++i) 
        {
            let block = this.$web3.eth.getBlock(blockNum - i, false);

            // roll back counter to count only valid blocks
            if (block === null)
            {
                i--;
            }
            else 
            {
                this.itemList.push({ 
                    id: block.number, 
                    time: this.convertTimestamp(block.timestamp),
                    size: block.size,
                    txLength: block.transactions.length
                });
            }
        }

        //var result = this.getTransactionsByAccount(numberOrHash);
    },
    methods: {
        getTransactionsByAccount: function(addr)
        {
            // test addr = 0x64d8a041713ba374560b675298a51062a1ced4f6

            let endBlockNumber = 4816400;   // this.$web3.eth.blockNumber;
            console.log("Using endBlockNumber: " + endBlockNumber);

            let startBlockNumber = 4816300; // endBlockNumber - 100;
            console.log("Using startBlockNumber: " + startBlockNumber);

            console.log("Searching for transactions to/from account \"" + addr + "\" within blocks " + 
                startBlockNumber + " and " + endBlockNumber);

            let blockNumber = startBlockNumber,
                gotError = false,
                numThreads = 0,
                startTime = new Date();

            let txs = ['test'];
            let _this = this;
              
            function exitThread() {

                numThreads--;
                if (numThreads === 0)
                {
                    let stopTime = new Date();
                    let duration = (stopTime.getTime() - startTime.getTime()) / 1000;
                    console.log('took '+ duration +' seconds');
                    console.log(txs);
                }
                return numThreads;
            }

            function asyncScanNextBlock() {

                if (gotError)
                    return exitThread();
        
                if (blockNumber > endBlockNumber)
                    return exitThread();
        
                const myBlockNumber = blockNumber++;

                _this.$web3.eth.getBlock(myBlockNumber, true, (error, block) => {
        
                    if (error) {
                        gotError = true;
                        console.error("Error:", error);
                    } else {
                        _this.scanBlockCallback(block, addr);
                        asyncScanNextBlock();
                    }
                });

                return temp_txs;
            }
        
            const maxThreads = 30;
            for (var nt = 0; nt < maxThreads && startBlockNumber + nt <= endBlockNumber; nt++) {
                numThreads++;
                asyncScanNextBlock();
            }

            return txs;
        }
    },
    computed: {
        isMain() {
            return this.view === 'main';
        }
    }
});