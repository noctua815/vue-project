import ZoomPreview from './ZoomPreview.vue'
import ZoomWindow from './ZoomWindow.vue'
import router from '../../../router'

const ZoomStore = {
	showWindow: false,
    defaultSrc: null,
	displayWindow: function(value) {
		this.showWindow = value
	}
}

const ZoomPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					zoomStore: ZoomStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$zoom', {
			get() {
				return this.$root.zoomStore
			}
		})
		Vue.component('zoom-preview', ZoomPreview)
        Vue.component('zoom-window', ZoomWindow)
	}
}

router.afterEach((to, from) => {
	ZoomStore.displayWindow(false)
})

export default ZoomPlugin
