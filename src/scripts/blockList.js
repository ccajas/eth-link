
import addrLink from  '../views/components/vAddrLink.vue';
import blockLink from '../views/components/vBlockLink.vue';
import vlink from     '../views/components/vLink.vue';
import timeInfo from  '../views/components/vTimeInfo.vue';

// Mixin
import transition from '../mixins/transition.js';
// Table info component for block data

export default {
    components: {
        addrLink,
        blockLink,
        vlink,
        timeInfo
    },
    mixins: [transition],
    props: {
        network: {
            type: String,
            required: true 
        }
    },
    data() {
        return {
            tempBlocks: [],
            blockList: [],
            maxEntries: 20,
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
                gasUsed: b.gasUsed,
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
                    this.loadBlockList(this.next, this.maxEntries);
            }
        },
        loadBlockList: function(n, maxEntries)
        {
            if (this.current == this.next)
                return;

            this.current = this.next;
            this.tempBlocks = [];
            let promises = [];

            console.log('loading blocks...');

            for (var i = 0; i < maxEntries; i++) {
                promises.push(this.$web3.eth.getBlock(n - i).then(this.processBlock));
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
            console.log(str);

            for (var i = 0; i < str.length; i++)
                console.log(str[i] +" "+ str.charCodeAt(i));

            return str;
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
        this.$web3.eth.getBlockNumber().then(function(n) 
        {
            this.next = n;
            this.loadBlockList(n, this.maxEntries);
        }.bind(this));

        this.$root.$on('eventing', data => {
            console.log(data);
        });

        this.scroll();
    }
}