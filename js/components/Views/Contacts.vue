<template>
<div class="pc">
    <div class="pc-wr">
        <div class="pc-head">
            <div class="pc-breadcrumbs">

            </div>
            <div class="pc-title">
                <h1>Контакты</h1>
                <div class="contacts-head-details">
                    <a class="small-link" href="/Grainatt_requisites.pdf" target="_blank">Скачать реквизиты</a>
                </div>
            </div>
        </div>
        <div class="pc-body">
            <div class="pc-body-wr">
                <div class="pc-body-full">
                    <div class="contacts">
                        <div class="contacts-content-col">
                            <div class="contacts-content-tabs">
                                <contact-tabs id="contact-tabs"></contact-tabs>
                            </div>

                            <div class="contacts-studio" v-if="$mq === 'desktop'">
                                <studio-link></studio-link>
                            </div>
                        </div>

                        <div class="contacts-map-col">
                            <!-- Desktop tabs -->
                            <div class="contacts-map" v-if="$mq === 'desktop'">
                                <div id="map" class="map"></div>

                                <div class="map-zoom">
                                    <div class="map-zoom__btn map-zoom__up" @click="zoomUp(map)"></div>
                                    <div class="map-zoom__btn map-zoom__down" @click="zoomDown(map)"></div>
                                </div>

                                <div class="map-route" :class="{'map-route--search': active}">
                                    <div class="map-route-wr">
                                        <transition name="opacity" mode="out-in">
                                            <div class="map-route-btn" v-if="!active" @click="showSearch" key="route-btn">
                                                <div class="map-route-btn__text">Проложить маршрут</div>
                                            </div>
                                            <div class="map-route-search" v-else>
                                                <input class="map-route-search__input" type="text" v-model="address" @keyup.enter="calcRoute" placeholder="Введите свой адрес" key="route-search">
                                                <div class="map-route-search__btn map-route-search__btn--search" @click="calcRoute"></div>
                                                <div class="map-route-search__btn map-route-search__btn--cancel" @click="closeSearch"></div>
                                            </div>
                                        </transition>

                                        <transition name="fade-up">
                                            <div class="map-route-message" v-if="showRouteMessage">
                                                <div class="map-route-message__text">{{ routeMessage }}</div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                            <!-- END Desktop tabs -->

                            <!-- Mobile tabs -->
                            <div class="contacts-map-tabs" v-else>
                                <div class="contacts-map-tabs-triggers">
                                    <tab-triggers id="contacts-map">
                                        <tab-trigger name="офис" id="office" parent-id="contacts-map"></tab-trigger>
                                        <tab-trigger name="производство" id="production" parent-id="contacts-map"></tab-trigger>
                                    </tab-triggers>
                                </div>

                                <div class="contacts-map-tabs-pannels">
                                    <tab-panels id="contacts-map">
                                        <tab-panel id="office" :mobile="false">
                                            <div class="contacts-map">
                                                <div id="map" class="map"></div>

                                                <div class="map-zoom">
                                                    <div class="map-zoom__btn map-zoom__up" @click="zoomUp(map)"></div>
                                                    <div class="map-zoom__btn map-zoom__down" @click="zoomDown(map)"></div>
                                                </div>
                                            </div>
                                        </tab-panel>
                                        <tab-panel id="production" :mobile="false">
                                            <div class="contacts-map">
                                                <div id="map2" class="map"></div>

                                                <div class="map-zoom">
                                                    <div class="map-zoom__btn map-zoom__up" @click="zoomUp(map2)"></div>
                                                    <div class="map-zoom__btn map-zoom__down" @click="zoomDown(map2)"></div>
                                                </div>
                                            </div>
                                        </tab-panel>
                                    </tab-panels>
                                </div>
                            </div>
                            <!-- END Mobile tabs -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <mobile-footer></mobile-footer>
    </div>
</div>
</template>

<script>
import throttle from '../helpers/throttle.js'


