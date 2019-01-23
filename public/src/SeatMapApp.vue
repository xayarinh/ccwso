<template>
    <div id="main-container">
        <div style="height: 100px; width: 100%;"></div>
        <div style="height: 500px; width: 100%;">
            <table id="main-table">
                <tr>
                    <td style="width: 10%;"></td>
                    <td style="width: 40%;"><seat-map></seat-map></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 35%;"><purchase-section></purchase-section></td>
                    <td style="width: 5%;"></td>
                </tr>
            </table>
        </div>
        <div style="height: 100px; width: 100%;"></div>
    </div>
</template>

<script>
    import SeatMap from './components/SeatMap.vue'
    import PurchaseSection from './components/PurchaseSection.vue'

    export default {
        name: 'SeatMapApp',
        components: {SeatMap, PurchaseSection}
    }
</script>

<style scoped>
    #main-table {
        height: 100%;
        width: 100%;
    }
    #main-table tr {
        height: 100%;
    }
</style>