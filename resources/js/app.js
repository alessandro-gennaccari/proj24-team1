/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');
import axios from 'axios';
import Swal from 'sweetalert2/src/sweetalert2.js';

// Confirm button by sweetalert2
let forms = document.getElementsByClassName("form-delete");
for( let i = 0; i < forms.length; i++ ) {
    forms[i].addEventListener('submit',function(e) {
        e.preventDefault();
        Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.'
                    // 'success'
                );
                forms[i].submit();
            }
        })
    });
};

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        // Chiavi APi Tom Tom Dev
        key:'mGfJKGsowMXK1iso83qv0DUuAL4xlpWN',
        // key: 'zU1OxhGBvNg4ExAgUfwHTQy7R9JLqlIz',
        flats: [],
        query: '',
        googleApiResults: [],
        tomtomApiResults: [],
        address: '',
        // Info via
        lat: '',
        lng: '',
        paese: '',
        provincia: '',
        regione: '',
        comune: '',
        cap: '',
        via: '',
        numero: '',
        indirizzo: '',
        // Navbar Header hamburger Menu
        classNavbarClick: 'hidden_item', // Usata per Add/remove class
        // Lat e Lng per il raggio di 20km , metodo searchWithinRadius
        latitude: '',
        longitude: '',
        radius: '', // Raggio selezionato con input fuzione
        filteredFlats: [],
        arrayResults: [],
        rooms: '',// Preso da input ric. avanz
        beds: '',// Preso da input ric. avanz
        arrayAdvancedSearch: '',
        checked: false,
        flatServices: [],
        // Se un parametro Ric. Av. Missing parameters
        ifErrors: ''
    },
    created(){
        // Chiamata che richiama la nostra API per la ricerca degli appartamenti
        axios
            .get("http://127.0.0.1:8000/api/boolbnb-flats-api")
            .then((result) =>{
                this.flats.push(...result.data.response.flat);
            })
            .catch((error) => alert('Sorry, API (Flats) does not work...'));
    },
    methods: {
        // Metodo di implementazione chiamata per la ricerca via con API google
        // googleAdresses(){ // It worked perfectly, we just use tomtom's one
        //     axios
        //     .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address + "&key=")
        //     .then((result) =>{
        //         this.googleApiResults = result.data.results;
        //         console.log(this.googleApiResults);
        //     })
        //     .catch((error) => console.log('this API (Google) does not work',error));
        // },
        tomtomAdresses(){
            // TomTom APIs Per calcolare Indirizzo
            axios
            .get('https://api.tomtom.com/search/2/geocode/' +  this.address + '.json?limit=1&key=' + this.key)
            .then((result) =>{
                this.tomtomApiResults = result.data.results;
                this.lat = this.tomtomApiResults[0].position.lat;
                this.lng = this.tomtomApiResults[0].position.lon;
                this.paese = this.tomtomApiResults[0].address.country;
                this.provincia = this.tomtomApiResults[0].address.countrySecondarySubdivision;
                this.regione = this.tomtomApiResults[0].address.countrySubdivision;
                this.comune = this.tomtomApiResults[0].address.municipality;
                this.cap = this.tomtomApiResults[0].address.postalCode;
                this.via = this.tomtomApiResults[0].address.streetName;
                this.numero = this.tomtomApiResults[0].address.streetNumber;
                this.indirizzo = this.tomtomApiResults[0].address.freeformAddress;
                console.log(this.tomtomApiResults);
            })
            .catch((error) => alert('this API (Tomtom) does not work',error));
        },
        headerNavProfile() {
            // Funzione per il menu navbar, aggiunge e rimuove la classe visibile
            if (this.classNavbarClick == 'hidden_item'){
                this.classNavbarClick = 'show_item';
                setTimeout(() => this.classNavbarClick = 'hidden_item', 3000);
            } else {
                this.classNavbarClick = 'hidden_item';
            }
        },
        getLanLon(){
            // Ritorna la latitudine e Longitudine da un indirizzo specifico
            axios
            .get('https://api.tomtom.com/search/2/geocode/' +  this.query + '.json?limit=1&key='  + this.key)
            .then((result) =>{
                this.arrayResults = result.data.results;
                this.latitude = this.arrayResults[0].position.lat;
                this.longitude = this.arrayResults[0].position.lon;
            })
            // .catch((error) => alert('this API (Tomtom nested) does not work',error));
        },
        searchWithinRadius(){
            // Ricerca avanzata
            this.arrayResults = [];

            if(!this.query && !this.radius){
                this.ifErrors = 'Hai bisogno di inserire l\'indirizzo e selezionare la distanza'
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.ifErrors,
                })
                return; // Interrompe il metodo searchWithinRadius se il radius non è stato selezionato
            }

            if(this.query && !this.radius){
                this.ifErrors = 'Seleziona la distanza di ricerca';
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: this.ifErrors,
                })
                return; // Interrompe il metodo searchWithinRadius se il radius non è stato selezionato
            }

            if(!this.query){
                this.ifErrors = 'Hai bisogno di inserire l\'indirizzo';
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: this.ifErrors,
                })
                return; // Interrompe il metodo searchWithinRadius se il radius non è stato selezionato
            }

            this.arrayAdvancedSearch = ''; // Lo svuotiamo

            // Richiamiamo i flats nel raggio di 20km con la lat e lon che abbiamo registrato da getLanLon method
            axios
            .get("https://api.tomtom.com/search/2/nearbySearch/.json?limit=100&lat=" + this.latitude + "&lon=" + this.longitude + "&radius=" + this.radius + "&relatedPois=off&key=" + this.key)
            .then((result) => {
                this.filteredFlats = result.data.results;
                let location = [];
                this.filteredFlats.forEach(item => {
                    if(!location.includes(item.address.freeformAddress)){
                        location.push(item.address.freeformAddress);
                    }
                });
                this.flats.forEach(item => {
                    location.forEach(element => {
                        if(item.address.includes(element)){
                            if(!this.arrayResults.includes(item) && item.rooms >= this.rooms && item.beds >= this.beds){
                                this.ifErrors = '';
                                this.arrayResults.push(item);
                            }
                        }
                        
                    });
                });
                // Se non ci sono flats nel raggio selezionato
                if(this.arrayResults.length == 0){
                    this.ifErrors = 'Nessun risultato con i criteri di ricerca utilizzati';
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: this.ifErrors,
                    })
                }
            })
            .catch((error) => console.log('this API (filteredFlat) does not work',error));
        },
        clearSearchHomePage() {
            // Funzione per quando l'input non è in focus, cosi da rimuovere i contenuto e fa sparire la ricerca
            setTimeout(() => this.query = '', 900);
        }
    }
});