export default {
    data() {
        return {
            markers: [{
                    lat: 59.889212,
                    lng: 30.335275
                },
                {
                    lat: 59.842337,
                    lng: 30.438652
                }
            ],
            map: null,
            map2: null,
            tabs: null,
            address: null,
            active: false,
            activeMarker: 0,
            routeMessage: '',
            showRouteMessage: false,
            directionsDisplay: null,
            directionsService: new google.maps.DirectionsService()
        }
    },
    mounted() {
        this.$contentWindow.setView('contacts')
        window.addEventListener('keyup', this.escClose)
        this.initMaps()
        this.$nextTick(() => {
            this.initTabs()
        })

    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.escClose)
    },
    methods: {
        initMaps() {
            let image = {
                url: '../img/map-marker.svg',
                scaledSize: new google.maps.Size(55, 96),
                origin: new google.maps.Point(0, 0)
            };

            let mapOptions = {
                zoom: 15,
                center: this.markers[0],
                disableDoubleClickZoom: false,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                disableDefaultUI: true,
                styles: [{
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "weight": "2.00"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#9c9c9c"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#f2f2f2"
                        }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#eeeeee"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#7b7b7b"
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                                "color": "#46bcec"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#c8d7d4"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#070707"
                        }]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    }
                ]

            }

            this.map = new window.google.maps.Map(document.getElementById('map'), mapOptions)

            let marker1 = new window.google.maps.Marker({
                position: this.markers[0],
                title: 'Grainatt',
                icon: image
            })

            let marker2 = new window.google.maps.Marker({
                position: this.markers[1],
                title: 'Grainatt',
                icon: image
            })

            marker1.setMap(this.map)
            marker2.setMap(this.map)

            let bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-84.999999, -179.999999),
                new google.maps.LatLng(84.999999, 179.999999));

            let rect = new google.maps.Rectangle({
                bounds: bounds,
                fillColor: '#446370',
                fillOpacity: 0.5,
                strokeWeight: 0,
                map: this.map
            });

            // For mobile map
            if (this.$mq !== 'desktop') {
                this.map2 = new window.google.maps.Map(document.getElementById('map2'), mapOptions)
                marker2.setMap(this.map2)
                this.map2.setCenter(this.markers[1]);

                let rect2 = new google.maps.Rectangle({
                    bounds: bounds,
                    fillColor: '#446370',
                    fillOpacity: 0.5,
                    strokeWeight: 0,
                    map: this.map2
                });
            }
        },
        initTabs() {
            let $this = this;

            this.tabs = document.querySelectorAll('#contact-tabs .tab-trigger');

            this.tabs.forEach(function(item) {
                item.addEventListener('click', (e) => {
                    if (e.target.id === 'contact-tabs-production' || e.target.closest('#contact-tabs-production')) {
                        $this.activeMarker = 1
                    } else {
                        $this.activeMarker = 0
                    }

                    $this.map.setCenter($this.markers[$this.activeMarker]);

                    if ($this.active) {
                        $this.calcRoute();
                    }
                })
            });
        },
        escClose() {
            if (event.keyCode === 27) {
                this.closeSearch()
            }
        },
        showSearch() {
            this.active = true
        },
        closeSearch() {
            let $this = this

            this.active = false
            this.showRouteMessage = false
            this.clearDirections()

            setTimeout(() => {
                $this.address = ''
                $this.map.setCenter($this.markers[$this.activeMarker]);
            }, 500)
        },
        showMessage(text) {
            let $this = this
            this.routeMessage = text
            this.showRouteMessage = true

            setTimeout(() => {
                $this.showRouteMessage = false
            }, 4000);
        },
        calcRoute() {
            if (!this.address) {
                this.showMessage('Введите адрес')
                return
            }

            let $this = this
            let end = new google.maps.LatLng(this.markers[this.activeMarker]);
            let request = {
                origin: this.address,
                destination: end,
                travelMode: 'DRIVING',
            };

            this.clearDirections()

            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);

            this.directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    if (result.routes[0].legs[0].start_address.indexOf('Sankt-Peterburg') >= 0) {
                        $this.directionsDisplay.setDirections(result);
                    } else {
                        $this.showMessage('Адрес выходит за пределы СПб')
                        $this.directionsDisplay.setDirections(result);
                    }
                } else {
                    $this.showMessage('Адрес не найден')
                }
            });
        },
        clearDirections() {
            if (this.directionsDisplay != null) {
                this.directionsDisplay.setMap(null);
                this.directionsDisplay = null;
            }
        },
        zoomUp(map) {
            map.setZoom(map.getZoom() + 1);
        },
        zoomDown(map) {
            map.setZoom(map.getZoom() - 1);
        }
    }
}
</script>
