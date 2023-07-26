<template>
    <section class="stay-list">
        <ul>
            <li v-for="stay in stays" :key="stay._id">
                <StayPreview :stay="stay"/>
                <section class="actions">
                    <button @click="removeStay(stay._id)">x</button>
                </section>
            </li>
        </ul>
    </section>
</template>

<script>
import StayPreview from '@/cmps/StayPreview.vue'
export default {
    props: {
        stays: { type: Array, required: true }
    },
    methods: {
        removeStay(stayId){
            this.$emit('remove', stayId)
        }
    },
    components: {
        StayPreview,
    }
}
</script>

<style lang="scss">

</style>