
<template>
    <span class="text-second">
        {{ time }}test
    </span>
</template>

<script>

export default {
    props: {
        time: {
            type: String,
            required: true 
        },
    }
}

</script>