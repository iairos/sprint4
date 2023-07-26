<template>
    <article class="stay-preview">
        <pre>{{stay}}</pre>
    </article>
</template>

<script>
export default {
    props: {
        stay: { type: Object, required: true },
    }
}
</script>

<style lang="scss">

</style>