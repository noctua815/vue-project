// Layout components
import PageFooter from './layout/PageFooter'
import Copyright from './layout/Copyright'
import VueInput from './UI/Input/Input.vue'
import VueTextarea from './UI/Textarea/Textarea.vue'
import VueButton from './UI/Button/Button.vue'
import VueCheckbox from './UI/Checkbox/Checkbox.vue'
import BreadCrumb from './layout/BreadCrumb.vue'
import ContactTabs from './UI/ContactTabs/ContactTabs.vue'
import StudioLink from './layout/Menu/StudioLink.vue'
import CertfLink from './layout/Catalog/CertificateLink.vue'
import Preview from './layout/ContentWindow/Preview.vue'
import MobileFooter from './layout/MobileFooter.vue'
import Droplist from './UI/Droplist/Droplist.vue'

// Catalog components
import Promo from './layout/Catalog/Promo.vue'
import ProductItem from './layout/Catalog/ProductItem.vue'
import CartButton from './layout/Catalog/CartButton.vue'
import TrialButton from './layout/Catalog/trialBtn.vue'
import HorProductItem from './layout/Catalog/HorProductItem.vue'

// Order
import OrderItem from './layout/Order/OrderItem.vue'
import Counter from './layout/Order/Counter.vue'

// Weste
import WasteBtn from './layout/Waste/WasteBtn.vue'

// Promo and news
import NewsItem from './layout/Promotions/NewsItem.vue'
import PromoButton from './layout/Promotions/promoBtn.vue'

// Services
import ServiceButton from './layout/Services/ServiceBtn.vue'

import _ from 'lodash'
window._ = _

import LS from './helpers/LocalStorage'
window.LS = LS

import Inputmask from "inputmask"
window.Inputmask = Inputmask

import axios from 'axios'
window.axios = axios

import VueMq from 'vue-mq'
window.$mq = VueMq

import picturefill from 'picturefill'
import 'nodelist-foreach-polyfill'
import 'element-closest'
import objectFitPolyfill from 'object-fit-picture-tag-polyfill'
import ObjectAssign from 'es6-object-assign'
window.ObjectAssign = ObjectAssign.polyfill();

const GlobalComponents = {
    install(Vue) {
        Vue.component('page-footer', PageFooter)
        Vue.component('copyright', Copyright)
        Vue.component('v-input', VueInput)
        Vue.component('v-textarea', VueTextarea)
        Vue.component('v-button', VueButton)
        Vue.component('v-checkbox', VueCheckbox)
        Vue.component('promo', Promo)
        Vue.component('product-item', ProductItem)
        Vue.component('breadcrumb', BreadCrumb)
        Vue.component('cart-button', CartButton)
        Vue.component('order-item', OrderItem)
        Vue.component('v-counter', Counter)
        Vue.component('contact-tabs', ContactTabs)
        Vue.component('studio-link', StudioLink)
        Vue.component('certf-link', CertfLink)
        Vue.component('trial-button', TrialButton)
        Vue.component('h-product-item', HorProductItem)
        Vue.component('waste-button', WasteBtn)
        Vue.component('pc-preview', Preview)
        Vue.component('mobile-footer', MobileFooter)
        Vue.component('droplist', Droplist)
        Vue.component('news-item', NewsItem)
        Vue.component('promo-button', PromoButton)
        Vue.component('service-button', ServiceButton)
        Vue.use(VueMq, {
		    breakpoints: {
		        mobile: 641,
		        tablet: 1025,
		        desktop: Infinity
		    }
		})
    }
}

export default GlobalComponents
