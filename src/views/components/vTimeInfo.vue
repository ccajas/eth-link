
<template>
    <span class="text-second">
        {{ timeFromNow }}
    </span>
</template>

<script>

export default {
    props: {
        time: {
            type: Number,
            required: true 
        },
    },
    computed: {
        timeFromNow () {
            let now = Math.floor(Date.now()/1000);
            let fromNow = now - this.time;
            let unit = "sec";
            let count = fromNow;

            unit = 
                (fromNow > 31536000) ? "year" :
                (fromNow > 2592000) ? "month" :
                (fromNow > 86400) ? "day" :
                (fromNow > 3600) ? "hour" :
                (fromNow > 60) ? "min" : "sec";

            count /= 
                (fromNow > 31536000) ? 31536000 :
                (fromNow > 2592000) ? 2592000 :
                (fromNow > 86400) ? 86400 :
                (fromNow > 3600) ? 3600 :
                (fromNow > 60) ? 60 : 1;

            unit += Math.floor(count) > 1 ? 's' : ''; 
            return Math.floor(count) + " "+ unit + " ago";
        }
    }
}

</script>