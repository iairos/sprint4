<template>
    <section class="stay-index">
        <StayList @remove="removeStay" :stays="stays"/>
    </section>
</template>

<script>
import StayList from '@/cmps/StayList.vue'

export default {
    created() {
        this.$store.dispatch({ type: 'loadStays' })
            .then(() => console.log('stays loaded'))
            .catch(err => console.log(err))
    },
    methods: {
        removeStay(stayId){
            this.$store.dispatch({ type: 'removeStay', stayId })
                .then(console.log('Stay removed'))
        }
    },
    computed: {
        stays(){ return this.$store.getters.stays }
    },
    components: {
        StayList,
    }
}
</script>

<style lang="scss">

</style>