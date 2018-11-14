import Header from './PageHeader.vue'
import router from '../../../router'

const HeaderStore = {
	showTrialBtn: false,
    displayTrialBtn(value) {
        this.showTrialBtn = value
    }
}

const HeaderPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					headerStore: HeaderStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$header', {
			get() {
				return this.$root.headerStore
			}
		})
		Vue.component('page-header', Header)
	}
}

router.afterEach((to, from) => {
	HeaderStore.displayTrialBtn(true)
})

export default HeaderPlugin
