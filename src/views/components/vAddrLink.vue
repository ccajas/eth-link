
<template>
    <span v-if="trunc">
        {{ prefix }}<vlink v-bind:href="addrValue">{{ addrTrunc }}</vlink>
    </span>
    <span v-else>
        {{ prefix }}<vlink v-bind:href="addrValue">{{ addr }}</vlink>
    </span>
</template>

<script>

import vlink from "./vLink.vue";

export default {
    components: {
        vlink
    },
    props: {
        addr: {
            type: String,
            required: true 
        },
        prefix: {
            type: String,
            required: false
        },
        trunc: {
            type: Boolean,
            required: false
        }
    },
    computed: {
        addrValue () {
            return '/addr/'+ this.addr;
        },
        addrTrunc () {
            return this.addr.substring(0, 8) + "..." + this.addr.substring(38, 42);
        },
        addrColored () {
            let str = '';
            str += 'margin-top: 2px; width: 200px; height: 4px; background: linear-gradient(90deg, #fff,';
            for (let i = 2; i <= 40; i += 4)
            {
                str += '#'+ this.addr.substring(i, i + 2) + this.addr.substring(i + 2, i + 4) +'77, ';
            }
            str += '#fff)'
            return str;
        }
    }
}

</script>