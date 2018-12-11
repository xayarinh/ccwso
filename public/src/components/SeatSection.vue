<template>
    <div v-if="seatsLoaded" id="seat-section-container">
        <table>
            <tr>
                <td>{{seats[0].label}}</td>
                <!--<td>{{seats[1].label}}</td>-->
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "SeatSection",
        props: ['section_data'],
        data() {
            return {
                seats: [],
                seatsLoaded: false
            }
        },
        created: function(){
            this.getSeats();
        },
        methods: {
            getSeats() {
                console.log(process.env.GET_SEAT_URL);
                console.log(process.env.VUE_APP_NODE_ENV);
                console.log(process.env.NODE_ENV);
                // have to make sure we use the this of the vue module because it's different when it gets to the call back in axios.get
                let self = this;
                let url = process.env.GET_SEAT_URL;
                let params = {
                    params: {
                        section_data: this.section_data
                    }
                };
                axios.get(url, params).then(function (res){
                    console.log('Finish Loading Seats', res.data);
                    self.seats = res.data;
                    self.seatsLoaded = true;
                }).catch(function(error){
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

    #seat-section-container {
        height: 100%;
        width: 100%;
        border: solid deepskyblue 1px;
    }
</style>