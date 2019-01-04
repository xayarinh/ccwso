<template>
    <div id="purchase-container">
        <table id="purchase-table">
            <tr>
                <td>
                    <table id="selected-seat-table">
                        <thead>
                            <tr>
                                <th>Seat</th>
                                <th>Section</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="selectedSeats.length === 0">
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </template>
                            <tr v-for="seat in selectedSeats">
                                <td>{{seat.label}}</td>
                                <td>{{seat.section.name}}</td>
                                <td>${{seat.price}}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>Total Seats: {{totalSeats}}</td>
                <td>Amount Due: ${{totalPrice}}</td>
                <td><button v-on:click="submitSeats()">Confirm Seats</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import EventBus from '../bus.js'
    import axios from 'axios'

    export default {
        name: "PurchaseSection",
        data() {
            return{
                selectedSeats: [],
                totalPrice: 0,
                totalSeats: 0
            }
        },
        mounted() {
            EventBus.$on('seat-selected', (seat) => {
                this.addSelectedSeat(seat); // add or remove seat from list
            });
        },
        methods: {
            addSelectedSeat(seat) {
                let found = false;
                for(let i = 0; i < this.selectedSeats.length; i++){
                    if(this.selectedSeats[i].label === seat.label){
                        found = true;
                        break;
                    }
                }
                if(!found) { // seat not selected before
                    this.selectedSeats.push(seat);
                    this.totalPrice += seat.price;
                    this.totalSeats++;
                 } else { // unselected seat so remove from array
                    this.selectedSeats = this.selectedSeats.filter(seat_arr => seat.label !== seat_arr.label);
                    this.totalPrice -= seat.price;
                    this.totalSeats--;
                }
            },
            submitSeats(){
                // let url = 'http://localhost:5000/getPurchaseForm/';
                let url = 'https://ccwso.herokuapp.com/getPurchaseForm/';
                url += '?seats=' + JSON.stringify(this.selectedSeats);
                window.location.href = url;
            }
        }
    }
</script>

<style scoped>
    #purchase-container {
        height: 100%;
        width: 100%;
        border: solid 1px black;
    }
    #purchase-table {
        height: 100%;
        width: 100%;
    }
    #purchase-table tr {
        height: 50%;
        width: 100%;
        border: 5px solid darkred;
    }
    #purchase-table td {
        /*height: 50%;*/
        width: 100%;
        border: 1px solid olive;
    }
    #selected-seat-table {
       height: 100%;
       width: 100%;
       /*border: 10px solid purple;*/
    }
    #selected-seat-table td{
        /*height: 100%;*/
        width: 33%;
        /*border: 10px solid purple;*/
    }
    /*#selected-seat-table tr {*/
        /*!*width: 100%;*!*/
        /*!*height: 10px;*!*/
        /*border: 1px solid brown;*/
    /*}*/
</style>