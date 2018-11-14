import Menu from './Menu.vue'
import router from '../../../router'

const MenuStore = {
	showMenu: false,
	displayMenu(value) {
		this.showMenu = value
	}
}

const MenuPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					menuStore: MenuStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$menu', {
			get() {
				return this.$root.menuStore
			}
		})
		Vue.component('main-menu', Menu)
	}
}

router.afterEach((to, from) => {
	MenuStore.displayMenu(false)
})

export default MenuPlugin
