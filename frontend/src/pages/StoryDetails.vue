<template>
    <h1> hi details</h1>
    <pre>{{ story }}</pre>
       
</template>

<script>
export default {
    props: {
        story: { type: Object, required: true },
    }
}
</script>

<style lang="scss">

</style>