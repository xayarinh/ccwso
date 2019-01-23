<template>
    <div id="map-container">
        <table id="seat-table">
            <tr>
                <td><seat-section section_data="upper_left" section_name="Upper Left"></seat-section></td>
                <td><seat-section section_data="upper_right" section_name="Upper Right"></seat-section></td>
            </tr>
            <tr>
                <td><seat-section section_data="lower_left" section_name="Lower Left"></seat-section></td>
                <td><seat-section section_data="lower_right" section_name="Lower Right"></seat-section></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import SeatSection from './SeatSection.vue'
    export default {
        name: "SeatMap",
        components: {SeatSection}
    }
</script>

<style scoped>
    #map-container, #seat-table{
        width: 100%;
        height: 100%;

    }
</style>