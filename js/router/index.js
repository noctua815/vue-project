import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Views/Main'
import Products from '../components/Views/Products'
import Category from '../components/Views/Category'
import Product from '../components/Views/Product'
import Order from '../components/Views/Order'
import About from '../components/Views/About'
import Contacts from '../components/Views/Contacts'
import TrialOrder from '../components/Views/TrialOrder'
import Package from '../components/Views/Package'
import Waste from '../components/Views/Waste'
import WasteTypes from '../components/Views/WasteTypes'
import Promotions from '../components/Views/Promotions'
import Promo from '../components/Views/Promo'
import News from '../components/Views/News'
import NewsItem from '../components/Views/NewsItem'
import Services from '../components/Views/Services'
import NotFound from '../components/Views/NotFound'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'main',
			component: Main,
			meta: {
				breadcrumb: 'Главная'
			}
		},
		{
			path: '/products',
			name: 'products',
			component: Products,
			meta: {
				breadcrumb: 'Продукция'
			}
		},
		{
			path: '/products/:category',
			component: Category,
			props: true,
			meta: {
				breadcrumb: 'Подкатегория'
			}
		},
		{
			path: '/catalog-:product',
			component: Product,
			props: true,
			meta: {
				breadcrumb: 'Продукт'
			}
		},
		{
			path: '/order',
			component: Order,
			meta: {
				breadcrumb: 'Заявка'
			}
		},
		{
			path: '/about',
			component: About,
			meta: {
				breadcrumb: 'О компании'
			}
		},
		{
			path: '/contacts',
			component: Contacts,
			meta: {
				breadcrumb: 'Контакты'
			}
		},
		{
			path: '/trial',
			component: TrialOrder,
			meta: {
				breadcrumb: 'Пробная партия'
			}
		},
		{
			path: '/package',
			component: Package,
			meta: {
				breadcrumb: 'Упаковка'
			}
		},
		{
			name: 'waste',
			path: '/waste-types',
			component: Waste,
			meta: {
				breadcrumb: 'Закупка отходов'
			}
		},
		{
			path: '/waste-types/:category',
			component: WasteTypes,
			meta: {
				breadcrumb: 'Закупка отходов'
			}
		},
		{
			path: '/promotions',
			component: Promotions,
			meta: {
				breadcrumb: 'Акции и новости'
			}
		},
		{
			path: '/promotions/:promotion',
			component: Promo,
			meta: {
				breadcrumb: 'Акция'
			}
		},
		{
			path: '/news',
			component: News,
			meta: {
				breadcrumb: 'Акции и новости'
			}
		},
		{
			path: '/news/:news',
			component: NewsItem,
			meta: {
				breadcrumb: 'Новость'
			}
		},
		{
			path: '/services',
			component: Services,
			meta: {
				breadcrumb: 'Услуги'
			}
		},
		{
			path: '*',
			component: NotFound
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					x: 0,
					y: 0
				})
			}, 500)
		})
	}
})

export default router
