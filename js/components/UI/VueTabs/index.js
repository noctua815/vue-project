import TabTrigger from './TabTrigger'
import TabTriggers from './TabTriggers'
import TabPanel from './TabPanel'
import TabPanels from './TabPanels'

export default {
	install(Vue) {
		Vue.component('tab-trigger', TabTrigger)
		Vue.component('tab-triggers', TabTriggers)
		Vue.component('tab-panel', TabPanel)
		Vue.component('tab-panels', TabPanels)
	}
}

export {
	TabTrigger,
	TabTriggers,
	TabPanel,
	TabPanels
}
