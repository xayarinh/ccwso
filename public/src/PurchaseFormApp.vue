<template>
    <div style="border: solid black 1px">
        <table>
            <tr>
                <td>
                    <b-btn v-b-toggle.contact-collapse id="contact-btn-collapse">Contact Information</b-btn>
                    <b-collapse visible id="contact-collapse">
                        <b-form>
                            <table>
                                <tr>
                                    <td>
                                        <b-form-group label="First Name">
                                            <b-form-input id="first-name" type="text" required placeholder="Enter First Name"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group label="Last Name">
                                            <b-form-input id="last-name" type="text" required placeholder="Enter Last Name"></b-form-input>
                                        </b-form-group>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <b-form-group label="Address">
                                            <input ref="autocomplete" placeholder="Enter Address" type="text" role="presentation" autocomplete="nope" v-bind:value="street"/>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group label="Apt/Unit">
                                            <input id="address-2" placeholder="Enter Apt/Unit" type="text"/>
                                        </b-form-group>
                                    </td>
                                </tr>
                                <tr>
                                    <b-form-group>
                                        <input id="city" placeholder="City" type="text" v-bind:value="city"/>
                                        <input id="state" placeholder="State" type="text" v-bind:value="state"/>
                                        <input id="zip" placeholder="Zip Code" type="text" v-bind:value="zip"/>
                                    </b-form-group>
                                </tr>
                                <tr>
                                    <td>
                                        <b-form-group label="Phone Number">
                                            <input id="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group label="Email">
                                            <input id="email" type="email"/>
                                        </b-form-group>
                                    </td>
                                </tr>
                                <tr><td>&nbsp;</td></tr>
                                <td></td>
                            </table>
                        </b-form>
                    </b-collapse>
                </td>
            </tr>
            <tr>
                <td>
                    <b-btn v-b-toggle.purchase-collapse id="purchase-btn-collapse">Purchase Details</b-btn>
                    <b-collapse id="purchase-collapse">
                    </b-collapse>
                </td>
            </tr>
        </table>
    </div>

</template>

<script>
    export default {
        name: 'PurchaseFormApp',
        data() {
            return {
                street: '',
                city: '',
                state: '',
                zip: ''
            }
        },
        mounted() {
            this.autocomplete = new google.maps.places.Autocomplete((this.$refs.autocomplete), {types: ['address']});
            var autoCompleteRef = this.autocomplete;
            var self = this;
            google.maps.event.addListener(this.autocomplete, 'place_changed', function(){
                var place = autoCompleteRef.getPlace();
                for(var i = 0; i < place.address_components.length; i++){
                    for(var j = 0; j < place.address_components[i].types.length; j++){
                        console.log(place.address_components[i]);
                        if(place.address_components[i].types[0] === 'street_number'){
                            self.street += place.address_components[i].long_name + ' ';
                        }
                        if(place.address_components[i].types[0] === 'route'){
                            self.street += place.address_components[i].long_name;
                        }
                        if(place.address_components[i].types[0] === 'locality'){
                            self.city = place.address_components[i].long_name;
                        }
                        if(place.address_components[i].types[0] === 'administrative_area_level_1'){
                            self.state = place.address_components[i].long_name;
                        }
                        if(place.address_components[i].types[0] === 'postal_code'){
                            self.zip = place.address_components[i].long_name;
                        }
                    }
                }

            });
        }
    }
</script>


<style scoped>

    #contact-btn-collapse {
        margin: auto;
        padding: 10px;
    }

</style>