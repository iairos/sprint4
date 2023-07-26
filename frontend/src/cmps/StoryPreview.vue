<template>
    <article class="story-preview">
        <pre>{{story}}</pre>
    </article>
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