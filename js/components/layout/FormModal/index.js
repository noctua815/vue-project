import FormModal from './FormModal.vue'
import router from '../../../router'

const FormModalStore = {
	showModal: false,
	displayModal(value) {
		this.showModal = value
	}
}

const FormModalPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					formModalStore: FormModalStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$formModal', {
			get() {
				return this.$root.formModalStore
			}
		})
		Vue.component('form-modal', FormModal)
	}
}

router.afterEach((to, from) => {
	FormModalStore.displayModal(false)
})

export default FormModalPlugin
