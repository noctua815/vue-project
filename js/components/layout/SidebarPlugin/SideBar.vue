<template>
<aside class="sidebar" v-if="$mq === 'desktop'">
    <div class="sidebar__top">
        <div class="sidebar__item sidebar__item--order">
            <transition name="fade" :duration="200">
                <router-link class="sidebar__link sidebar__link--order" to="/order" v-if="$config.orderLength > 0" @click.native="$formModal.displayModal(false)">Заявка <span>({{ $config.orderLength }})</span></router-link>
            </transition>
        </div>
    </div>
    <div class="sidebar__bottom">
        <div class="sidebar__item" v-for="(link,index) in sidebarLinks" :class="{'is-active' : activeLinkIndex == index}">
            <router-link v-if="link.id === 'waste' && $config.waste" class="sidebar__link" :to="$config.waste[0].link.original" @click.native="closeWasteForm">{{ link.name }}</router-link>

            <router-link v-else class="sidebar__link" :to="link.path">{{ link.name }}</router-link>
        </div>
    </div>
</aside>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        sidebarLinks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            activeLinkIndex: -1
        }
    },
    methods: {
        findActiveLink() {
            this.sidebarLinks.find((element, index) => {
                let found = this.$route.path.indexOf(element.path) >= 0,
                    isProduct = this.$route.path.indexOf('catalog-') >= 0,
                    isNews = this.$route.path.indexOf('news') >= 0

                if (found) {
                    this.activeLinkIndex = index
                } else if (isProduct) {
                    found = element.path.indexOf('/products') >= 0
                } else if (isNews) {
                    found = element.path.indexOf('/promotions') >= 0
                } else {
                    this.activeLinkIndex = -1
                }

                return found
            })
        },
        closeWasteForm() {
            this.$formModal.displayModal(false)
            this.$contentWindow.setView('content')
        }
    },
    mounted() {
        this.findActiveLink()
    },
    watch: {
        $route: function(newRoute, oldRoute) {
            this.findActiveLink()
        }
    }
}
</script>
