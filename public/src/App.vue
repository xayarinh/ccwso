<template>
    <div id="main-container">
        <seat-map></seat-map>
    </div>
</template>

<script>
    import SeatMap from './components/SeatMap.vue';
    export default {
        name: 'app',
        data() {
            return {}
        },
        components: {SeatMap},
        created: function(){
            console.log('Root App Created');
        }
    }
</script>

<style scoped>
</style>