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
                    <b-btn v-b-toggle.contact-collapse id="contact-btn-collapse" v-bind:class="{'hvr-shrink': true}">Contact Information</b-btn>
                    <b-collapse visible id="contact-collapse">
                            <table id="contact-table">
                                <tr><td>&nbsp;</td></tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr style="width: 100%;">
                                                <td style="width: 50%;">
                                                    <div class="group">
                                                        <input id="first-name" type="text" required  v-model="firstname"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>First Name</label>
                                                    </div>
                                                </td>
                                                <td style="width: 50%;">
                                                    <div class="group">
                                                        <input id="last-name" type="text" required v-model="lastname"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Last Name</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="group">
                                                        <input ref="autocomplete" type="text" required v-model="street" style="width: 80%;" placeholder=""/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Street Address</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="group">
                                                        <input id="address-2" type="text" required v-model="street2" style="width: 30%;"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Apt/Unit (Optional)</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="group">
                                                        <input id="city" type="text" required v-model="city" style="width: 60%;"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>City</label>
                                                    </div>
                                                </td>
                                                <td style="width: 20%;">
                                                    <div class="group" >
                                                        <input id="state" type="text" required v-model="state" style="width: 25%;"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>State</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="group">
                                                        <input id="zip" type="text" required v-model="zip" style="width: 50%;"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Zip Code</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <div class="group">
                                                        <input id="phone" type="tel" required v-model="phone"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Phone Number</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="group">
                                                        <input id="email" type="email" required v-model="email"/>
                                                        <span class="highlight"></span><span class="bar"></span>
                                                        <label>Email (Optional)</label>
                                                    </div>
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
                    <b-btn v-b-toggle.purchase-collapse id="purchase-btn-collapse" v-bind:class="{'hvr-shrink': true}">Purchase Details</b-btn>
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
                                    <b-button type="button" v-on:click="submitPurchase()" v-bind:class="{'hvr-shrink': true}">Confirm Purchase</b-button>
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
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>
        <p class="success">Purchase Confirmed!</p>
    </div>
    <div v-else>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
            <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
        </svg>
        <p class="error">Oops! Sorry about that, something went wrong with your purchase. Please go back to the seat map and select your seats again.</p>
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
                lastname: '',
                street: '',
                street2: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                email: '',
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
                if(this.lastname === ''){
                    this.errors.push('Last name is required.');
                }
                if(this.street === ''){
                    this.errors.push('Street address is required.');
                }
                if(this.city === ''){
                    this.errors.push('City is required.');
                }
                if(this.state === ''){
                    this.errors.push('State is required.');
                }
                if(this.zip === ''){
                    this.errors.push('Zip Code is required.');
                }
                if(this.phone === ''){
                    this.errors.push('Phone number is required.');
                }
                if(this.errors.length === 0){
                    let submitSeatUrl = process.env.SUBMIT_SEAT_URL;
                    let params = {selectedSeats: this.selectedSeats};
                    let self = this;
                    axios.post(submitSeatUrl, params).then(function(res){
                        console.log('result', res);
                        self.success = true;
                        self.hasSeats = false;
                        document.title = 'Purchase Confirmation Page';
                    }).catch(function(error){
                        console.log('Error submitting seats', error);
                        document.title = 'Error Confirming Purchase';
                    });
                } else {
                    window.scrollTo(0,0);
                }
            }
        }
    }
</script>


<style scoped>

    @import '../hover.css';

    #contact-btn-collapse {
    }

    #purchase-form {
        border: 1px solid black;
        border-radius: 50px;
        padding-left: 5%;
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

    .group {
        position: relative;
        margin: 40px 0;
    }

    textarea {
        resize: none;
    }

    input, textarea{
        background: none;
        color: black;
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 50%;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #c6c6c6;
    }
    input, textarea:focus {
         outline: none;
    }

    input:focus ~ label, input:valid ~ label,
    textarea:focus ~ label,
    textarea:valid ~ label {
        top: -14px;
        font-size: 12px;
        color: black;
    }

    label {
        color: #c6c6c6;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 300ms ease all;
    }

    .bar {
        position: relative;
        display: block;
        width: 320px;
    }
    .bar:before {
        content: '';
        height: 2px;
        width: 0;
        bottom: 0px;
        position: absolute;
        background: #2196F3;
        transition: 300ms ease all;
        left: 0%;
    }

    svg {
        width: 100px;
        display: block;
        margin: 40px auto 0;
    }
    .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
    }
    .path.circle {
        -webkit-animation: dash 0.9s ease-in-out;
        animation: dash 0.9s ease-in-out;
    }
    .path.line {
        stroke-dashoffset: 1000;
        -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
        animation: dash 0.9s 0.35s ease-in-out forwards;
    }
    .path.check {
        stroke-dashoffset: -100;
        -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
        animation: dash-check 0.9s 0.35s ease-in-out forwards;
    }
    p {
        text-align: center;
        margin: 20px 0 60px;
        font-size: 1.25em;
    }
    p.success {
        color: #73AF55;
    }
    p.error {
        color: #D06079;
    }
    @-webkit-keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    @keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }
        100% {
            stroke-dashoffset: 0;
        }
    }
    @-webkit-keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }
    @keyframes dash-check {
        0% {
            stroke-dashoffset: -100;
        }
        100% {
            stroke-dashoffset: 900;
        }
    }


</style>