
<template>
    <tr class="bg-main border-main">
        <td><vlink :href="TxHash">{{ tx.hash }}</vlink>&nbsp;</td>
        <td>{{ tx.from }}</td>
        <td>{{ tx.to }}</td>
        <td>{{ parseFloat(tx.value).toFixed(5) }}</td>
        <td>{{ tx.gas }}</td>
        <td>{{ parseInt(tx.gasPrice) }} GWei</td>
    </tr>
</template>

<script>

import vlink from "./vLink.vue";

export default {
    components: {
        vlink
    },
    props: {
        tx: {
            type: Object,
            required: true 
        }
    },
    computed: {
        TxHash () {
            return '/tx/'+ this.tx.hash;
        }
    }
}
</script>