<template>
    <div id="main-container">
        <table id="main-table">
            <tr>
                <td style="width: 10%"></td>
                <td style="width: 50%"><seat-map></seat-map></td>
                <td style="width: 40%"><purchase-section></purchase-section></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import SeatMap from './components/SeatMap.vue'
    import PurchaseSection from './components/PurchaseSection.vue'

    export default {
        name: 'app',
        components: {SeatMap, PurchaseSection}
    }
</script>

<style scoped>
    #main-container {
        padding-top: 150px;
        border: deeppink 1px solid;
    }
    #main-table {
        height: 100%;
        width: 100%;
    }
</style>