
import appLayout from '../views/theApp.vue';
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';
import vlink from     '../views/components/vLink.vue';
import timeInfo from  '../views/components/vTimeInfo.vue';

// Mixin
import transition from '../mixins/transition.js';
// Table info component for block data

export default {
    components: {
        appLayout,
        addrLink,
        blockLink,
        vlink,
        timeInfo
    },
    mixins: [transition],
    props: {
        network: {
            type: Object,
            required: true 
        }
    },
    data() {
        return {
            tempBlocks: [],
            blockList: [],
            maxEntries: 10,
            current: 0,
            next: 0,
            show: true
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
            console.log(b.number +' '+ b.hash);
            if (b === null)
                return;
                
            this.tempBlocks.push({
                id: b.number,
                hash: b.hash,
                size: b.size,
                diff: b.difficulty,
                timestamp: b.timestamp,
                txLength: b.transactions.length,
                miner: b.miner,
                gasUsed: this.$ethers.utils.bigNumberify(b.gasUsed).toString(),
                extraData: this.hex2ascii(b.extraData),
                time: this.convertTimestamp(b.timestamp),
                sorted: false
            });
        },
        scroll: function()
        {
            let el = document.getElementById('main-container');
            window.onscroll = () => {
                let bottom = el.scrollHeight - window.scrollY < window.innerHeight + 1;
                if (bottom)
                {
                    this.loadBlockList(this.next, this.maxEntries);
                    console.log('hit bottom');
                }
            }
        },
        loadBlockList: function(n, maxEntries)
        {
            if (this.next > 0 && this.current == this.next)
                return;

            console.log('load block list');

            this.current = this.next;
            this.tempBlocks = [];
            let promises = [];

            for (var i = 0; i < maxEntries; i++) {
                promises.push(this.$provider.getBlock(n - i).then(this.processBlock));
            }

            // Order blocks and get current network stats
            Promise.all(promises).then(() => 
            {
                let blocks = this.tempBlocks.sort((a, b) => b.id - a.id);
                this.blockList = this.blockList.concat(blocks);               

                this.next = this.current - maxEntries;
                promises.length = 0;
            })
            .catch((err) => { console.error(err) });
        },
        identicon: function(block, dimension) {
            return jdenticon.toSvg(block.miner, dimension, 0);
        },
        // Convert hex encoding for extra data
        hex2ascii: function(hex) {
            let str = '';
            // skip first two characters
            for (var i = 2; (i < hex.length); i += 2)
            {
                let char = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                //console.log(charCodeAt(char));
                str += char;
            }
            return str;
        },
        transactionSend: function(event)
        {
            console.log('begin transaction');
            let privateKey = 'xx';
            let wallet = new this.$ethers.Wallet(privateKey, this.$provider);

            for (let i = 1; i <= 3; i++)
            {
                let transaction = {
                    to: "0x",
                    value: ethers.utils.parseEther((0.01 * i).toString())
                };
    
                // Send the transaction
                let sendTransactionPromise = wallet.sendTransaction(transaction);
                sendTransactionPromise.then((tx) => {
                    console.log(tx);
                })
                .catch((err) => { console.error(err) });
            }
        },
        convertTimestamp: function (timestamp) 
        {
            let date = new Date(timestamp * 1000);      
            return date.toLocaleDateString() +' '+ date.toLocaleTimeString();
        },
        blockLink (id) {
            return '/block/'+ id;
        }
    },
    mounted: function() 
    {    
        // List next blocks
        this.$provider.getBlockNumber().then(function(n) 
        {
            console.log('begin loading blocks at '+ n);
            this.next = n;
            let entries = n < this.maxEntries ? n + 1 : this.maxEntries;
            this.loadBlockList(n, entries);

            // Watch for new blocks
            this.$provider.on('block', (blockNumber) => 
            {
                console.log('New Block: ' + blockNumber);
                this.$provider.getBlock(blockNumber).then(function(b) 
                {
                    this.processBlock(b)
                    this.blockList.unshift(this.tempBlocks.pop());

                    console.log(this.tempBlocks);

                }.bind(this));
            });

        }.bind(this));

        this.scroll();
    }
}