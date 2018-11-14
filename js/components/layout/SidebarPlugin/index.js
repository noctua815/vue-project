import Sidebar from './SideBar.vue'

const SidebarStore = {
	sidebarLinks: [{
			name: 'О компании',
			path: '/about'
		},
		{
			name: 'Продукция',
			path: '/products'
		},
		{
			name: 'Закупка отходов',
			path: '/waste-types',
			id: 'waste'
		},
		{
			name: 'Услуги',
			path: '/services',
		},
		{
			name: 'Акции и новости',
			path: '/promotions',
		},
		{
			name: 'Упаковка',
			path: '/package'
		},
		{
			name: 'Контакты',
			path: '/contacts'
		}
	]
}

const SidebarPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					sidebarStore: SidebarStore
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$sidebar', {
			get() {
				return this.$root.sidebarStore
			}
		})
		Vue.component('sidebar', Sidebar)
	}
}

export default SidebarPlugin
