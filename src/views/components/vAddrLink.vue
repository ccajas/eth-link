
<template>
    <div>
        <vlink v-bind:href="addrValue">{{ addr }}</vlink>
        <div :style="addrColored"></div>
    </div>
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
        }
    },
    computed: {
        addrValue () {
            return '/addr/'+ this.addr;
        },
        addrColored () {
            let str = '';
            str += 'width: 520px; height: 4px; background: linear-gradient(90deg, #fff,';
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