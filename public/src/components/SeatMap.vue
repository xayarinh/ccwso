<template>
    <div id="map-container">
        <table id="seat-table">
            <tr>
                <td><seat-section section_data="upper_left"></seat-section></td>
                <td><seat-section section_data="upper_right"></seat-section></td>
            </tr>
            <tr>
                <td><seat-section section_data="lower_left"></seat-section></td>
                <td><seat-section section_data="lower_right"></seat-section></td>
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

    #map-container {
        width: 700px;
        height: 700px;
        margin: auto;
        border: 1px solid black;
    }

    #seat-table {
        height: 100%;
        width: 100%;
        border: 1px solid red;
    }


</style>