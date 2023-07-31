<template>
    <section @click="$router.push('/')" class="modal-bg">
        <span @click.stop>
            <slot></slot>
        </span>
    </section>
</template>

<script>
export default {
    props: {
    },
    methods: {
     
    },
    components: {
    }
}
</script>

<style lang="scss">

</style>