<template>
    <div v-if="seatsLoaded" id="seat-section-container">
        <table id="section-table">
            <tr>
                <td colspan="4">{{section_name}}</td>
            </tr>
            <tr>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="0"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="1"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="2"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="3"></seat></td>
            </tr>
            <tr>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="4"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="5"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="6"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="7"></seat></td>
            </tr>
            <tr>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="8"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="9"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="10"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="11"></seat></td>
            </tr>
            <tr>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="12"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="13"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="14"></seat></td>
                <td><seat v-bind:seats_arr="seats" v-bind:seat_index="15"></seat></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import Seat from './Seat.vue'

    export default {
        name: "SeatSection",
        props: ['section_data', 'section_name'],
        data() {
            return {
                seats: [], // seat info from database
                seatsLoaded: false // only render seat map until data has been called from DB
            }
        },
        created: function(){
            this.getSeats();
        },
        methods: {
            getSeats() {
                // have to make sure we use the this of the vue module because it's different when it gets to the call back in axios.get
                let self = this;
                // let url = process.env.GET_SEAT_URL;
                let url = 'http://ccwso.herokuapp.com/api/getSeats/';
                let params = {
                    params: {
                        section_data: this.section_data
                    }
                };
                axios.get(url, params).then(function (res){
                    self.seats = res.data;
                    self.seatsLoaded = true;
                }).catch(function(error){
                    console.log(error);
                });
            }
        },
        components: {Seat}
    }
</script>

<style scoped>
    #seat-section-container {
        height: 100%;
        width: 100%;
    }
    #section-table {
        height: 100%;
        width: 100%;
    }
    #section-table td {
        width: 25%;
        height: 10%;
        text-align: center;
    }

    #section-table tr {
        height: 20%;
        width: 100%;
    }
</style>