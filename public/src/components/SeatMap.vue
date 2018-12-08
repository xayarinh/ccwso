<template>
    <div id="map-container">
        <seat-section section_data="upper_left"></seat-section>
    </div>
</template>

<script>

    import SeatSection from './SeatSection.vue'
    export default {
        name: "SeatMap",
        data() {
            return {
                testString: 'hello',
            }
        },
        components: {SeatSection}
    }
</script>

<style scoped>

    #map-container {
        height: 100%;
        width: 100%;
    }

</style>