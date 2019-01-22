<template>
    <div id="purchase-container">
        <table id="purchase-table">
            <tr>
                <td>
                    <table id="selected-seat-table">
                            <tr style="height: 10%; width: 100%; border-bottom: 1px black solid;">
                                <th style="text-align: center;">Seat</th>
                                <th style="text-align: center;">Section</th>
                                <th style="text-align: center;">Price</th>
                            </tr>
                            <tr style="height: 80%; width: 100%; border-bottom: 1px black solid;">
                                <td colspan="3">
                                    <table id="seat-table" style="height: 100%; width: 100%;">
                                        <tr v-for="(seat, index) in selectedSeats" v-bind:class="{'bottom-top': index > 0}">
                                            <td style="text-align: center;">{{seat.label}}</td>
                                            <td style="text-align: center;">{{seat.section.label}}</td>
                                            <td style="text-align: center;">${{seat.price}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr style="height: 10%; width: 100%;">
                                <td style="text-align: center;">Total Seats: {{totalSeats}}</td>
                                <td style="text-align: center;"></td>
                                <td style="text-align: center;">Amount Due: ${{totalPrice}}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td style="text-align: center;">
                                    <router-link :to="{name: 'PurchaseFormApp', params: {selectedSeats: selectedSeats}}">
                                        <b-button id="myButton" v-bind:class="{'hvr-shrink': true, 'button-hidden': selectedSeats.length === 0}">Checkout</b-button>
                                    </router-link>
                                </td>
                            </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import EventBus from '../bus.js'

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
        }
    }
</script>

<style scoped>

    @import '../../hover.css';

    #purchase-container {
        height: 100%;
        width: 100%;
        border: solid 1px black;
        border-radius: 20px;
    }
    #purchase-table {
        height: 100%;
        width: 100%;
    }
    #purchase-table tr {
        width: 100%;
    }
    #purchase-table td {
        width: 100%;
    }
    #selected-seat-table {
       height: 100%;
       width: 100%;
    }
    #selected-seat-table td{
        width: 33%;
        height: 6.66%;
    }

    .bottom-top {
        border-top: 1px solid black;
    }

    .button-hidden {
        visibility: hidden;
    }

</style>