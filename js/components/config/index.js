// Global config
import axios from 'axios'

const config = {
	categories: null,
	waste: null,
	orderLength: 0,
	category: {},
	trial: null,
	wasteId: null
}

axios.get(`/api/products`)
	.then(response => {
		config.categories = response.data
	})
	.catch(e => {
		console.log(e)
	})

axios.get(`/api/waste-types`)
	.then(response => {
		config.waste = response.data
	})
	.catch(e => {
		console.log(e)
	})

const ConfigPlugin = {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					config: config
				}
			}
		})

		Object.defineProperty(Vue.prototype, '$config', {
			get() {
				return this.$root.config
			}
		})
	}
}

export default ConfigPlugin
