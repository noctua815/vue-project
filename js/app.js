import Vue from 'vue'
import App from './components/App'
import router from './router'

// window.Vue = require('vue');

// Plugins
import GlobalComponents from './components/globalComponents'
import SideBar from './components/layout/SidebarPlugin'
import VueTabs from './components/UI/VueTabs'
import PageHeader from './components/layout/PageHeader'
import ContentWindow from './components/layout/ContentWindow'
import Menu from './components/layout/Menu'
import GlobalConfig from './components/config'
import Zoom from './components/layout/Zoom'
import FormModal from './components/layout/FormModal'
import VeeValidate from 'vee-validate';

const validateConfig = {
	errorBagName: 'errors', // change if property conflicts
	fieldsBagName: 'fields',
	delay: 0,
	locale: 'ru',
	dictionary: {
		ru: {
	        messages:{
	            required: () => 'Обязательное поле',
	            email: () => 'Введен неверный e-mail',
				phoneNumber: () => 'Проверьте номер'
	        }
	    },
	},
	strict: true,
	classes: true,
	classNames: {
		touched: 'touched', // the control has been blurred
		untouched: 'untouched', // the control hasn't been blurred
		valid: 'valid', // model is valid
		invalid: 'invalid', // model is invalid
		pristine: 'pristine', // control has not been interacted with
		dirty: 'dirty' // control has been interacted with
	},
	events: 'input|blur',
	inject: true,
	validity: false,
	aria: true,
	i18n: null, // the vue-i18n plugin instance
	i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
};

Vue.use(GlobalComponents)
Vue.use(SideBar)
Vue.use(VueTabs)
Vue.use(PageHeader)
Vue.use(ContentWindow)
Vue.use(Menu)
Vue.use(GlobalConfig)
Vue.use(Zoom)
Vue.use(FormModal)
Vue.use(VeeValidate, validateConfig);

const app = new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>',
	mounted() {
		if (!localStorage.getItem('order')) {
			let cart = {
				items: []
			}

			LS.set('order', cart);
		} else {
			this.$config.orderLength = LS.get('order').items.length
		}
	}
})
