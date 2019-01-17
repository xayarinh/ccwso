<template>
    <div style="padding-left: 20%; padding-right: 20%;" v-if="hasSeats">
        <b-form id="purchase-form">
        <table id="form-table">
            <template v-if="errors.length > 0">
                <p>Please fill out the mandatory fields before purchasing!</p>
                <ul>
                    <li v-for="error in errors">
                        {{error}}
                    </li>
                </ul>
            </template>
            <tr>
                <td>
                    <b-btn v-b-toggle.contact-collapse id="contact-btn-collapse">Contact Information</b-btn>
                    <b-collapse visible id="contact-collapse">
                            <table id="contact-table">
                                <tr><td>&nbsp;</td></tr>
                                <tr style="width: 100%;">
                                    <td style="width: 100%;">
                                        <table style="width: 100%;">
                                            <tr style="width: 100%;">
                                                <td style="width: 45%;">
                                                    <b-form-group label="First Name *">
                                                        <b-form-input id="first-name" type="text" required  v-model="firstname"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 10%;"></td>
                                                <td style="width: 45%;">
                                                    <b-form-group label="Last Name *">
                                                        <b-form-input id="last-name" type="text" required v-model="lastname"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="width: 60%;">
                                                    <b-form-group label="Street Address *" required>
                                                        <input style="width: 100%;" ref="autocomplete" type="text" role="presentation" autocomplete="nope" v-model="street"/>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 10%;"></td>
                                                <td style="width: 20%;">
                                                    <b-form-group label="Apt/Unit">
                                                        <b-form-input id="address-2" placeholder="Optional" type="text"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 10%;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="width: 30%;">
                                                    <b-form-group label="City *" required>
                                                        <b-form-input id="city" type="text" required v-model="city"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 5%;"></td>
                                                <td style="width: 10%;">
                                                    <b-form-group label="State *" required>
                                                        <b-form-input id="state" type="text" required v-model="state"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 5%;"></td>
                                                <td style="width: 30%;">
                                                    <b-form-group label="Zip Code *" required>
                                                        <b-form-input id="zip" type="text" required v-model="zip"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 20%;"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td style="width: 40%;">
                                                    <b-form-group label="Phone Number *">
                                                        <b-form-input id="phone" type="tel" required v-model="phone"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                                <td style="width: 20%;"></td>
                                                <td style="width: 40%;">
                                                    <b-form-group label="Email (Optional)">
                                                        <b-form-input id="email" type="email"></b-form-input>
                                                    </b-form-group>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr><td>&nbsp;</td></tr>
                            </table>
                    </b-collapse>
                </td>
            </tr>
            <tr>
                <td>
                    <b-btn v-b-toggle.purchase-collapse id="purchase-btn-collapse">Purchase Details</b-btn>
                    <b-collapse visible id="purchase-collapse">
                        <table>
                            <tr><td>&nbsp;</td></tr>
                            <tr v-for="seat in selectedSeats">
                                <td>Seat: {{seat.label}}</td>
                                <td>Price: ${{seat.price}}</td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td></td><td>Total: ${{total}}</td></tr>
                            <tr>
                                <td>
                                    <b-button type="button" v-on:click="submitPurchase()">Confirm Purchase</b-button>
                                </td>
                            </tr>

                        </table>
                    </b-collapse>
                </td>
            </tr>
        </table>
        </b-form>
    </div>
    <div v-else-if="success">
        <p>purchase was successful</p>
        <div class="checkmark-circle">
            <div class="background"></div>
            <div class="checkmark"></div>
        </div>
    </div>
    <div v-else>
        <p>Oops! Sorry about that, something went wrong with your purchase. Please go back to the seat map and select your seats again.</p>
    </div>

