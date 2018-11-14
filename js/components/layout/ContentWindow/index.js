import ContentWindow from './ContentWindow.vue'
import router from '../../../router'

const ContentWindowStore = {
	viewType: '',
	beforeMenuOpenType: '',
	setView(value) {
		this.viewType = value
	}
}

const ContentWindowPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					contentWindowStore: ContentWindowStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$contentWindow', {
			get() {
				return this.$root.contentWindowStore
			}
		})
		Vue.component('content-window', ContentWindow)
	}
}

router.afterEach((to, from) => {
	// ContentWindowStore.setView('default')
})

export default ContentWindowPlugin