</template>
<script>
    import axios from 'axios'
    export default {
        name: 'PurchaseFormApp',
        props: ['selectedSeats'],
        data() {
            return {
                firstname: '',
                lastname: null,
                street: null,
                street2: null,
                city: null,
                state: null,
                zip: null,
                phone: null,
                email: null,
                hasSeats: false,
                success: false,
                total: 0,
                errors: []
            }
        },
        created() {
            if(this.selectedSeats.length > 0){
                for(let i = 0; i < this.selectedSeats.length; i++){
                    var currPrice = this.selectedSeats[i].price;
                    this.total += currPrice;
                }
                this.hasSeats = true;
            }
        },
        mounted() {
            try{
                this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete), {types: ['address']});
                var autoCompleteRef = this.autocomplete;
                var self = this;
                google.maps.event.addListener(this.autocomplete, 'place_changed', function(){
                    var place = autoCompleteRef.getPlace();
                    for(var i = 0; i < place.address_components.length; i++){
                        for(var j = 0; j < place.address_components[i].types.length; j++){
                            console.log(place.address_components[i]);
                            if(place.address_components[i].types[0] === 'street_number'){
                                self.street = place.address_components[i].long_name + ' ';
                            }
                            if(place.address_components[i].types[0] === 'route'){
                                self.street += place.address_components[i].long_name;
                            }
                            if(place.address_components[i].types[0] === 'locality'){
                                self.city = place.address_components[i].long_name;
                            }
                            if(place.address_components[i].types[0] === 'administrative_area_level_1'){
                                self.state = place.address_components[i].short_name;
                            }
                            if(place.address_components[i].types[0] === 'postal_code'){
                                self.zip = place.address_components[i].long_name;
                            }
                        }
                    }

                });
            } catch(error){
                console.log('error in mounted', error);
            }
        },
        methods: {
            submitPurchase(){
                console.log('fisrtname', this.firstname);
                this.errors = [];
                if(this.firstname === ''){
                    this.errors.push('First name is required.');
                }
                if(this.lastname === null){
                    this.errors.push('Last name is required.');
                }
                if(this.street === null){
                    this.errors.push('Street address is required.');
                }
                if(this.city === null){
                    this.errors.push('City is required.');
                }
                if(this.state === null){
                    this.errors.push('State is required.');
                }
                if(this.zip === null){
                    this.errors.push('Zip Code is required.');
                }
                if(this.phone === null){
                    this.errors.push('Phone number is required.');
                }

                if(this.errors.length === 0){
                    // var submitSeatUrl = 'http://localhost:5000/api/submitSeats/';
                    let submitSeatUrl = 'https://ccwso.herokuapp.com/api/submitSeats/';
                    var params = {selectedSeats: this.selectedSeats};
                    var self = this;
                    axios.post(submitSeatUrl, params).then(function(res){
                        console.log('result', res);
                        self.success = true;
                        self.hasSeats = false;
                    }).catch(function(error){
                        console.log('Error submiting seats', error);
                    });
                }
            }
        }
    }
</script>


<style scoped>

    #contact-btn-collapse {
        /*margin: auto;*/
        /*padding: 10px;*/
    }

    #purchase-form {
        border: 1px solid black;
        border-radius: 50px;
        padding-left: 20%;
        padding-right: 20%;
    }

    #form-table {
        height: 100%;
        width: 100%;
    }

    #form-table tr {
        width: 100%;
    }

    #contact-table {
        height: 100%;
        width: 100%;
    }

    /*:root {*/
        /*--circle-size: 150px;*/
        /*--check-height: var(--circle-size)/2;*/
        /*--check-width: var(--check-height)/2;*/
        /*--check-left: var(--circle-size)/6;*/
        /*--check-thickness: var(--circle-size)/10;*/
    /*}*/

    /*.checkmark-circle {*/
        /*width: var(--circle-size);*/
        /*height: var(--circle-size);*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*vertical-align: top;*/
    /*}*/
    /*.background {*/
        /*width: 150px;*/
        /*height: 150px;*/
        /*border-radius: 50%;*/
        /*background: #2EB150;*/
        /*position: absolute;*/
    /*}*/

    /*.checkmark:after {*/
        /*@include animation-delay(100ms);*/
        /*@include animation-duration(1s);*/
        /*@include animation-timing-function(ease);*/
        /*@include animation-name (checkmark);*/
        /*@include transform(scaleX(-1) rotate(180deg + -45deg));*/
        /*@include animation-fill-mode(forwards);*/
    /*}*/

    /*.checkmark:after {*/
        /*opacity: 1;*/
        /*height: var(--check-height);*/
        /*width: var(--check-width);*/
        /*@include transform-origin(left top);*/
        /*border-right: var(--check-thickness) solid white;*/
        /*border-top: var(--check-thickness)  solid white;*/
        /*border-radius: 2.5px !important;*/
        /*content: '';*/
        /*left: var(--check-left) ;*/
        /*top: var(--check-height) ;*/
        /*position: absolute;*/
    /*}*/

    /*@include keyframes(checkmark) {*/
        /*0% { height: 0; width: 0; opacity: 1; }*/
        /*20% { height: 0; width: var(--check-width); opacity: 1; }*/
        /*40% { height: var(--check-height); width: var(--check-width); opacity: 1; }*/
        /*100% { height: var(--check-height); width: var(--check-width); opacity: 1; }*/
    /*}*/

</style>